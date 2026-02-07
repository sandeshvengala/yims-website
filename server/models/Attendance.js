import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  date: { type: String, required: true },
  status: { type: String, required: true },
  notes: String
}, { timestamps: true });

export default mongoose.model('Attendance', attendanceSchema);
