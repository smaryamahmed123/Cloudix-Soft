import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
// import { login, googleSignUp, googleLogin } from '../controllers/authController.js';
import loginUser from '../controllers/authController.js';
import '../config/passport.js';

const router = express.Router();

// Admin login with email + password
router.post('/login',loginUser);

// Google OAuth (passport)
// router.get('/google', passport.authenticate('google', {
//   scope: ['profile', 'email']
// }));

// Google OAuth callback
// router.get('/google/callback', (req, res, next) => {
//   passport.authenticate('google', (err, user) => {
//     if (err || !user) {
//       return res.redirect('http://localhost:5173/?error=unauthorized');
//     }

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: '1d',
//     });

//     res.redirect(`http://localhost:5173/?token=${token}`);
//   })(req, res, next);
// });

// Google API Login/Signup (token-based)
// router.post('/google/signup', googleSignUp);
// router.post('/google/login', googleLogin);

// router.get('/logout', (req, res) => {
//   req.logout(() => {
//     req.session.destroy();
//     res.redirect('https://accounts.google.com/Logout?continue=http://localhost:5173/login');
//   });
// });

export default router;
