import express from 'express';
import Service from '../models/Service.js';
import Package from '../models/Package.js';
import Nurse from '../models/Nurse.js';
import Testimonial from '../models/Testimonial.js';
import FAQ from '../models/FAQ.js';
import Contact from '../models/Contact.js';
import { protect, adminOnly } from '../middleware/auth.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// ── Public read endpoints ──────────────────────────────────
router.get('/services', async (req, res) => {
  const services = await Service.find({ isActive: true }).sort('order');
  res.json(services);
});

router.get('/services/:slug', async (req, res) => {
  const service = await Service.findOne({ slug: req.params.slug, isActive: true });
  if (!service) return res.status(404).json({ message: 'Service not found' });
  res.json(service);
});

router.get('/packages', async (req, res) => {
  const packages = await Package.find({ isActive: true });
  res.json(packages);
});

router.get('/nurses', async (req, res) => {
  const nurses = await Nurse.find({ isActive: true });
  res.json(nurses);
});

router.get('/testimonials', async (req, res) => {
  const testimonials = await Testimonial.find({ isApproved: true }).sort('-createdAt');
  res.json(testimonials);
});

router.get('/faqs', async (req, res) => {
  const faqs = await FAQ.find({ isActive: true }).sort('order');
  res.json(faqs);
});

// Public contact form
router.post('/contact', [
  body('name').trim().notEmpty(),
  body('phone').matches(/^[0-9+\-\s]{10,15}$/),
  body('email').optional().isEmail(),
  body('message').trim().notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const contact = await Contact.create(req.body);
  res.status(201).json({ message: 'Enquiry submitted', contact });
});

// Public testimonial submit (pending approval)
router.post('/testimonials', [
  body('name').trim().notEmpty(),
  body('location').trim().notEmpty(),
  body('service').trim().notEmpty(),
  body('message').trim().notEmpty().isLength({ min: 10 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const t = await Testimonial.create({ ...req.body, isApproved: false });
  res.status(201).json({ message: 'Thank you! Your review will appear after approval.', t });
});

// ── Admin management endpoints ─────────────────────────────
router.use(protect, adminOnly);

const crud = (Model, name) => {
  router.get(`/admin/${name}`, async (req, res) => {
    res.json(await Model.find({}).sort('-createdAt'));
  });
  router.post(`/admin/${name}`, async (req, res) => {
    const item = await Model.create(req.body);
    res.status(201).json(item);
  });
  router.put(`/admin/${name}/:id`, async (req, res) => {
    const item = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  });
  router.delete(`/admin/${name}/:id`, async (req, res) => {
    const item = await Model.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  });
};

crud(Service, 'services');
crud(Package, 'packages');
crud(Nurse, 'nurses');
crud(Testimonial, 'testimonials');
crud(FAQ, 'faqs');

router.get('/admin/contacts', async (req, res) => {
  res.json(await Contact.find({}).sort('-createdAt'));
});
router.put('/admin/contacts/:id', async (req, res) => {
  const c = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(c);
});
router.delete('/admin/contacts/:id', async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

// Dashboard stats
router.get('/admin/stats', async (req, res) => {
  const Booking = (await import('../models/Booking.js')).default;
  const [totalBookings, newBookings, activeBookings, totalNurses, totalServices, totalTestimonials, unreadContacts] = await Promise.all([
    Booking.countDocuments(),
    Booking.countDocuments({ status: 'New' }),
    Booking.countDocuments({ status: { $in: ['Confirmed', 'Assigned', 'In Progress'] } }),
    Nurse.countDocuments({ isActive: true }),
    Service.countDocuments({ isActive: true }),
    Testimonial.countDocuments({ isApproved: true }),
    Contact.countDocuments({ isRead: false })
  ]);
  res.json({ totalBookings, newBookings, activeBookings, totalNurses, totalServices, totalTestimonials, unreadContacts });
});

export default router;