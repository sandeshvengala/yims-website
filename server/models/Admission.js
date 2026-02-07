import mongoose from 'mongoose';

const admissionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  course: { type: String, required: true },
  qualification: String,
  address: String,
  status: { type: String, default: 'Pending' },
  applicationDate: { type: String, default: () => new Date().toISOString().split('T')[0] }
}, { timestamps: true });

export default mongoose.model('Admission', admissionSchema);
