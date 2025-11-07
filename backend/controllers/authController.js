// import { GoogleUser, User } from '../Models/User.js';
// import { OAuth2Client } from 'google-auth-library';
// import generateToken from '../utils/generateToken.js';
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcryptjs';

// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// export const login =  async (req, res) => {
//   const { email, password } = req.body;

//   const admin = await User.findOne({ email });
//   if (!admin) return res.status(400).json({ error: 'Invalid credentials' });

//   const isMatch = await bcrypt.compare(password, admin.password);
//   if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

//   const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
//     expiresIn: '1d',
//   });

//   res.json({ token });
// };

// export const googleSignUp = async (req, res) => {
//   const { tokenId } = req.body;
//   try {
//     const ticket = await client.verifyIdToken({
//       idToken: tokenId,
//       audience: process.env.GOOGLE_CLIENT_ID,
//     });
//     const payload = ticket.getPayload();

//     if (payload.email !== process.env.ADMIN_EMAIL) {
//       return res.status(403).json({ message: 'Unauthorized email for admin access' });
//     }

//     let user = await GoogleUser.findOne({ email: payload.email });

//     if (!user) {
//       user = new GoogleUser({
//         googleId: payload.sub,
//         email: payload.email,
//         role: 'admin',
//         isGoogleUser: true,
//       });
//       await user.save();
//     }

//     const token = generateToken(user._id);
//     res.status(200).json({ user, token });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Google signup failed' });
//   }
// };

// export const googleLogin = async (req, res) => {
//   const { tokenId } = req.body;
//   try {
//     const ticket = await client.verifyIdToken({
//       idToken: tokenId,
//       audience: process.env.GOOGLE_CLIENT_ID,
//     });
//     const payload = ticket.getPayload();

//     if (payload.email !== process.env.ADMIN_EMAIL) {
//       return res.status(403).json({ message: 'Unauthorized email for admin access' });
//     }

//     const user = await GoogleUser.findOne({ email: payload.email });
//     if (!user) return res.status(404).json({ message: 'Admin not found. Please sign up.' });

//     const token = generateToken(user._id);
//     res.status(200).json({ user, token });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Google login failed' });
//   }
// };



// controllers/authController.js
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/generateToken.js';

export const  loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

export default loginUser;