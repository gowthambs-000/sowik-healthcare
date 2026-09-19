import mongoose from 'mongoose';

const nurseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  photo: { type: String, default: '' },
  qualification: { type: String, required: true },
  experience: { type: String, required: true },
  specialization: { type: String, required: true },
  availability: { type: String, enum: ['Available', 'On Duty', 'Unavailable'], default: 'Available' },
  languages: [{ type: String }],
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Nurse', nurseSchema);