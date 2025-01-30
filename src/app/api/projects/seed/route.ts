import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

const initialProjects = [
  {
    id: 'cec-website',
    name: 'Clean Energy Connectors',
    description: 'Full-Stack application using React, JavaScript, Python, Flask, Redux, TailwindCSS, Leaflet to map ArcGis and GeoJson data in order to build a more streamlined connection to grant funding and grant information for Indigenous Nations.',
    technologies: ['Next.js', 'React', 'Tailwind CSS', 'Leaflet', 'AWS', 'Python', 'Flask', 'Redux', 'ArcGis', 'GeoJson', 'Postgres', 'Docker'],
    link: 'https://ceconnectors.org',
    imageUrl: '/projects/cec-map.png',
  },
  {
    id: 'care-map',
    name: 'Care Map',
    description: 'This repo is a full stack application using JavaScript, React, Redux, Vite, Supabase, Leaflet Maps, Open Cage Geolocation, MetaMask/Infura API for crypto wallet management.',
    technologies: ['React', 'Leaflet', 'TypeScript', 'Supabase', 'Open Cage Geolocation', 'MetaMask/Infura API', 'Vite', 'Redux', 'ChakraUI', 'Web Sockets'],
    link: 'https://github.com/SunTheCoder/Communityv2',
    imageUrl: '/projects/care-map.png',
  },
  {
    id: 'art-recommendation',
    name: 'Art-Recc',
    description: 'This repo is an AI Art Recommendation tool built with TensorFlow and Keras; using a dataset that I am creating and actively testing. To be used in the LCVA Portal mobile application I am building for Longwood University.',
    technologies: ['Python', 'TensorFlow', 'Keras'],
    link: 'https://github.com/SunTheCoder/ArtRecc',
    imageUrl: '/projects/art-recommendation.png',
  },
  {
    id: 'space-case',
    name: 'SpaceCase',
    description: 'This repo is a containerized full stack application using Python, Flask, JavaScript, Vite, React, Redux, Web3, MetaMask, Infura, Docker, ChakraUI, CSS, HTML technologies. Making uploads on Web3 feel as natural Web2.',
    technologies: ['Python', 'Flask', 'JavaScript', 'Vite', 'React', 'Redux', 'Web3', 'MetaMask', 'Infura', 'Docker', 'ChakraUI', 'CSS', 'HTML'],
    link: 'https://github.com/SunTheCoder/testWeb3Project2',
    imageUrl: '/projects/spacecase.png',
  },
  {
    id: 'redis-gallery',
    name: 'Redis Gallery',
    description: 'A gallery of images stored in Redis. Demo for creating a larger gallery management app built for speed and team collaboration',
    technologies: ["Redis", "Next.js", "React", "TailwindCSS", "Vercel"],
    link: 'https://next-vercel-kv-demo.vercel.app/',
    imageUrl: '/projects/redis-gallery.png',
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