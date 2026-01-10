import ContactInfo from '../models/ContactInfo.js';

export const getContactInfo = async (req, res) => {
  try {
    const info = await ContactInfo.findOne();
    res.json(info || {});
  } catch (err) {               
    res.status(500).json({ error: 'Failed to fetch contact info' });
  }
};

export const updateContactInfo = async (req, res) => {
  try {
    const info = await ContactInfo.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.json(info);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update' });
  }
};
