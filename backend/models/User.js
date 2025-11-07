// import mongoose from 'mongoose';

// const userSchema = new mongoose.Schema({
//   email: { type: String, required: true },
//   password: { type: String, required: true }, // Manual login only
// });

// const googleUserSchema = new mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   googleId: { type: String },
//   role: { type: String, default: 'admin' },
//   isGoogleUser: { type: Boolean, default: true },
// });

// export const User = mongoose.model('User', userSchema);
// export const GoogleUser = mongoose.model('GoogleUser', googleUserSchema);


// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('User', userSchema);
