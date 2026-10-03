import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import connectDB from './config/db.js';
import User from './models/User.js';

dotenv.config();

const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;

if (!email || !password) {
  console.error('Add ADMIN_EMAIL and ADMIN_PASSWORD to your server/.env file first.');
  process.exit(1);
}

await connectDB();

// Create the admin, or update the password if this email already exists
const hashed = await bcrypt.hash(password, 10);
await User.findOneAndUpdate(
  { email },
  { email, password: hashed, name: 'Sowik Admin', role: 'admin' },
  { upsert: true, new: true }
);

// Remove the old default admin from seed.js so its public password stops working
await User.deleteOne({ email: 'admin@sowikhealthcare.com' });

console.log(`✅ Admin ready: ${email}`);
await mongoose.disconnect();
process.exit(0);