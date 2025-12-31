import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// LeetCode Username - hardcoded as per requirements
const LEETCODE_USERNAME = "upratapvarun";

// Cache storage
let cachedData: {
  platform: string;
  totalSolved: number;
  easy: number;
  medium: number;
  hard: number;
  lastUpdated: string;
} | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes in milliseconds

// GraphQL query to fetch LeetCode user stats
const LEETCODE_GRAPHQL_QUERY = `
  query getUserProfile($username: String!) {
    matchedUser(username: $username) {
      username
      submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
        }
      }
    }
  }
`;

async function fetchLeetCodeStats() {
  console.log(`Fetching LeetCode stats for: ${LEETCODE_USERNAME}`);
  
  const response = await fetch('https://leetcode.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Referer': 'https://leetcode.com',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    },
    body: JSON.stringify({
      query: LEETCODE_GRAPHQL_QUERY,
      variables: { username: LEETCODE_USERNAME }
    }),
  });

  if (!response.ok) {
    throw new Error(`LeetCode API error: ${response.status}`);
  }

  const data = await response.json();
  console.log('LeetCode API response:', JSON.stringify(data));

  if (data.errors) {
    throw new Error(`GraphQL error: ${data.errors[0]?.message || 'Unknown error'}`);
  }

  const matchedUser = data.data?.matchedUser;
  if (!matchedUser) {
    throw new Error('User not found');
  }

  // Parse submission stats
  const submissions = matchedUser.submitStatsGlobal?.acSubmissionNum || [];
  
  let totalSolved = 0;
  let easy = 0;
  let medium = 0;
  let hard = 0;

  for (const stat of submissions) {
    switch (stat.difficulty) {
      case 'All':
        totalSolved = stat.count;
        break;
      case 'Easy':
        easy = stat.count;
        break;
      case 'Medium':
        medium = stat.count;
        break;
      case 'Hard':
        hard = stat.count;
        break;
    }
  }

  console.log(`Parsed stats - Total: ${totalSolved}, Easy: ${easy}, Medium: ${medium}, Hard: ${hard}`);

  return {
    platform: "LeetCode",
    totalSolved,
    easy,
    medium,
    hard,
    lastUpdated: new Date().toISOString()
  };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const now = Date.now();
    
    // Check if we have valid cached data
    if (cachedData && (now - lastFetchTime) < CACHE_DURATION) {
      console.log("Returning cached LeetCode data");
      return new Response(JSON.stringify(cachedData), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Try to fetch fresh data from LeetCode GraphQL API
    try {
      const stats = await fetchLeetCodeStats();
      cachedData = stats;
      lastFetchTime = now;
      
      console.log("Returning fresh LeetCode data");
      return new Response(JSON.stringify(stats), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (fetchError) {
      console.error("LeetCode API fetch failed:", fetchError);
      
      // Return cached data if available, even if expired
      if (cachedData) {
        console.log("API failed, returning stale cached data");
        return new Response(JSON.stringify({
          ...cachedData,
          stale: true
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      // Return fallback data if no cache available
      // These are known values that can be updated periodically
      return new Response(JSON.stringify({
        platform: "LeetCode",
        totalSolved: 50,
        easy: 25,
        medium: 20,
        hard: 5,
        lastUpdated: new Date().toISOString(),
        error: "Failed to fetch live data, showing fallback"
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  } catch (error: unknown) {
    console.error('Error in leetcode-stats function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ 
      error: errorMessage,
      platform: "LeetCode",
      totalSolved: 50,
      easy: 25,
      medium: 20,
      hard: 5,
      lastUpdated: new Date().toISOString()
    }), {
      status: 200, // Return 200 with fallback data
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
