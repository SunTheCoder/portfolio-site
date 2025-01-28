import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  imageUrl?: string;
}

export async function GET() {
  try {
    const projects = await kv.lrange<Project>('projects', 0, -1);
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

// Optional: Add an endpoint to add projects (protect this with authentication)
export async function POST(request: Request) {
  const project = await request.json();
  await kv.lpush('projects', project);
  return NextResponse.json({ message: 'Project added successfully' });
} 