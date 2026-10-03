import express from 'express';
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';
import Referral from '../models/Referral.js';

const router = express.Router();

// Only logged-in admins may view or change referrals
function adminOnly(req, res, next) {
  try {
    const token = (req.headers.authorization || '').replace('Bearer ', '');
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (payload.role !== 'admin') return res.status(403).json({ message: 'Admins only.' });
    req.user = payload;
    next();
  } catch {
    res.status(401).json({ message: 'Please sign in again.' });
  }
}

const submitLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many submissions. Please try again later.' }
});

const isPhone = (v) => /^[6-9]\d{9}$/.test(String(v || '').replace(/\D/g, '').slice(-10));

// PUBLIC: submit a referral
router.post('/', submitLimiter, async (req, res) => {
  try {
    const { referrerName, referrerPhone, referrerEmail, patientName, patientPhone, location, service, notes } = req.body;

    if (!referrerName?.trim() || !patientName?.trim()) {
      return res.status(400).json({ message: 'Please enter your name and the patient name.' });
    }
    if (!isPhone(referrerPhone) || !isPhone(patientPhone)) {
      return res.status(400).json({ message: 'Please enter valid 10-digit mobile numbers.' });
    }

    await Referral.create({
      referrerName,
      referrerPhone: String(referrerPhone).replace(/\D/g, '').slice(-10),
      referrerEmail,
      patientName,
      patientPhone: String(patientPhone).replace(/\D/g, '').slice(-10),
      location,
      service,
      notes
    });

    res.status(201).json({ message: 'Thank you! We have received your referral and will contact the family shortly.' });
  } catch (err) {
    console.error('referral error:', err);
    res.status(500).json({ message: 'Could not submit. Please try again.' });
  }
});

// ADMIN: list all referrals (newest first)
router.get('/', adminOnly, async (req, res) => {
  const items = await Referral.find().sort({ createdAt: -1 });
  res.json(items);
});

// ADMIN: change status
router.put('/:id', adminOnly, async (req, res) => {
  try {
    const item = await Referral.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );
    if (!item) return res.status(404).json({ message: 'Referral not found.' });
    res.json(item);
  } catch {
    res.status(400).json({ message: 'Could not update.' });
  }
});

// ADMIN: delete
router.delete('/:id', adminOnly, async (req, res) => {
  await Referral.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

export default router;