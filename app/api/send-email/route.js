// File: app/api/send-email/route.js
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { to, from, name, subject, message } = await request.json();

    // Basic validation
    if (!to || !from || !name || !message) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Configure transporter
    // Note: For production, you should use environment variables for these credentials
    const transporter = nodemailer.createTransport({
      service: 'gmail',  // You can change this to another service like SendGrid, AWS SES, etc.
      auth: {
        user: process.env.EMAIL_USER,        // Your email address
        pass: process.env.EMAIL_PASSWORD,    // Your app password or email password
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to,
      replyTo: from,
      subject: subject || `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 5px;">
          <h2 style="color: #333;">New Message from Contact Form</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${from}</p>
          <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
          <p><strong>Message:</strong></p>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 10px;">
            ${message.replace(/\n/g, '<br>')}
          </div>
          <p style="margin-top: 20px; font-size: 12px; color: #666;">
            This email was sent from your website's contact form.
          </p>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send email' },
      { status: 500 }
    );
  }
}