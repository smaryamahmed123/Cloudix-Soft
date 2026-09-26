import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    content: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    _id: true,
  }
);

const privacyPolicySchema = new mongoose.Schema(
  {
    sections: {
      type: [sectionSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const PrivacyPolicy = mongoose.model(
  "PrivacyPolicy",
  privacyPolicySchema
);

export default PrivacyPolicy;