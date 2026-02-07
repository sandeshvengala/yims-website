import mongoose from 'mongoose';

const alumniSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  name: { type: String, required: true },
  course: String,
  graduationYear: String,
  currentCompany: String,
  position: String,
  email: String
}, { timestamps: true });

export default mongoose.model('Alumni', alumniSchema);
