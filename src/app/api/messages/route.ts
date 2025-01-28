import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sunenglishjr@gmail.com',
    pass: process.env.GMAIL_APP_PASSWORD // Add this to your .env.local
  }
});

export interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const message: Message = {
      id: Date.now().toString(),
      name: body.name,
      email: body.email,
      message: body.message,
      timestamp: new Date().toISOString()
    };

    await kv.lpush('messages', message);

    await transporter.sendMail({
      from: 'sunenglishjr@gmail.com', // Must be your Gmail
      to: 'sunenglishjr@gmail.com',
      subject: `New Portfolio Message from ${message.name}`,
      text: `
Name: ${message.name}
Email: ${message.email}
Message: ${message.message}
Timestamp: ${message.timestamp}
      `
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error handling message:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
} 