'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TimelineItem {
  date: string;
  title: string;
  company: string;
  description: string;
  technologies: string[];
}

const timelineData: TimelineItem[] = [
  {
    date: "2023 - Present",
    title: "Full Stack Developer",
    company: "Clean Energy Connectors",
    description: "Led development of a platform connecting Indigenous Nations with clean energy funding opportunities. Implemented GIS mapping features and grant management system.",
    technologies: ["Next.js", "Python/Flask", "PostgreSQL", "AWS", "GIS"]
  },
  {
    date: "2022 - 2023",
    title: "Software Engineer",
    company: "Longwood University",
    description: "Developed AI-powered art recommendation system for university art museum. Built mobile application for virtual museum tours.",
    technologies: ["TensorFlow", "React Native", "Python", "Node.js"]
  },
  {
    date: "2021 - 2022",
    title: "Web3 Developer",
    company: "SpaceCase",
    description: "Built decentralized storage solution with Web3 integration. Implemented smart contract functionality and wallet connections.",
    technologies: ["Solidity", "React", "Web3.js", "MetaMask API"]
  }
];

export default function Timeline() {
  const [activeItem, setActiveItem] = useState<number | null>(null);

  return (
    <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:bg-gray-200 dark:before:bg-gray-700">
      {timelineData.map((item, index) => (
        <div key={index} className="relative flex items-start group">
          <div className="flex flex-col items-center">
            <div className={`absolute left-0 h-4 w-4 rounded-full border-2 border-blue-500 bg-white dark:bg-gray-900 transition-colors ${activeItem === index ? 'bg-blue-500' : ''}`} />
          </div>
          <div 
            className={`ml-10 flex-grow cursor-pointer space-y-2 rounded-lg bg-white dark:bg-gray-800 p-4 shadow-lg transition-all hover:shadow-xl ${activeItem === index ? 'ring-2 ring-blue-500' : ''}`}
            onClick={() => setActiveItem(activeItem === index ? null : index)}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">{item.title}</h3>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">{item.date}</span>
                <svg 
                  className={`w-5 h-5 transform transition-transform ${activeItem === index ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 font-medium">{item.company}</p>
            
            <AnimatePresence>
              {activeItem === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <p className="text-gray-600 dark:text-gray-300 mb-3">{item.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.technologies.map((tech) => (
                      <span 
                        key={tech}
                        className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-2 py-1 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      ))}
    </div>
  );
} 