'use client';
import { useState, useEffect } from 'react';
import type { Project } from '@/app/api/projects/route';
import Image from 'next/image';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <div>Loading projects...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects.map((project) => (
        <div key={project.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          {project.image && (
            <Image
              src={project.image}
              alt={project.name}
              width={500}
              height={300}
              className="w-full h-48 object-cover rounded-t-lg"
            />
          )}
          <h3 className="text-xl font-bold mb-2">{project.name}</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
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
    </div>
  );
} 