// import passport from 'passport';
// import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// import dotenv from 'dotenv';
// import { GoogleUser } from '../models/User.js';

// dotenv.config();

// const allowedAdmins = [process.env.ADMIN_EMAIL];

// passport.use(new GoogleStrategy({
//   clientID: process.env.GOOGLE_CLIENT_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//   callbackURL: '/api/auth/google/callback',
// },
// async (accessToken, refreshToken, profile, done) => {
//   try {
//     const email = profile.emails[0].value;

//     if (!allowedAdmins.includes(email)) {
//       return done(null, false); // Unauthorized
//     }

//     let user = await GoogleUser.findOne({ email });
//     if (!user) {
//       user = new GoogleUser({
//         email,
//         role: 'admin',
//         isGoogleUser: true,
//       });
//       await user.save();
//     }

//     return done(null, user);
//   } catch (err) {
//     return done(err, null);
//   }
// }));

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     let user = await GoogleUser.findById(id);
//     done(null, user);
//   } catch (err) {
//     done(err, null);
//   }
// });
