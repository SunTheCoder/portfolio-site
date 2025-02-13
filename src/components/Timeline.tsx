'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAchievements } from '@/contexts/AchievementContext';

interface TimelineItem {
  date: string;
  title: string;
  company: string;
  story: string[];
  challenge?: {
    context: string;
    iterations: {
      title: string;
      description: string;
    }[];
    outcome: string;
  };
  technologies: string[];
}

const timelineData: TimelineItem[] = [
  {
    date: "2024 - Present",
    title: "Full Stack Software Engineer",
    company: "Amerind Nation",
    story: [
      "Led development of a platform connecting Indigenous Nations with clean energy funding opportunities",
      "Implemented scalable, GIS mapping features",
      "Millions of interactive data points processed and visualized on the map lightning fast"
    ],
    challenge: {
      context: "I was tasked with mapping over 1.5GB of ArcGIS data into an interactive web application. My first instinct was to leverage Leaflet and OpenStreetMap, technologies I had successfully used in the past for GeoJSON-based mapping...",
      iterations: [
        {
          title: "Initial Approach",
          description: "Built a React/Redux frontend with a Flask backend. The map worked—I successfully displayed searchable, interactive GeoJSON data with pop-ups and filtering. However, performance was unacceptable with 20-second load times and screen freezes."
        },
        {
          title: "Streamlined Architecture",
          description: "Switched to Next.js for server-side rendering and removed the backend entirely. While the new setup worked, client-side map loading still struggled with large GeoJSON files."
        },
        {
          title: "Final Solution",
          description: "Discovered vector tiling to drastically reduce file sizes while maintaining geographic precision. Developed a custom script to convert and upload the 1.5GB dataset to AWS as Mapbox vector tiles."
        }
      ],
      outcome: "🚀 Reduced geo-spatial data size from 1.5GB to under 500KB\n⚡️ Load times dropped from ~20s to under 2s\n🗺 Achieved smooth rendering with near-instant interactivity\n🔧 Developed a custom script to convert and upload the 1.5GB dataset to AWS as Mapbox vector tiles.\n💃🏽 Improved user experience by having a visually pleasing, responsive, and more interactive map."
    },
    technologies: ["Next.js", "React", "Python/Flask", "PostgreSQL", "AWS", "GIS", "Mapbox", "Leaflet", "OpenStreetMap", "GeoJSON", "Vector Tiles", "Server-Side Rendering", "Client-Side Rendering", "Performance Optimization", "Data Visualization", "Interactive Maps", "Geospatial Development"]
  },
  {
    date: "2022 - Present",
    title: "Full Stack Software Engineer",
    company: "Longwood University",
    story: [
      "Developed an AI-powered art recommendation system bridging emotions and art for the university museum",
      "Built mobile application for virtual museum tours using React Native",
      "Enhanced museum experience for 10,000+ annual visitors through innovative AI solutions"
    ],
    challenge: {
      context: "The project aimed to create an AI-powered system that could connect users with artworks based on their emotional states. The challenge was to build a solution that could understand complex emotional contexts and provide meaningful art recommendations in real-time.",
      iterations: [
        {
          title: "TensorFlow/Keras Foundation",
          description: "Built the initial version using Python Flask and TensorFlow/Keras. Created a custom neural network trained on a hand-curated emotional-art dataset. While highly precise, it faced scalability challenges and required significant compute resources."
        },
        {
          title: "LangChain/OpenAI Evolution",
          description: "Reimagined the system using Next.js, FastAPI, and LangChain/OpenAI. This brought greater flexibility in processing unstructured user inputs and enabled real-time recommendations without extensive model computations."
        },
        {
          title: "Mobile Integration",
          description: "Extended the system to a Swift/iOS mobile application, making the art recommendation system accessible to museum visitors on-site through their personal devices."
        }
      ],
      outcome: "🎨 Successfully processed complex emotional inputs for art recommendations\n📱 Deployed mobile app increasing museum engagement\n🤖 Achieved high accuracy in emotional-art matching\n💡 Enhanced museum experience for 10,000+ annual visitors"
    },
    technologies: ["Python", "Flask", "Swift", "SwiftUI", "TensorFlow", "Keras", "LangChain", "OpenAI", "React Native", "Next.js", "FastAPI", "AI/ML"]
  },
  {
    date: "2024 - 2025",
    title: "App Academy Full-Time Year long Bootcamp",
    company: "App Academy",
    story: [
      "Completed a rigorous 800+ hour, year long coding bootcamp focused on full stack web development",
      "Spent 1500+ additional hours studying and building my own projects",
      "Mastered modern web development practices and methodologies"
    ],
    technologies: ["JavaScript", "React", "Node.js", "PostgreSQL", "Python", "Flask", "AWS", "Docker", "Git", "CI/CD", "React", "Redux", "SQL", "REST", "Authentication", "Authorization", "Testing", "Debugging", "Deployment", "Scrum", "Kanban", "Project Management", "Code Review", "Pair Programming", "Code Refactoring", "Code Optimization", "Code Documentation", "Code Version Control", "Code Collaboration", "Code Security", "Code Performance", "Code Scalability", "Code Maintainability", "Code Readability", "Code Reliability", "Code Testability", "Code Documentation", "Code Version Control", "Code Collaboration", "Code Security", "Code Performance", "Code Scalability", "Code Maintainability", "Code Readability", "Code Reliability", "Code Testability"]
  },
  {
    date: "2022 - Present",
    title: "Codecademy",
    company: "Codecademy",
    story: [
      "Completed 1000+ hours of online courses in many software engineering topics.",
      "Reinforced learning from the App Academy bootcamp.",
    ],
    technologies: ["JavaScript", "Typescript", "React", "Node.js", "PostgreSQL", "Python", "Flask", "AWS", "Docker", "Git", "CI/CD", "React", "Redux", "SQL", "REST"]
  },
  {
    date: "2016 - 2018",
    title: "Self Taught Coding",
    company: "Lynda",
    story: [
      "Self taught coding through Lynda.com online courses and tutorials.",
      "Learned JavaScript fundamentals.",
    ],
    technologies: ["JavaScript"]
  },
  {
    date: "2014 - 2015",
    title: "Freelance Portfolio Sites",
    company: "Self-Employed",
    story: [
      "Built portfolio sites for local businesses and organizations.",
    ],
    technologies: ["Adobe Dreamweaver", "HTML", "CSS", "Adobe Photoshop"]
  },
  {
    date: "2011 - 2013",
    title: "Graphic Design",
    company: "Maryland Institute College of Art",
    story: [
      "Learned graphic design and illustration which introduced me to Dreamweaver, HTML, CSS, and Photoshop.",
      "Went on to build my own portfilio site at the time, as well as some for other friends.",
    ],
    technologies: ["Adobe Photoshop", "Adobe Illustrator", "Adobe InDesign", "Adobe Dreamweaver", "UI/UX Design", "HTML", "CSS"]
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
                    style={{ minHeight: activeItem === index ? '200px' : 'auto' }}
                  >
                    <div
                      tabIndex={0}
                      role="button"
                      aria-expanded={activeItem === index}
                      onKeyDown={(e) => handleTimelineKeyPress(e, index)}
                      onClick={() => handleTimelineClick(index)}
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold">{item.title}</h3>
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
                      <p className="text-gray-600 font-bold text-lg">{item.company}</p>
                    </div>

                    <AnimatePresence>
                      {activeItem === index && (
                        <motion.div
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ 
                            duration: 0.2,
                            ease: "easeOut"
                          }}
                          className="space-y-6"
                        >
                          {/* Key Achievements */}
                          <div className="space-y-4">
                            {item.story.map((point, i) => (
                              <p key={i} className="text-gray-600 dark:text-gray-300 pl-4">
                                • {point}
                              </p>
                            ))}
                          </div>

                          {/* Technical Challenge */}
                          {item.challenge && (
                            <div className="space-y-4">
                              <h3 className="text-medium font-bold text-gray-700 dark:text-gray-200 italic">Technical Challenge</h3>
                              <p className="text-gray-600 dark:text-gray-300">
                                {item.challenge.context}
                              </p>
                              
                              {item.challenge.iterations.map((iteration, i) => (
                                <div key={i} className="pl-4">
                                  <h4 className="font-bold text-gray-700 dark:text-gray-200 mb-2">
                                    {iteration.title}
                                  </h4>
                                  <p className="text-gray-600 dark:text-gray-300">
                                    • {iteration.description}
                                  </p>
                                </div>
                              ))}

                              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                                <p className="font-mono text-sm whitespace-pre-line text-gray-600 dark:text-gray-300">
                                  {item.challenge.outcome}
                                </p>
                              </div>
                            </div>
                          )}

                          {/* Technologies */}
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