import ContactMessage from '../models/ContactMessage.js';
import { MailerSend, EmailParams, Recipient, Sender } from "mailersend";

const mailer = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY,
});

// export const createMessage = async (req, res) => {
//   const { name, email, message, phoneNo } = req.body;

//   try {
//     console.log("Incoming data:", { name, email, message, phoneNo }); 
//     // Save message with pending status
//     const newMsg = new ContactMessage({
//       name,
//       email,
//       phoneNo,
//       message,
//       status: "pending",
//     });
//     await newMsg.save();

//     // Send email to admin
//     const sentFrom = new Sender(
//       "test-q3enl6kq13742vwr.mlsender.net",
//       "Website Contact Form"
//     );
//     const recipients = [new Recipient(process.env.ADMIN_EMAIL, "Admin")];

//     const emailParams = new EmailParams()
//       .setFrom(sentFrom)
//       .setTo(recipients)
//       .setSubject(`New Contact Message from ${name}`)
//       .setText(`New message from ${name} (${email}, ${phoneNo}):\n\n${message}`);

//     await mailer.email.send(emailParams);

//     res.status(201).json({ message: "Message saved with status pending!" });
//   } catch (err) {
//     console.error("Contact form error:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// };

export const createMessage = async (req, res) => {
  const { name, email, message, phoneNo } = req.body;

  // ✅ Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: "All required fields missing" });
  }
  
  if (!/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  try {
    // ✅ Save in DB (optional but good)
    await ContactMessage.create({
      name,
      email,
      phoneNo,
      message,
      status: "pending",
    });

    // ✅ Send email
    const sentFrom = new Sender(
      process.env.MAIL_FROM, // verified email/domain
      "Contact Form"
    );

    const recipients = [
      new Recipient(process.env.ADMIN_EMAIL, "Admin"),
    ];

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setSubject(`New Message from ${name}`)
      .setText(`
Name: ${name}
Email: ${email}
Phone: ${phoneNo}
Message: ${message}
      `);

    await mailer.email.send(emailParams);

    res.status(200).json({ message: "Message sent successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
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
