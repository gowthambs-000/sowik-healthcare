import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import bookingRoutes from './routes/bookings.js';
import publicRoutes from './routes/public.js';
import referralRoutes from './routes/referrals.js';

dotenv.config();
connectDB();

const app = express();
app.set('trust proxy', 1);

app.use(helmet());
const allowedOrigins = [
  'https://sowik.in',
  'https://sowik.netlify.app',
  'http://localhost:3000'
];
app.use(cors({
  origin(origin, callback) {
    // Permit server-to-server and local tools that do not send an Origin header.
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Origin not allowed by CORS'));
  }
}));
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

// General limit for the whole API. When it is hit, reply with JSON
// (not plain text) so the website can show a proper message.
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => req.path === '/health' || req.path === '/api/health',
  message: { message: 'Too many requests. Please wait a few minutes and try again.' }
});
app.use('/api/', limiter);

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api', publicRoutes);
app.use('/api/referrals', referralRoutes);

app.get('/health', (req, res) => res.json({ status: 'OK', service: 'Sowik Home Health Care API' }));
app.get('/api/health', (req, res) => res.json({ status: 'OK', service: 'Sowik Home Health Care API' }));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || 'Server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
