// backend/models/Service.js
import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  iconImage: { type: String, required: true },
  iconImagePublicId: { type: String },
  title: { type: String, required: true },
  description: { type: String, required: true },
  visible: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
});

const Service = mongoose.model("Service", serviceSchema);
export default Service;
