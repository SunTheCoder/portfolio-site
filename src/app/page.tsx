'use client';  // Need this for react-leaflet to work
import { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import dynamic from 'next/dynamic';
import Projects from '@/components/Projects';
import GitHubActivity from '@/components/GitHubActivity';
import ContactForm from '@/components/ContactForm';
import Modal from '@/components/Modal';
import TechStack from '@/components/TechStack';
import VideoModal from '@/components/VideoModal';
import Timeline from '@/components/Timeline';
import Tooltip from '@/components/Tooltip';
import { motion, AnimatePresence } from 'framer-motion';
import AchievementPopup from '@/components/Achievement';
import { useAchievements } from '@/contexts/AchievementContext';
import XPBar from '@/components/XPBar';
import BattleStatus from '@/components/BattleStatus';
import ThemeToggle from '@/components/ThemeToggle';

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
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [showBattleStatus, setShowBattleStatus] = useState(false);
  const { unlockAchievement } = useAchievements();
  const introRef = useRef<HTMLDivElement>(null);

  const battleStatusTimeoutRef = useRef<NodeJS.Timeout>(null);

  const handleContactClick = () => {
    // Add to contact button click
    unlockAchievement('contact_made');
    setIsContactModalOpen(true);
  };

  const handleMouseEnter = () => {
    if (battleStatusTimeoutRef.current) {
      clearTimeout(battleStatusTimeoutRef.current);
    }
    setShowBattleStatus(true);
    unlockAchievement('stat_check');
  };

  const handleMouseLeave = () => {
    battleStatusTimeoutRef.current = setTimeout(() => {
      setShowBattleStatus(false);
    }, 500); // 500ms delay before hiding
  };

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (battleStatusTimeoutRef.current) {
        clearTimeout(battleStatusTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* Navigation */}
      <nav className="w-full max-w-6xl flex justify-between items-center">
        <div className="flex items-center gap-6">
          <div 
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="relative w-40 h-40 rounded-full overflow-hidden border-2 border-blue-500 shadow-lg">
              <Image
                src="/me.jpeg"
                alt="Sun's photo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <AnimatePresence>
              {showBattleStatus && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-0 left-full ml-4 z-50"
                >
                  <BattleStatus onClose={() => setShowBattleStatus(false)} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold">Hi, I&apos;m Sun 👋🏾</h1>
            <h4 className="text-md font-bold">Product Manager residing in Richmond, VA</h4>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <ThemeToggle />
          <Tooltip text="Intro video coming soon!">
            <button
              className="px-4 py-2 text-gray-400 dark:text-gray-500 cursor-not-allowed transition-colors"
              disabled
            >
              Watch Intro ▶️
            </button>
          </Tooltip>
          <Tooltip text="Let's connect!">
            <button
              onClick={handleContactClick}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Contact Me
            </button>
          </Tooltip>
        </div>
      </nav>

      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full max-w-6xl">
        {/* Introduction Section */}
        <section id="intro-section" ref={introRef} className="w-full space-y-8">
          <div className="prose max-w-none">
            <p className="text-lg">
              I&apos;m a Product Manager with a lifetime background in museums and the arts, specializing in Linux, C++, JavaScript, TypeScript, Python/Flask, Augmented Reality, Virtual Reality, AI (Agents, Machine Learning, LLMs), React, Next.js, Express, PostgreSQL, and Docker, with a strong focus on accessible design, seamless user experiences, and sound documentation. With over 10 years of experience, I&apos;ve built applications across museum tech, civic tech, Web3, and AI-driven recommendation systems, leveraging cloud architecture (AWS, Supabase, Firebase), containerization, and decentralized technologies. My recent work includes a museum software platform, a map that streamlines access to millions of dollars for Energy Grants for Tribal Nations and other disenfranchised communities, and an AI-powered art recommendation system, all designed to enhance user engagement and community impact. Currently, I&apos;m exploring DevOps, cloud architecture, and AI-powered tools, always pushing the boundaries of what technology can do for people.
            </p>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="w-full">
          <h2 className="text-2xl font-bold mb-4">Technologies</h2>
          <div 
            className="bg-white/90 dark:bg-white/30 backdrop-blur-sm rounded-xl p-6 shadow-lg"
            onMouseEnter={() => unlockAchievement('tech_master')} // Unlock when exploring tech stack
          >
            <TechStack />
          </div>
        </section>

        <section className="w-full space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Experience</h2>
              <Tooltip text="Download my resume">
              <a
                href="/Sun-resume.pdf"
                download
                onClick={() => unlockAchievement('resume_downloaded')}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Resume
              </a>
            </Tooltip>
          </div>
          <Timeline />
        </section>

        <div className="w-full grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
          <div className="space-y-12">
            {/* Map Section */}
            <section className="w-full">
              <h2 className="text-2xl font-bold mb-4">Map of Impact</h2>
              <div 
                className="h-[400px] rounded-lg overflow-hidden shadow-lg"
                onClick={() => unlockAchievement('map_explorer')} // Unlock when clicking the map
              >
                <MapWithNoSSR />
              </div>
            </section>

            {/* Projects Section */}
            <section className="w-full">
              <h2 className="text-2xl font-bold mb-6">Portfolio</h2>
              <div onMouseEnter={() => unlockAchievement('project_viewer')}> {/* Unlock when browsing projects */}
                <Projects />
              </div>
            </section>
          </div>

          <div className="space-y-12">
            {/* GitHub Activity Section */}
            <section className="w-full">
              <h2 className="text-2xl font-bold mb-4">GitHub Activity</h2>
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

      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />

      <footer className="row-start-3 w-full max-w-6xl space-y-8">
        <div className="flex gap-6 flex-wrap items-center justify-center">
          <Tooltip text="View my LinkedIn profile">
            <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4"
              href="https://www.linkedin.com/in/sunthecoder"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                src="/LinkedIn.png" 
                alt="LinkedIn icon"
                width={16}
                height={16}
              />
              LinkedIn
            </a>
          </Tooltip>
          <Tooltip text="Check out my GitHub repos">
            <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4"
              href="https://github.com/sunthecoder"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                src="/tech/GitHub.png"
                alt="GitHub icon"
                width={16}
                height={16}
                className="bg-white rounded-full p-[2px]"
              />
              GitHub
            </a>
          </Tooltip>
          
        </div>
      </footer>

      <XPBar />
      <AchievementPopup />
    </div>
  );
}
