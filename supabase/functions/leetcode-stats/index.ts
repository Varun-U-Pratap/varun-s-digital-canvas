import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { username } = await req.json();

    const query = `
      query userProfile($username: String!) {
        matchedUser(username: $username) {
          submitStatsGlobal {
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

    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables: { username } }),
    });

    if (!response.ok) {
      throw new Error(`LeetCode API returned ${response.status}`);
    }

    const data = await response.json();
    const user = data.data?.matchedUser;

    if (!user) {
      throw new Error("User not found");
    }

    const submissions = user.submitStatsGlobal.acSubmissionNum;
    const stats = {
      totalSolved: submissions.find((s: any) => s.difficulty === "All")?.count || 0,
      easySolved: submissions.find((s: any) => s.difficulty === "Easy")?.count || 0,
      mediumSolved: submissions.find((s: any) => s.difficulty === "Medium")?.count || 0,
      hardSolved: submissions.find((s: any) => s.difficulty === "Hard")?.count || 0,
      ranking: user.profile.ranking || 0,
    };

    return new Response(JSON.stringify(stats), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
