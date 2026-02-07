import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  phone: String,
  course: String,
  admissionDate: String,
  status: { type: String, default: 'Active' }
}, { timestamps: true });

export default mongoose.model('Student', studentSchema);
