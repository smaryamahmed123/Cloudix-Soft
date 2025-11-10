import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import path from "path";
import { fileURLToPath } from "url";

// Routes
import logoRoute from './routes/logoRoutes.js'
import authRoutes from './routes/authRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import postRoutes from './routes/postRoutes.js';
import aboutRoutes from './routes/aboutRoute.js';
import contactRoutes from './routes/ContactRoutes.js';
import servicesRoutes from './routes/servicesRoutes.js'
import contactInfoRoutes from './routes/ContactInfoRoutes.js';
import privacyPolicyRoutes from './routes/privacyPolicyRoutes.js';

import User from './models/User.js';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Sessions
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

// CORS
const allowedOrigins = [
  'https://cloudix-soft.netlify.app',
  'https://cloudix-soft-admin.netlify.app'
];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Handle preflight requests for all routes
app.options('*', cors());

// JSON parser
app.use(express.json());

// Static uploads
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));

// Routes
app.use('/api/auth', authRoutes);
app.use("/api/logos", logoRoute);
app.use('/api/blogs', blogRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/contact-info', contactInfoRoutes);
app.use('/api/privacy-policy', privacyPolicyRoutes);

app.get('/', (req, res) => res.send('Backend running ✅'));

// Create default admin
const createDefaultAdmin = async () => {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  const existingAdmin = await User.findOne({ email: adminEmail });
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    await User.create({ email: adminEmail, password: hashedPassword });
    console.log('✅ Admin user created');
  }
};

// Connect to MongoDB & start server
const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    createDefaultAdmin();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));
