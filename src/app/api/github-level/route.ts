import { NextResponse } from 'next/server';

interface GitHubStats {
  contributions: number;
  repositories: number;
  stars: number;
  followers: number;
}

export async function GET() {
  try {
    const headers = {
      'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
    };

    // Get user data
    const userResponse = await fetch('https://api.github.com/users/sunthecoder', { headers });
    const userData = await userResponse.json();

    // Get repositories
    const reposResponse = await fetch('https://api.github.com/users/sunthecoder/repos', { headers });
    const repos = await reposResponse.json();

    // Calculate total stars
    const totalStars = repos.reduce((acc: number, repo: any) => acc + repo.stargazers_count, 0);

    // Get contribution data (last year)
    const contributionsResponse = await fetch(
      'https://api.github.com/search/commits?q=author:sunthecoder',
      { headers }
    );
    const contributionsData = await contributionsResponse.json();

    const stats: GitHubStats = {
      contributions: contributionsData.total_count || 0,
      repositories: userData.public_repos || 0,
      stars: totalStars,
      followers: userData.followers || 0
    };

    // Calculate level based on metrics
    // Base formula: (contributions * 0.5) + (repos * 10) + (stars * 5) + (followers * 2)
    const xp = (stats.contributions * 0.5) + 
               (stats.repositories * 10) + 
               (stats.stars * 5) + 
               (stats.followers * 2);
    
    const level = Math.floor(xp / 100) + 1;

    return NextResponse.json({ 
      level,
      stats,
      xp: Math.floor(xp)
    });
  } catch (error) {
    console.error('Error fetching GitHub level:', error);
    return NextResponse.json({ error: 'Failed to fetch GitHub level' }, { status: 500 });
  }
} 