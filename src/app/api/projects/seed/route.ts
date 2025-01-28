import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

const initialProjects = [
  {
    id: 'cec-website',
    name: 'Clean Energy Connectors',
    description: 'Full-Stack application using React, JavaScript, Python, Flask, Redux, TailwindCSS, Leaflet to map ArcGis and GeoJson data in order to build a more streamlined connection to grant funding and grant information for Indigenous Nations.',
    technologies: ['Next.js', 'React', 'Tailwind CSS', 'Leaflet', 'AWS', 'Python', 'Flask', 'Redux', 'ArcGis', 'GeoJson', 'Postgres', 'Docker'],
    link: 'https://ceconnectors.org',
  },
  {
    id: 'care-map',
    name: 'Richmond Explorer',
    description: 'This repo is a full stack application using JavaScript, React, Redux, Vite, Supabase, Leaflet Maps, Open Cage Geolocation, MetaMask/Infura API for crypto wallet management.',
    technologies: ['React', 'Leaflet', 'TypeScript', 'Supabase', 'Open Cage Geolocation', 'MetaMask/Infura API', 'Vite', 'Redux', 'ChakraUI', 'Web Sockets'],
    link: 'https://github.com/SunTheCoder/Communityv2',
  },
  {
    id: 'art-recommendation',
    name: 'Art-Recc',
    description: 'This repo is an AI Art Recommendation tool built with TensorFlow and Keras; using a dataset that I am creating and actively testing. To be used in the LCVA Portal mobile application I am building for Longwood University.',
    technologies: ['Python', 'TensorFlow', 'Keras'],
    link: 'https://github.com/SunTheCoder/ArtRecc',
  },
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