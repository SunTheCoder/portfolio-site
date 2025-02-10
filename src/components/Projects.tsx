'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from '@/app/api/projects/route';
import Image from 'next/image';
import { useAchievements } from '@/contexts/AchievementContext';

const PROJECTS_PER_PAGE = 4;

function ProjectSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 animate-pulse">
      <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4" />
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4" />
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6" />
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full" />
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const [hasViewedAll, setHasViewedAll] = useState(false);
  const { unlockAchievement } = useAchievements();

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch('/api/projects');
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <ProjectSkeleton key={i} />
        ))}
      </div>
    );
  }

  const totalPages = Math.ceil(projects.length / PROJECTS_PER_PAGE);
  const currentProjects = projects.slice(
    currentPage * PROJECTS_PER_PAGE,
    (currentPage + 1) * PROJECTS_PER_PAGE
  );

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    const newPage = currentPage + newDirection;
    setCurrentPage(newPage);
    
    // Check if they've viewed all pages
    if (!hasViewedAll && newPage === totalPages - 1) {
      setHasViewedAll(true);
      unlockAchievement('project_master');
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden p-8">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentPage}
            custom={direction}
            initial={{ x: direction > 0 ? 1000 : -1000, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction < 0 ? 1000 : -1000, opacity: 0 }}
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {currentProjects.map((project) => (
              <div key={project.id} className="bg-white rounded-lg shadow-lg p-6">
                {project.imageUrl && (
                  <Image
                    src={project.imageUrl}
                    alt={project.name}
                    width={500}
                    height={300}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                )}
                <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-sm px-3 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    View Project →
                  </a>
                )}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => paginate(-1)}
            disabled={currentPage === 0}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
          >
            ← Previous
          </button>
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > currentPage ? 1 : -1);
                  setCurrentPage(i);
                }}
                className={`w-2 h-2 rounded-full ${
                  i === currentPage ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => paginate(1)}
            disabled={currentPage === totalPages - 1}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
} 