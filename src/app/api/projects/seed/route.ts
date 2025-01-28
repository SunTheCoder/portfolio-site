import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

const initialProjects = [
  {
    id: 'portfolio',
    name: 'Portfolio Website',
    description: 'A personal portfolio built with Next.js, featuring an interactive map and real-time gaming status.',
    technologies: ['Next.js', 'React', 'Tailwind CSS', 'Leaflet', 'Vercel KV'],
    link: 'https://github.com/sunspla-sh/portfolio-site',
  },
  {
    id: 'ric-explorer',
    name: 'Richmond Explorer',
    description: 'Interactive map of my favorite spots in Richmond, built with React and Leaflet.',
    technologies: ['React', 'Leaflet', 'TypeScript'],
    link: 'https://github.com/sunspla-sh/ric-explorer',
  }
];
// Visit /api/projects/seed in your browser to trigger the seeding. Then visit /api/projects to verify the projects are there. 
export async function GET() {
  try {
    console.log('Starting to seed projects...');
    
    // Clear existing projects
    await kv.del('projects');
    console.log('Cleared existing projects');
    
    // Add each project to the list
    for (const project of initialProjects) {
      await kv.lpush('projects', project);
      console.log(`Added project: ${project.name}`);
    }

    const allProjects = await kv.lrange('projects', 0, -1);
    console.log('Current projects in KV:', allProjects);

    return NextResponse.json({ 
      message: 'Projects seeded successfully',
      projects: allProjects 
    });
  } catch (error) {
    console.error('Error seeding projects:', error);
    return NextResponse.json({ error: 'Failed to seed projects' }, { status: 500 });
  }
} 