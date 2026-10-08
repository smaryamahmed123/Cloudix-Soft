import ContactMessage from '../models/ContactMessage.js';
import { MailerSend, EmailParams, Recipient, Sender } from "mailersend";

const mailer = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY,
});

const escapeHtml = (str = "") =>
  String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export const createMessage = async (req, res) => {

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

    // MailerSend sender (same "from" address for both emails)
    const sentFrom = new Sender(
      process.env.MAILERSEND_FROM_EMAIL,
      process.env.MAILERSEND_FROM_NAME
    );

    // --- Email 1: notify the admin ---
    try {
      const adminEmail = new EmailParams()
        .setFrom(sentFrom)
        .setTo([new Recipient(process.env.ADMIN_EMAIL, "Admin")])
        .setReplyTo(new Sender(email, name)) // hitting "Reply" answers the visitor
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

      await mailer.email.send(adminEmail);
    } catch (adminEmailError) {
      // The message is already saved in the database, so a failed email
      // should not make the visitor see an error.
      console.error("Admin notification email failed:", adminEmailError?.body || adminEmailError?.message || adminEmailError);
    }

    // --- Email 2: confirmation back to the person who sent the form ---
    try {
      const safeName = escapeHtml(name);
      const safeMessage = escapeHtml(message);

      const visitorEmail = new EmailParams()
        .setFrom(sentFrom)
        .setTo([new Recipient(email, name)])
        .setSubject("We've received your message - Cloudix Soft")
        .setHtml(`
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <h2 style="color: #111E2C;">Thanks for reaching out, ${safeName}!</h2>
            <p style="color: #374151; line-height: 1.6;">
              We've received your message and the Cloudix Soft team will get back to you shortly.
            </p>
            <div style="background: #F7F9FB; border-radius: 6px; padding: 16px; margin: 20px 0;">
              <p style="margin: 0 0 8px; color: #6b7280; font-size: 13px;">YOUR MESSAGE</p>
              <p style="margin: 0; color: #111827; white-space: pre-wrap;">${safeMessage}</p>
            </div>
            <p style="color: #6b7280; font-size: 13px;">
              If you didn't send this message, you can safely ignore this email.
            </p>
            <hr style="margin-top: 24px; border-color: #e5e7eb;" />
            <p style="font-size: 12px; color: #9ca3af;">Cloudix Soft - cloudixsoft.com</p>
          </div>
        `)
        .setText(
          `Thanks for reaching out, ${name}!\n\nWe've received your message and the Cloudix Soft team will get back to you shortly.\n\nYour message:\n${message}\n\nIf you didn't send this message, you can ignore this email.\n\nCloudix Soft - cloudixsoft.com`
        );

      await mailer.email.send(visitorEmail);
    } catch (visitorEmailError) {
      console.error("Visitor confirmation email failed:", visitorEmailError?.body || visitorEmailError?.message || visitorEmailError);
    }

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