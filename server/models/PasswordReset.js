import mongoose from 'mongoose';

const passwordResetSchema = new mongoose.Schema({
  username: { type: String, required: true },
  token: { type: String, required: true, unique: true },
  expiresAt: { type: Date, required: true }
}, { timestamps: true });

export default mongoose.model('PasswordReset', passwordResetSchema);
