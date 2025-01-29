'use client';
import { useState, useEffect } from 'react';

interface Activity {
  id: string;
  date: string;
  description: string;
  repo: string;
  type: string;
}

function ActivitySkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20" />
          </div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
        </div>
      ))}
    </div>
  );
}

export default function GitHubActivity() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchActivity() {
      try {
        const response = await fetch('/api/github-activity');
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText);
        }
        const data = await response.json();
        setActivities(data);
      } catch (error) {
        console.error('Error fetching GitHub activity:', error);
        setError('Failed to load GitHub activity');
      } finally {
        setLoading(false);
      }
    }

    fetchActivity();
  }, []);

  if (loading) return <ActivitySkeleton />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div 
          key={activity.id}
          className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {activity.date}
            </span>
            <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-2 py-1 rounded-full">
              {activity.type.replace('Event', '')}
            </span>
          </div>
          <p className="text-gray-700 dark:text-gray-300">{activity.description}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            in {activity.repo}
          </p>
        </div>
      ))}
    </div>
  );
} 