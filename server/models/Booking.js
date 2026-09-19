import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  requestId: { type: String, required: true, unique: true },
  patientName: { type: String, required: true },
  patientAge: { type: Number, required: true },
  patientGender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  contactName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  address: { type: String, required: true },
  city: { type: String, required: true },
  service: { type: String, required: true },
  caregiverPreference: { type: String, enum: ['Male', 'Female', 'No Preference'], default: 'No Preference' },
  startDate: { type: Date, required: true },
  duration: { type: String, required: true },
  requirements: { type: String },
  documents: [{ type: String }],
  contactPreference: { type: String, enum: ['Phone', 'WhatsApp', 'Email'], default: 'Phone' },
  status: {
    type: String,
    enum: ['New', 'Contacted', 'Confirmed', 'Assigned', 'In Progress', 'Completed', 'Cancelled'],
    default: 'New'
  },
  assignedNurse: { type: mongoose.Schema.Types.ObjectId, ref: 'Nurse' },
  notes: { type: String }
}, { timestamps: true });

export default mongoose.model('Booking', bookingSchema);