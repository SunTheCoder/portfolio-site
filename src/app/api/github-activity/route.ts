import { NextResponse } from 'next/server';

const GITHUB_USERNAME = 'sunspla-sh';

interface GitHubEvent {
  id: string;
  type: string;
  created_at: string;
  repo: {
    name: string;
    url: string;
  };
  payload: {
    commits?: Array<{
      message: string;
      sha: string;
    }>;
    action?: string;
    ref_type?: string;
    ref?: string;
    description?: string;
  };
}

export async function GET() {
  try {
    console.log('Fetching GitHub events...');
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/events/public`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
        },
        next: { revalidate: 60 }
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('GitHub API Error:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      throw new Error(`GitHub API error: ${response.status} ${errorText}`);
    }

    const events: GitHubEvent[] = await response.json();
    console.log('Fetched events:', events.length);
    
    // Format the events into readable activity items
    const activities = events.slice(0, 5).map(event => {
      let description = '';
      
      switch (event.type) {
        case 'PushEvent':
          const commitCount = event.payload.commits?.length || 0;
          const lastCommit = event.payload.commits?.[0]?.message || '';
          description = `Pushed ${commitCount} commit${commitCount === 1 ? '' : 's'}${lastCommit ? `: "${lastCommit}"` : ''}`;
          break;
        case 'CreateEvent':
          description = `Created ${event.payload.ref_type} ${event.payload.ref || ''}`;
          break;
        case 'IssuesEvent':
          description = `${event.payload.action} an issue`;
          break;
        default:
          description = event.type.replace('Event', '');
      }

      return {
        id: event.id,
        date: new Date(event.created_at).toLocaleDateString(),
        description,
        repo: event.repo.name,
        type: event.type,
      };
    });

    return NextResponse.json(activities);
  } catch (error) {
    console.error('Error fetching GitHub activity:', error);
    return NextResponse.json({ error: 'Failed to fetch GitHub activity' }, { status: 500 });
  }
} 