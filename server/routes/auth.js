import express from 'express';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import rateLimit from 'express-rate-limit';
import User from '../models/User.js';
import PasswordReset from '../models/PasswordReset.js';
import { sendOtpEmail } from '../utils/mailer.js';

const router = express.Router();

/* ---------------- Login (unchanged) ---------------- */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: { id: user._id, email: user.email, name: user.name, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* ---------------- Password reset with OTP ---------------- */
const resetLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: 'Too many attempts. Please try again in 15 minutes.' }
});

// At least 8 characters with a lowercase letter, an uppercase letter and a number
const strongPassword = (p) =>
  typeof p === 'string' && p.length >= 8 && /[a-z]/.test(p) && /[A-Z]/.test(p) && /\d/.test(p);

// Step 1: send a 6-digit code to the admin's email
router.post('/forgot-password', resetLimiter, async (req, res) => {
  const generic = { message: 'If this email belongs to an admin account, a 6-digit code has been sent.' };
  try {
    const email = String(req.body.email || '').trim().toLowerCase();
    if (!email) return res.status(400).json({ message: 'Email is required' });

    const user = await User.findOne({ email });
    // Same answer whether or not the account exists, so nobody can probe for admin emails
    if (!user || user.role !== 'admin') return res.json(generic);

    // Only one new code per minute
    const recent = await PasswordReset.findOne({ email });
    if (recent && Date.now() - recent.createdAt.getTime() < 60 * 1000) return res.json(generic);

    const otp = String(crypto.randomInt(100000, 1000000));
    await PasswordReset.deleteMany({ email });
    await PasswordReset.create({
      email,
      otpHash: await bcrypt.hash(otp, 10),
      expiresAt: new Date(Date.now() + 10 * 60 * 1000) // valid for 10 minutes
    });
    await sendOtpEmail(email, otp);

    res.json(generic);
  } catch (error) {
    console.error('forgot-password error:', error.message);
    res.status(500).json({ message: 'Could not send the code. Please try again later.' });
  }
});

// Step 2: check the code and set the new password
router.post('/reset-password', resetLimiter, async (req, res) => {
  try {
    const email = String(req.body.email || '').trim().toLowerCase();
    const otp = String(req.body.otp || '').trim();
    const { newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({ message: 'Email, code and new password are required' });
    }
    if (!strongPassword(newPassword)) {
      return res.status(400).json({
        message: 'Password must be at least 8 characters with an uppercase letter, a lowercase letter and a number.'
      });
    }

    const record = await PasswordReset.findOne({ email });
    if (!record || record.expiresAt < new Date()) {
      return res.status(400).json({ message: 'The code has expired or is invalid. Please request a new one.' });
    }
    if (record.attempts >= 5) {
      await record.deleteOne();
      return res.status(400).json({ message: 'Too many wrong codes. Please request a new one.' });
    }

    const ok = await bcrypt.compare(otp, record.otpHash);
    if (!ok) {
      record.attempts += 1;
      await record.save();
      return res.status(400).json({ message: 'Incorrect code. Please check and try again.' });
    }

    const user = await User.findOne({ email });
    if (!user || user.role !== 'admin') {
      return res.status(400).json({ message: 'The code has expired or is invalid. Please request a new one.' });
    }

    await User.updateOne({ _id: user._id }, { password: await bcrypt.hash(newPassword, 10) });
    await PasswordReset.deleteMany({ email }); // the code can be used only once

    res.json({ message: 'Password updated. You can sign in now.' });
  } catch (error) {
    console.error('reset-password error:', error.message);
    res.status(500).json({ message: 'Could not reset the password. Please try again.' });
  }
});

export default router;