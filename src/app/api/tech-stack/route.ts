import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const techStack = [
  {
    name: 'JavaScript',
    path: 'JavaScript.png',
    proficiency: 95, 
    yearsOfExperience: 3
  },
  {
    name: 'TypeScript',
    path: 'TypeScript.png',
    proficiency: 90,
    yearsOfExperience: 2
  },
  {
    name: 'Swift',
    path: 'Swift.png',
    proficiency: 80,
    yearsOfExperience: 1
  },
  {
    name: 'Python',
    path: 'Python.png',
    proficiency: 85,
    yearsOfExperience: 2
  },
  {
    name: 'React',
    path: 'React.png', 
    proficiency: 95,
    yearsOfExperience: 2
  },
  {
    name: 'Next.js',
    path: 'Next.js.png',
    proficiency: 90,
    yearsOfExperience: 1
  },
  {
    name: 'Flask',
    path: 'Flask.png',
    proficiency: 85,
    yearsOfExperience: 2
  },
  {
    name: 'PostgreSQL',
    path: 'PostgreSQL.png',
    proficiency: 80,
    yearsOfExperience: 2
  },
  {
    name: 'Docker',
    path: 'Docker.png',
    proficiency: 75,
    yearsOfExperience: 1
  },
  {
    name: 'AWS',
    path: 'AWS.png',
    proficiency: 80,
    yearsOfExperience: 1
  },
  {
    name: 'Redux',
    path: 'Redux.png',
    proficiency: 85,
    yearsOfExperience: 2
  },
  {
    name: 'Node.js',
    path: 'Node.js.png',
    proficiency: 85,
    yearsOfExperience: 2
  },
  {
    name: 'GitHub',
    path: 'GitHub.png',
    proficiency: 90,
    yearsOfExperience: 2
  },
  {
    name: 'TailwindCSS',
    path: 'Tailwind.png',
    proficiency: 90,
    yearsOfExperience: 1
  },
  {
    name: 'CSS3',
    path: 'CSS3.png',
    proficiency: 90,
    yearsOfExperience: 3
  },
  {
    name: 'Express',
    path: 'Express.png',
    proficiency: 95,
    yearsOfExperience: 2
  },
  {
    name: 'Firebase',
    path: 'Firebase.png',
    proficiency: 85,
    yearsOfExperience: 1
  },
  {
    name: 'Google Cloud',
    path: 'GoogleCloud.png',
    proficiency: 85,
    yearsOfExperience: 1
  },
  {
    name: 'HTML5',
    path: 'HTML5.png',
    proficiency: 95,
    yearsOfExperience: 3
  },
  {
    name: 'Keras',
    path: 'Keras.png',
    proficiency: 75,
    yearsOfExperience: 1
  },
  {
    name: 'Homebrew',
    path: 'Homebrew.png',
    proficiency: 80,
    yearsOfExperience: 2
  },
  {
    name: 'NPM',
    path: 'NPM.png',
    proficiency: 85,
    yearsOfExperience: 3
  },
  {
    name: 'Postman',
    path: 'Postman.png',
    proficiency: 85,
    yearsOfExperience: 2
  },
  {
    name: 'ESLint',
    path: 'ESLint.png',
    proficiency: 85,
    yearsOfExperience: 2
  },
  {
    name: 'Nodemon  ',
    path: 'Nodemon.png',
    proficiency: 85,
    yearsOfExperience: 2
  },
  {
    name: 'MetaMask',
    path: 'Metamask.svg',
    proficiency: 85,
    yearsOfExperience: 2
  },
  {
    name: 'Yarn',
    path: 'Yarn.png',
    proficiency: 95,
    yearsOfExperience: 1
  },
  {
    name: 'Vite',
    path: 'Vite.js.png',
    proficiency: 95,
    yearsOfExperience: 2
  },
  {
    name: 'Vercel',
    path: 'Vercel.png',
    proficiency: 90,
    yearsOfExperience: 2
  },
  {
    name: 'Mocha',
    path: 'Mocha.png',
    proficiency: 85,
    yearsOfExperience: 2
  },
  {
    name: 'TensorFlow',
    path: 'TensorFlow.png',
    proficiency: 80,
    yearsOfExperience: 1
  },
  {
    name: 'Redis',
    path: 'Redis.png',
    proficiency: 85,
    yearsOfExperience: 2
  },
  {
    name: 'Supabase',
    path: 'Supabase.svg',
    proficiency: 90,
    yearsOfExperience: 2
  },
  {
    name: 'Sequelize',
    path: 'Sequelize.png',
    proficiency: 90,
    yearsOfExperience: 2
  }
];

export async function GET() {
  return NextResponse.json(techStack);
} 