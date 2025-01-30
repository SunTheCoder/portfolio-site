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
    date: "2024 - Present",
    title: "Software Engineer",
    company: "Amerind Nation",
    description: "Led development of a platform connecting Indigenous Nations with clean energy funding opportunities. Implemented GIS mapping features and grant management system.",
    technologies: ["Next.js", "Python/Flask", "PostgreSQL", "AWS", "GIS"]
  },
  {
    date: "2024 - 2025",
    title: "App Academy",
    company: "App Academy",
    description: "Completed a rigorous 1000+ hour, year long coding bootcamp focused on full stack web development. Learned JavaScript, React, Node.js, and more.",
    technologies: ["JavaScript", "React", "Node.js", "PostgreSQL", "Python", "Flask", "AWS", "Docker", "Git", "CI/CD", "React", "Redux", "SQL", "REST", "Authentication", "Authorization", "Testing", "Debugging", "Deployment", "Scrum", "Kanban", "Project Management", "Code Review", "Pair Programming", "Code Refactoring", "Code Optimization", "Code Documentation", "Code Version Control", "Code Collaboration", "Code Security", "Code Performance", "Code Scalability", "Code Maintainability", "Code Readability", "Code Reliability", "Code Testability", "Code Documentation", "Code Version Control", "Code Collaboration", "Code Security", "Code Performance", "Code Scalability", "Code Maintainability", "Code Readability", "Code Reliability", "Code Testability"]
  },
  {
    date: "2022 - Present",
    title: "Codecademy",
    company: "Codecademy",
    description: "Completed online courses in many software engineering topics. Learned Python, JavaScript, React, Node.js, and more.",
    technologies: ["JavaScript", "React", "Node.js", "PostgreSQL", "Python", "Flask", "AWS", "Docker", "Git", "CI/CD", "React", "Redux", "SQL", "REST"]
  },
  {
    date: "2022 - Present",
    title: "Software Engineer",
    company: "Longwood University",
    description: "Developed AI-powered art recommendation system for university art museum. Built mobile application for virtual museum tours.",
    technologies: ["TensorFlow", "React Native", "Python", "Node.js", "AI", "React", "Redux", "SQL", "REST", "NoSQL", "AWS"]
  },
  {
    date: "2016 - 2018",
    title: "Self Taught Coding",
    company: "Self-Teaching",
    description: "Self taught coding through online courses and tutorials. Learned JavaScript fundamentals.",
    technologies: ["JavaScript"]
  },
  {
    date: "2014 - 2015",
    title: "Freelance Portfolio Sites",
    company: "Self-Employed",
    description: "Built portfolio sites for local businesses and organizations.",
    technologies: ["Adobe Dreamweaver", "HTML", "CSS", "Adobe Photoshop"]
  },
  {
    date: "2011 - 2013",
    title: "Graphic Design",
    company: "Maryland Institute College of Art",
    description: "Learned graphic design and illustration which introduced me to Dreamweaver, HTML, CSS, and Photoshop.",
    technologies: ["Adobe Photoshop", "Adobe Illustrator", "Adobe InDesign", "Adobe Dreamweaver", "HTML", "CSS"]
  }
];

export default function Timeline() {
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="space-y-4">
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
      >
        <span>{isCollapsed ? 'Show' : 'Hide'} Timeline</span>
        <svg 
          className={`w-5 h-5 transform transition-transform ${isCollapsed ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-visible" // Changed from overflow-hidden
          >
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
                          className="overflow-visible" // Changed from overflow-hidden
                        >
                          <p className="text-gray-600 dark:text-gray-300 mb-3">{item.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {item.technologies.map((tech, techIndex) => (
                              <span 
                                key={`${tech}-${techIndex}`}
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 