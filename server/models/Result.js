import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  exam: { type: String, required: true },
  score: String,
  resultDate: String
}, { timestamps: true });

export default mongoose.model('Result', resultSchema);
