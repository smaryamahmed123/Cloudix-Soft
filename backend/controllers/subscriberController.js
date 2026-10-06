import Subscriber from '../models/Subscriber.js';
import { verifyUnsubscribeToken } from '../utils/unsubscribeToken.js';

export const subscribe = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'Already subscribed!' });
    }

    const subscriber = new Subscriber({ email });
    await subscriber.save();

    res.status(201).json({ message: 'Subscribed successfully!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const adminRemoveSubscriber = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });
    await Subscriber.findOneAndDelete({ email });
    res.json({ message: 'Unsubscribed successfully.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const unsubscribeByToken = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ message: 'Unsubscribe token is required' });
    }

    let email;
    try {
      email = verifyUnsubscribeToken(token);
    } catch {
      return res.status(400).json({ message: 'This unsubscribe link is invalid or has expired.' });
    }

    const result = await Subscriber.findOneAndDelete({ email });
    if (!result) {
      return res.json({ message: 'You are unsubscribed.', email });
    }

    res.json({ message: 'You have been unsubscribed successfully.', email });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const getSubscribers = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;

    const query = {
      email: { $regex: escapeRegex(search), $options: "i" },
    };

    const subscribers = await Subscriber.find(query)
      .sort({ subscribedAt: -1 })
      .limit(Number(limit))
      .skip((page - 1) * limit);

    const total = await Subscriber.countDocuments(query);

    res.json({
      subscribers,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
