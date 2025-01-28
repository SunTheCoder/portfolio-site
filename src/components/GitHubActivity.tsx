'use client';
import { useState, useEffect } from 'react';

interface Activity {
  id: string;
  date: string;
  description: string;
  repo: string;
  type: string;
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
          throw new Error(`API error: ${response.status} ${errorText}`);
        }
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setActivities(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching GitHub activity:', error);
        setError(error instanceof Error ? error.message : 'Failed to load activity');
      } finally {
        setLoading(false);
      }
    }

    fetchActivity();
  }, []);

  if (loading) return <div>Loading activity...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!activities.length) return <div>No recent activity</div>;

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