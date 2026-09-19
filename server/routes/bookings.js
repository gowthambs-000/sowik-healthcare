import express from 'express';
import { body, validationResult } from 'express-validator';
import Booking from '../models/Booking.js';
import { protect, adminOnly } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

const generateRequestId = () => {
  const date = new Date();
  const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `SHC-${dateStr}-${random}`;
};

// Public: create booking (with optional document uploads)
router.post('/', upload.array('documents', 5), [
  body('patientName').trim().notEmpty().withMessage('Patient name is required'),
  body('patientAge').isInt({ min: 0, max: 150 }).withMessage('Valid age is required'),
  body('patientGender').isIn(['Male', 'Female', 'Other']),
  body('contactName').trim().notEmpty().withMessage('Contact name is required'),
  body('phone').matches(/^[0-9+\-\s]{10,15}$/).withMessage('Valid phone number is required'),
  body('email').optional().isEmail().withMessage('Valid email required'),
  body('address').trim().notEmpty().withMessage('Address is required'),
  body('city').trim().notEmpty().withMessage('City is required'),
  body('service').trim().notEmpty().withMessage('Service is required'),
  body('startDate').isISO8601().withMessage('Valid start date is required'),
  body('duration').trim().notEmpty().withMessage('Duration is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const documents = req.files ? req.files.map(f => f.filename) : [];

    const booking = await Booking.create({
      requestId: generateRequestId(),
      ...req.body,
      patientAge: parseInt(req.body.patientAge),
      documents
    });

    res.status(201).json({
      message: 'Booking request submitted successfully',
      requestId: booking.requestId,
      booking
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin routes below
router.use(protect, adminOnly);

router.get('/', async (req, res) => {
  try {
    const { status, search } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { requestId: { $regex: search, $options: 'i' } },
        { patientName: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }
    const bookings = await Booking.find(filter).populate('assignedNurse', 'name').sort('-createdAt');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('assignedNurse');
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json({ message: 'Booking deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;