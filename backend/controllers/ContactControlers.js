import ContactMessage from '../models/ContactMessage.js';
import { MailerSend, EmailParams, Recipient, Sender } from "mailersend";

const mailer = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY,
});

export const createMessage = async (req, res) => {
  const { name, email, message, phoneNo } = req.body;

  try {
    console.log("Incoming data:", { name, email, message, phoneNo }); 
    // Save message with pending status
    const newMsg = new ContactMessage({
      name,
      email,
      phoneNo,
      message,
      status: "pending",
    });
    await newMsg.save();

    // Send email to admin
    const sentFrom = new Sender(
      "test-q3enl6kq13742vwr.mlsender.net",
      "Website Contact Form"
    );
    const recipients = [new Recipient(process.env.ADMIN_EMAIL, "Admin")];

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setSubject(`New Contact Message from ${name}`)
      .setText(`New message from ${name} (${email}, ${phoneNo}):\n\n${message}`);

    await mailer.email.send(emailParams);

    res.status(201).json({ message: "Message saved with status pending!" });
  } catch (err) {
    console.error("Contact form error:", err);
    res.status(500).json({ error: "Server error" });
  }
};


export const getMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    await ContactMessage.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete' });
  }
};


export const updateMessageStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updated = await ContactMessage.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "Message not found" });

    res.json({ message: "Status updated successfully", updated });
  } catch (err) {
    console.error("Update status error:", err);
    res.status(500).json({ error: "Failed to update status" });
  }
};
