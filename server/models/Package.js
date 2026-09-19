import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  hours: { type: String, required: true },
  shift: { type: String, enum: ['Day', 'Night', 'Full Day'], required: true },
  price: { type: Number, required: true },
  period: { type: String, enum: ['Daily', 'Weekly', 'Monthly'], default: 'Monthly' },
  features: [{ type: String }],
  popular: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Package', packageSchema);