import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, default: 'Untitled Blog' },
  content: { type: String, required: true, trim: true, default: 'No content available.' },
  image: { type: String, default: '' },
  public_id: { type: String, default: '' },
  views: { type: Number, default: 0 },
  category: { type: String, default: 'General' }, // Add this
  author: { type: String, default: 'Admin' },     // Add this
  createdAt: { type: Date, default: Date.now },
  visible: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
});


export default mongoose.model('Blog', blogSchema);
