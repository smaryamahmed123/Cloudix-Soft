import mailerSend from '../config/mailer.js';
import { EmailParams, Sender, Recipient } from 'mailersend';
import Subscriber from '../models/Subscriber.js';
import { createUnsubscribeToken } from './unsubscribeToken.js';

export const sendBlogNotification = async (blog) => {
  try {
    const subscribers = await Subscriber.find();
    if (subscribers.length === 0) return;

    const sentFrom = new Sender(
      process.env.MAILERSEND_FROM_EMAIL,
      process.env.MAILERSEND_FROM_NAME || 'Newsletter'
    );

    // Sent one-by-one (not one email with everyone in "To") so each person
    // gets their own unsubscribe link, and so subscribers never see each
    // other's email addresses.
    const results = await Promise.allSettled(
      subscribers.map((sub) => {
        const unsubToken = createUnsubscribeToken(sub.email);
        const unsubLink = `${process.env.FRONTEND_URL}/unsubscribe?token=${unsubToken}`;

        const emailParams = new EmailParams()
          .setFrom(sentFrom)
          .setTo([new Recipient(sub.email)])
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
                <a href="${unsubLink}" style="color:#6b7280;">Unsubscribe</a>
              </p>
            </div>
          `)
          .setText(`New blog published: ${blog.title}\n\nBy ${blog.author} · ${blog.category}\n\n${blog.content.substring(0, 200)}...\n\nRead more: ${process.env.FRONTEND_URL}/blogs\n\nUnsubscribe: ${unsubLink}`);

        return mailerSend.email.send(emailParams);
      })
    );

    const failed = results.filter((r) => r.status === "rejected").length;
    console.log(`📧 Notification sent to ${subscribers.length - failed}/${subscribers.length} subscribers`);
    if (failed > 0) {
      console.error(`❌ ${failed} newsletter emails failed to send`);
    }
  } catch (err) {
    console.error('❌ Failed to send newsletter:', err);
  }
};