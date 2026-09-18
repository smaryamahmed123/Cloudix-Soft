import mongoose from 'mongoose';

const contactMessageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (value) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },

    phoneNo: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (value) {
          return /^(\+?\d{7,15})$/.test(value);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },

    service: {
      type: String,
      required: false,
      trim: true,
      default: "",
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },

    status: {
      type: String,
      enum: ["pending", "verified"],
      default: "pending",
    },
  },
  {
    timestamps: false,
  }
);

export default mongoose.model("ContactMessage", contactMessageSchema);