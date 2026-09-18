import ContactMessage from '../models/ContactMessage.js';
import { MailerSend, EmailParams, Recipient, Sender } from "mailersend";

const mailer = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY,
});
  
export const createMessage = async (req, res) => {
  console.log("KEY EXISTS:", !!process.env.MAILERSEND_API_KEY);
  console.log("KEY LENGTH:", process.env.MAILERSEND_API_KEY?.length);

  const {
    name,
    email,
    message,
    phoneNo,
    service,
  } = req.body;

  // Basic validation
  if (!name || !email || !message || !phoneNo) {
    return res.status(400).json({
      error: "Name, email, phone number, and message are required.",
    });
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({
      error: "Invalid email format",
    });
  }

  if (!/^(\+?\d{7,15})$/.test(phoneNo)) {
    return res.status(400).json({
      error: "Invalid phone number format",
    });
  }

  try {
    // Save message in MongoDB
    await ContactMessage.create({
      name,
      email,
      phoneNo,
      service,
      message,
      status: "pending",
    });

    // MailerSend sender
    const sentFrom = new Sender(
      process.env.MAILERSEND_FROM_EMAIL,
      process.env.MAILERSEND_FROM_NAME
    );

    // Admin recipient
    const recipients = [
      new Recipient(
        process.env.ADMIN_EMAIL,
        "Admin"
      ),
    ];

    // Email
    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setSubject(`New Contact Message from ${name}`)
      .setText(`
New Contact Form Submission
============================

Name: ${name}
Email: ${email}
Phone: ${phoneNo}
Service: ${service || "Not selected"}

Message:
${message}

============================
Cloudix Soft Contact Form
      `);

    await mailer.email.send(emailParams);

    res.status(200).json({
      message: "Message sent successfully",
    });

  } catch (err) {
    console.error("Contact message error:", err);

    res.status(500).json({
      error: "Something went wrong",
    });
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
