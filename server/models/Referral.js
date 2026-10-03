import mongoose from 'mongoose';

const referralSchema = new mongoose.Schema(
  {
    referrerName: { type: String, required: true, trim: true },
    referrerPhone: { type: String, required: true, trim: true },
    referrerEmail: { type: String, trim: true, lowercase: true },
    patientName: { type: String, required: true, trim: true },
    patientPhone: { type: String, required: true, trim: true },
    location: { type: String, trim: true },
    service: { type: String, trim: true },
    notes: { type: String, trim: true, maxlength: 1000 },
    status: { type: String, enum: ['New', 'Contacted', 'Converted', 'Closed'], default: 'New' }
  },
  { timestamps: true }
);

export default mongoose.model('Referral', referralSchema);