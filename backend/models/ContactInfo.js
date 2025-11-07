import mongoose from 'mongoose';

const contactInfoSchema = new mongoose.Schema({
  email: String,
  phone: String,
  address: String,
  description: String,
  workingHours: {
    monday: { open: String, close: String },
    tuesday: { open: String, close: String },
    wednesday: { open: String, close: String },
    thursday: { open: String, close: String },
    friday: { open: String, close: String },
    saturday: { open: String, close: String },
    sunday: { open: String, close: String },
  },
  socialLinks: {
    facebook: String,
    twitter: String,
    linkedin: String,
    instagram: String,
  },
});

export default mongoose.model('ContactInfo', contactInfoSchema);
