import mailerSend from '../config/mailer.js';
import { EmailParams, Sender, Recipient } from 'mailersend';
import Subscriber from '../models/Subscriber.js';

export const sendBlogNotification = async (blog) => {
  try {
    const subscribers = await Subscriber.find({ email, active: true });
    if (subscribers.length === 0) return;

    const sentFrom = new Sender(
      process.env.MAILERSEND_FROM_EMAIL,
      process.env.MAILERSEND_FROM_NAME || 'Newsletter'
    );

    const recipients = subscribers.map(s => new Recipient(s.email));

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setSubject(`📝 New Blog Post: ${blog.title}`)
      .setHtml(`
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h1 style="color: #1f2937; font-size: 22px;">New Blog Published! 🎉</h1>
          ${blog.image ? `<img src="${blog.image}" alt="Blog Cover" style="width:100%; border-radius:6px; margin: 16px 0;" />` : ''}
          <h2 style="color: #111827;">${blog.title}</h2>
          <p style="color: #6b7280;">By ${blog.author} · ${blog.category}</p>
          <p style="color: #374151; line-height: 1.6;">${blog.content.substring(0, 200)}...</p>
          <a href="${process.env.FRONTEND_URL}/blogs" 
             style="display:inline-block; margin-top:16px; padding:12px 24px; background:#4f46e5; color:white; border-radius:6px; text-decoration:none; font-weight:bold;">
            Read More →
          </a>
          <hr style="margin-top:32px; border-color:#e5e7eb;" />
          <p style="font-size:12px; color:#9ca3af;">
            You're receiving this because you subscribed to our newsletter.<br/>
            <a href="${process.env.FRONTEND_URL}/unsubscribe" style="color:#6b7280;">Unsubscribe</a>
          </p>
        </div>
      `)
      .setText(`New blog published: ${blog.title}\n\nBy ${blog.author} · ${blog.category}\n\n${blog.content.substring(0, 200)}...\n\nRead more: ${process.env.FRONTEND_URL}/blogs`);

    await mailerSend.email.send(emailParams);
    console.log(`📧 Notification sent to ${subscribers.length} subscribers`);
  } catch (err) {
    console.error('❌ Failed to send newsletter:', err);
  }
};
