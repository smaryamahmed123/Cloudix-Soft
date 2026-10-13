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
  { _id: true }
);

const privacyPolicySchema = new mongoose.Schema(
  {
    intro: {
      type: String,
      default: "",
      trim: true,
    },
    sections: {
      type: [sectionSchema],
      default: [],
    },
    closing: {
      title: {
        type: String,
        default: "",
        trim: true,
        maxlength: 200,
      },
      text: {
        type: String,
        default: "",
        trim: true,
      },
    },
  },
  { timestamps: true }
);

const PrivacyPolicy = mongoose.model("PrivacyPolicy", privacyPolicySchema);
export default PrivacyPolicy;
