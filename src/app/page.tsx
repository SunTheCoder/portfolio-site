'use client';  // Need this for react-leaflet to work
import { useState } from 'react';
import Image from "next/image";
import dynamic from 'next/dynamic';
import Projects from '@/components/Projects';
import GitHubActivity from '@/components/GitHubActivity';
import ContactForm from '@/components/ContactForm';
import Modal from '@/components/Modal';

// Dynamically import the Map component with no SSR
const MapWithNoSSR = dynamic(
  () => import('@/components/Map'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[400px] bg-gray-100 animate-pulse rounded-lg" />
    ),
  }
);

export default function Home() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* Navigation */}
      <nav className="w-full max-w-6xl flex justify-between items-center">
        <h1 className="text-4xl font-bold mb-4">
          Hi, I&apos;m Sun 👋
        </h1>
        <button
          onClick={() => setIsContactModalOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Contact Me
        </button>
      </nav>

      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full max-w-6xl">
        {/* Introduction Section */}
        <section className="w-full text-center sm:text-left mb-12">
          
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          I&apos;m a Full Stack Developer specializing in JavaScript, TypeScript, Python/Flask, React, Redux, Next.js, Express, PostgreSQL, and Docker, with a strong focus on accessible design, seamless user experiences, and sound documentation. With over two years of experience, I&apos;ve built applications across museum tech, civic tech, Web3, and AI-driven recommendation systems, leveraging cloud architecture (AWS, Supabase, Firebase), containerization, and decentralized technologies. My recent work includes a museum software platform, a map that streamlines access to millions of dollars for Energy Grants for Tribal Nations and other disenfranchised communities, and an AI-powered art recommendation system, all designed to enhance user engagement and community impact. Currently, I&apos;m exploring DevOps, cloud architecture, and AI-powered tools, always pushing the boundaries of what technology can do for people.          </p>
        </section>

        <div className="w-full grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
          <div className="space-y-12">
            {/* Map Section */}
            <section className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
              <MapWithNoSSR />
            </section>

            {/* Projects Section */}
            <section className="w-full">
              <h2 className="text-3xl font-bold mb-6">My Projects</h2>
              <Projects />
            </section>
          </div>

          <div className="space-y-12">
            {/* GitHub Activity Section */}
            <section className="w-full">
              <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
              <GitHubActivity />
            </section>
          </div>
        </div>
      </main>

      {/* Contact Modal */}
      <Modal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        title="Get in Touch"
      >
        <ContactForm onSuccess={() => setIsContactModalOpen(false)} />
      </Modal>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
