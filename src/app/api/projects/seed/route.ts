import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

const initialProjects = [
  {
    id: 'lcva-portal',
    name: 'LCVA Portal',
    description: 'In development is an iOS application for Longwood University/the Longwood Center of Visual Arts. The application, utilizing Swift/SwiftUI and Python/Flask, aims to enhance education, engagement, and business analytics across the campus. The application is designed to be scalable to accommodate the evolving needs of the organization.',
    technologies: ['Swift', 'SwiftUI', 'Python', 'Flask', 'Firebase', 'Firestore'],
    link: 'https://github.com/SunTheCoder/LCVASwiftPortal',
    imageUrl: '/projects/lcva-portal.png',
  },
  {
    id: 'bad-kitty',
    name: 'Bad Kitty Does Not Like Art Museums',
    description: 'This repo is full stack application using Vanilla JavaScript, Express, AWS S3 Storage, HTML, CSS technologies.',
    technologies: ['JavaScript', 'Express', 'AWS S3 Storage', 'HTML', 'CSS'],
    link: 'https://badkittycomicgame.netlify.app/',
    imageUrl: '/projects/bad-kitty.png',
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
    id: 'cec-website',
    name: 'Clean Energy Connectors',
    description: 'An extremely lightweight, yet powerful Full-Stack application using React, JavaScript, Next.js, TailwindCSS, and Mapbox to map ArcGis and GeoJson data in order to build a more streamlined connection to grant funding and grant information for distressed and disadvantaged communities.',
    technologies: ['JavaScript', 'Next.js', 'React', 'Tailwind CSS', 'Mapbox', 'AWS', 'ArcGIS', 'GeoJSON', 'Supabase'],
    link: 'https://ceconnectors.org',
    imageUrl: '/projects/cec-map.png',
  },
  {
    id: 'care-map',
    name: 'Care Map',
    description: 'This repo is a full stack application using JavaScript, React, Redux, Vite, Supabase, Leaflet Maps, Open Cage Geolocation, MetaMask/Infura API for crypto wallet management.',
    technologies: ['React', 'Leaflet', 'TypeScript', 'Supabase', 'Open Cage Geolocation', 'MetaMask/Infura API', 'Vite', 'Redux', 'ChakraUI', 'Web Sockets'],
    link: 'https://communityv2-lyart.vercel.app',
    imageUrl: '/projects/care-map.png',
  },
  {
    id: 'art-recommendation',
    name: 'Art Recommender',
    description: 'This repo is an AI Art Recommendation tool built with LangChain and OpenAI; using a dataset that I am creating and actively testing. To be used in the LCVA Portal mobile application I am building for Longwood University. Previous versions of this project used TensorFlow and Keras.',
    technologies: ['TypeScript', 'Python', 'Flask', 'TensorFlow', 'Keras', 'LangChain', 'OpenAI', 'Next.js', 'FastAPI', 'TailwindCSS'],
    link: 'https://lcva-ai.vercel.app/',
    imageUrl: '/projects/art-recommendation.png',
  },
  {
    id: 'redis-gallery',
    name: 'Redis Gallery',
    description: 'A gallery of images stored in Redis. Demo for creating a larger gallery management app built for speed and team collaboration',
    technologies: ["JavaScript", "Redis", "Next.js", "React", "TailwindCSS", "Vercel"],
    link: 'https://next-vercel-kv-demo.vercel.app/',
    imageUrl: '/projects/redis-gallery.png',
  },
  {
    id: 'crypto-predictor',
    name: 'Crypto Predictor',
    description: 'An AI agent for predicting the price of a crypto currency using LLMs and a dataset of historical price data.',
    technologies: ['Python', 'Flask', 'TensorFlow', 'Keras', 'LangChain', 'OpenAI', 'Next.js', 'FastAPI', 'TailwindCSS'],
    link: 'https://github.com/SunTheCoder/crypto-predictor-ai',
    imageUrl: '/projects/crypto-predictor.png',
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