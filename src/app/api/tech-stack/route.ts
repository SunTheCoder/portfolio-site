import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const techDir = path.join(process.cwd(), 'public', 'tech');
    const files = fs.readdirSync(techDir);
    
    const icons = files.map(file => ({
      name: path.parse(file).name.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' '),
      path: file
    }));

    return NextResponse.json(icons);
  } catch (error) {
    console.error('Error reading tech stack directory:', error);
    return NextResponse.json({ error: 'Failed to load tech stack' }, { status: 500 });
  }
} 