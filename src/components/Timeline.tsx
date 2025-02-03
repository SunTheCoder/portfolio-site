'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAchievements } from '@/contexts/AchievementContext';

interface TimelineItem {
  date: string;
  title: string;
  company: string;
  descriptionLine1?: string;
  descriptionLine2?: string;
  descriptionLine3?: string;
  descriptionLine4?: string;
  technologies: string[];
}

const timelineData: TimelineItem[] = [
  {
    date: "2024 - Present",
    title: "Software Engineer",
    company: "Amerind Nation",
    descriptionLine1: `• Led development of a platform connecting Indigenous Nations with clean energy funding opportunities.`,
    descriptionLine2: `• Implemented scalable, GIS mapping features and grant management system.`,
    technologies: ["Next.js", "React", "Python/Flask", "PostgreSQL", "AWS", "GIS"]
  },
  {
    date: "2024 - 2025",
    title: "App Academy Full-Time Year long Bootcamp",
    company: "App Academy",
    descriptionLine1: "• Completed a rigorous 800+ hour, year long coding bootcamp focused on full stack web development at one of the top 10 coding bootcamps in the country.",
    descriptionLine2: "• Spent 1500+ additional hours studying and building my own projects",
    technologies: ["JavaScript", "React", "Node.js", "PostgreSQL", "Python", "Flask", "AWS", "Docker", "Git", "CI/CD", "React", "Redux", "SQL", "REST", "Authentication", "Authorization", "Testing", "Debugging", "Deployment", "Scrum", "Kanban", "Project Management", "Code Review", "Pair Programming", "Code Refactoring", "Code Optimization", "Code Documentation", "Code Version Control", "Code Collaboration", "Code Security", "Code Performance", "Code Scalability", "Code Maintainability", "Code Readability", "Code Reliability", "Code Testability", "Code Documentation", "Code Version Control", "Code Collaboration", "Code Security", "Code Performance", "Code Scalability", "Code Maintainability", "Code Readability", "Code Reliability", "Code Testability"]
  },
  {
    date: "2022 - Present",
    title: "Codecademy",
    company: "Codecademy",
    descriptionLine1: "• Completed 1000+ hours of online courses in many software engineering topics.",
    descriptionLine2: "• Reinforced learning from the App Academy bootcamp.",
    technologies: ["JavaScript", "Typescript", "React", "Node.js", "PostgreSQL", "Python", "Flask", "AWS", "Docker", "Git", "CI/CD", "React", "Redux", "SQL", "REST"]
  },
  {
    date: "2022 - Present",
    title: "Software Engineer",
    company: "Longwood University",
    descriptionLine1: "• Developed Art Collection Management Tool built on Redis, AI-powered art recommendation system for university art museum.",
    descriptionLine2: "• Built mobile application for virtual museum tours.",
    technologies: ["TensorFlow", "React Native", "Python", "Node.js", "AI", "React", "Redux", "SQL", "REST", "NoSQL", "AWS", "Redis", "REST", "Google Cloud Platform", "Authentication", "Authorization", "Testing" ]
  },
  {
    date: "2016 - 2018",
    title: "Self Taught Coding",
    company: "Self-Teaching",
    descriptionLine1: "• Self taught coding through Lynda.com online courses and tutorials.",
    descriptionLine2: "• Learned JavaScript fundamentals.",
    technologies: ["JavaScript"]
  },
  {
    date: "2014 - 2015",
    title: "Freelance Portfolio Sites",
    company: "Self-Employed",
    descriptionLine1: "• Built portfolio sites for local businesses and organizations.",
    technologies: ["Adobe Dreamweaver", "HTML", "CSS", "Adobe Photoshop"]
  },
  {
    date: "2011 - 2013",
    title: "Graphic Design",
    company: "Maryland Institute College of Art",
    descriptionLine1: "• Learned graphic design and illustration which introduced me to Dreamweaver, HTML, CSS, and Photoshop.",
    descriptionLine2: "• Went on to build my own portfilio site at the time, as well as some for other friends.",
    technologies: ["Adobe Photoshop", "Adobe Illustrator", "Adobe InDesign", "Adobe Dreamweaver", "HTML", "CSS"]
  }
];

export default function Timeline() {
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { unlockAchievement } = useAchievements();
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleTimelineClick = (index: number) => {
    setActiveItem(activeItem === index ? null : index);
    if (!hasInteracted) {
      unlockAchievement('timeline_explorer');
      setHasInteracted(true);
    }
  };

  const handleTimelineKeyPress = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleTimelineClick(index);
    }
  };

  return (
    <div className="space-y-4">
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
        aria-expanded={!isCollapsed}
        aria-controls="timeline-content"
      >
        <span>{isCollapsed ? 'Show' : 'Hide'} Timeline</span>
        <svg 
          className={`w-5 h-5 transform transition-transform ${isCollapsed ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            id="timeline-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-visible"
            role="list"
            aria-label="Career timeline"
          >
            <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:bg-gray-200 dark:before:bg-gray-700">
              {timelineData.map((item, index) => (
                <div 
                  key={index} 
                  className="relative flex items-start group"
                  role="listitem"
                >
                  <div className="flex flex-col items-center">
                    <div 
                      className={`absolute left-0 h-4 w-4 rounded-full border-2 border-blue-500 bg-white dark:bg-gray-900 transition-colors ${activeItem === index ? 'bg-blue-500' : ''}`}
                      aria-hidden="true"
                    />
                  </div>
                  <div 
                    className={`ml-10 flex-grow space-y-2 rounded-lg bg-white p-4 shadow-lg transition-all hover:shadow-xl focus-within:shadow-xl focus-within:ring-2 focus-within:ring-blue-500 ${activeItem === index ? 'ring-2 ring-blue-500' : ''}`}
                    tabIndex={0}
                    role="button"
                    aria-expanded={activeItem === index}
                    onKeyDown={(e) => handleTimelineKeyPress(e, index)}
                    onClick={() => handleTimelineClick(index)}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold">{item.title}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">{item.date}</span>
                        <svg 
                          className={`w-5 h-5 transform transition-transform ${activeItem === index ? 'rotate-180' : ''}`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    <p className="text-gray-600 font-medium">{item.company}</p>
                    
                    <AnimatePresence>
                      {activeItem === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-visible"
                        >
                          {item.descriptionLine1 && (
                            <p className="text-gray-600 mb-3">{item.descriptionLine1}</p>
                          )}
                          {item.descriptionLine2 && (
                            <p className="text-gray-600 mb-3">{item.descriptionLine2}</p>
                          )}
                          {item.descriptionLine3 && (
                            <p className="text-gray-600 mb-3">{item.descriptionLine3}</p>
                          )}
                          {item.descriptionLine4 && (
                            <p className="text-gray-600 mb-3">{item.descriptionLine4}</p>
                          )}
                          <div 
                            className="flex flex-wrap gap-2"
                            role="list"
                            aria-label="Technologies used"
                          >
                            {item.technologies.map((tech, techIndex) => (
                              <span 
                                key={`${tech}-${techIndex}`}
                                className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                                role="listitem"
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