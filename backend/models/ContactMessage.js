import mongoose from 'mongoose';

const contactMessageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        // Generic email validation (all domains)
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: props => `${props.value} is not a valid email address!`,
    },
  },
  phoneNo: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        // International phone number format: + followed by 7–15 digits or just digits
        return /^(\+?\d{7,15})$/.test(value);
      },
      message: props => `${props.value} is not a valid phone number!`,
    },
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['pending', 'verified'],
    default: 'pending',
  }

});

export default mongoose.model('ContactMessage', contactMessageSchema);
