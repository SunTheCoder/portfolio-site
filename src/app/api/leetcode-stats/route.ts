import { NextResponse } from 'next/server';

interface LeetCodeStats {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  // acceptanceRate: string;
  ranking: number;
}

interface LeetCodeSubmission {
  difficulty: "Easy" | "Medium" | "Hard";
  count: number;
}

interface LeetCodeResponse {
  data?: {
    matchedUser?: {
      submitStats?: {
        acSubmissionNum: LeetCodeSubmission[];
      };
      profile?: {
        ranking: number;
      };
    };
  };
}

export async function GET() {
  try {
    const username = 'SunTheCoder';
    const query = `
      query userProfile($username: String!) {
        matchedUser(username: $username) {
          submitStats: submitStatsGlobal {
            acSubmissionNum {
              difficulty
              count
            }
          }
          profile {
            ranking
          }
        }
      }
    `;

    const response = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { username }
      }),
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      console.error('LeetCode API error:', await response.text());
      throw new Error('LeetCode API request failed');
    }

    const data: LeetCodeResponse = await response.json();
    console.log('LeetCode response:', JSON.stringify(data, null, 2));
    
    const stats: LeetCodeStats = {
      totalSolved: 0,
      easySolved: 0,
      mediumSolved: 0,
      hardSolved: 0,
      // acceptanceRate: "0",
      ranking: data.data?.matchedUser?.profile?.ranking || 0
    };

    const submissions = data.data?.matchedUser?.submitStats?.acSubmissionNum;
    if (submissions) {
      submissions.forEach((sub: LeetCodeSubmission) => {
        const count = sub.count || 0;
        switch(sub.difficulty) {
          case "Easy": stats.easySolved = count; break;
          case "Medium": stats.mediumSolved = count; break;
          case "Hard": stats.hardSolved = count; break;
        }
      });
      stats.totalSolved = stats.easySolved + stats.mediumSolved + stats.hardSolved;
    }

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching LeetCode stats:', error);
    return NextResponse.json({
      totalSolved: 0,
      easySolved: 0,
      mediumSolved: 0,
      hardSolved: 0,
      // acceptanceRate: "0",
      ranking: 0
    });
  }
} 