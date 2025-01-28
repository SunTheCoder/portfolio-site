'use client';
import { useState } from 'react';
import { Message } from '@/app/api/messages/route';

export default function AdminPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      fetchMessages();
    }
  }

  async function fetchMessages() {
    try {
      const response = await fetch('/api/messages/list');
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Admin password"
            className="px-4 py-2 border rounded"
          />
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Messages</h1>
      <div className="space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="border p-4 rounded">
            <div className="flex justify-between">
              <h2 className="font-bold">{message.name}</h2>
              <span className="text-gray-500">{new Date(message.timestamp).toLocaleString()}</span>
            </div>
            <a href={`mailto:${message.email}`} className="text-blue-500">
              {message.email}
            </a>
            <p className="mt-2">{message.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 