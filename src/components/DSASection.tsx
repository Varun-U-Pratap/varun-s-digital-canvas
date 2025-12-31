import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Code2, Trophy, Zap, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const LEETCODE_USERNAME = "upratapvarun";
const GFG_USERNAME = "upratapim33";

const LEETCODE_CACHE_KEY = "leetcode_stats_cache";
const GFG_CACHE_KEY = "gfg_stats_cache";
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in ms

interface LeetCodeStats {
  platform: string;
  totalSolved: number;
  easy: number;
  medium: number;
  hard: number;
  lastUpdated: string;
  stale?: boolean;
  error?: string;
}

interface GFGStats {
  platform: string;
  totalSolved: number;
  easy: number;
  medium: number;
  hard: number;
  lastUpdated: string;
  stale?: boolean;
  error?: string;
}

interface CachedData<T> {
  data: T;
  timestamp: number;
}

const CountUp = ({ end, duration = 2 }: { end: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    
    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration, isInView]);

  return <span ref={ref}>{count}</span>;
};

const DSASection = () => {
  const [leetCodeStats, setLeetCodeStats] = useState<LeetCodeStats | null>(null);
  const [gfgStats, setGfgStats] = useState<GFGStats | null>(null);
  const [leetCodeLoading, setLeetCodeLoading] = useState(true);
  const [gfgLoading, setGfgLoading] = useState(true);
  const [leetCodeError, setLeetCodeError] = useState(false);
  const [gfgError, setGfgError] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Fetch LeetCode stats from Edge Function
  useEffect(() => {
    const fetchLeetCodeStats = async () => {
      // Check cache first
      const cached = localStorage.getItem(LEETCODE_CACHE_KEY);
      if (cached) {
        const parsedCache: CachedData<LeetCodeStats> = JSON.parse(cached);
        if (Date.now() - parsedCache.timestamp < CACHE_DURATION) {
          setLeetCodeStats(parsedCache.data);
          setLeetCodeLoading(false);
          return;
        }
      }

      try {
        const { data, error } = await supabase.functions.invoke('leetcode-stats');
        
        if (error) throw error;

        const stats: LeetCodeStats = {
          platform: data.platform || "LeetCode",
          totalSolved: data.totalSolved || 0,
          easy: data.easy || 0,
          medium: data.medium || 0,
          hard: data.hard || 0,
          lastUpdated: data.lastUpdated || new Date().toISOString(),
          stale: data.stale,
          error: data.error,
        };

        // Cache the result
        localStorage.setItem(
          LEETCODE_CACHE_KEY,
          JSON.stringify({ data: stats, timestamp: Date.now() })
        );

        setLeetCodeStats(stats);
      } catch (err) {
        console.error("Error fetching LeetCode stats:", err);
        // Fallback data
        setLeetCodeStats({
          platform: "LeetCode",
          totalSolved: 50,
          easy: 25,
          medium: 20,
          hard: 5,
          lastUpdated: new Date().toISOString(),
          error: "Failed to load live data"
        });
      } finally {
        setLeetCodeLoading(false);
      }
    };

    fetchLeetCodeStats();
  }, []);

  // Fetch GFG stats from Edge Function
  useEffect(() => {
    const fetchGFGStats = async () => {
      // Check cache first
      const cached = localStorage.getItem(GFG_CACHE_KEY);
      if (cached) {
        const parsedCache: CachedData<GFGStats> = JSON.parse(cached);
        if (Date.now() - parsedCache.timestamp < CACHE_DURATION) {
          setGfgStats(parsedCache.data);
          setGfgLoading(false);
          return;
        }
      }

      try {
        const { data, error } = await supabase.functions.invoke('gfg-stats');
        
        if (error) throw error;

        const stats: GFGStats = {
          platform: data.platform || "GeeksforGeeks",
          totalSolved: data.totalSolved || 0,
          easy: data.easy || 0,
          medium: data.medium || 0,
          hard: data.hard || 0,
          lastUpdated: data.lastUpdated || new Date().toISOString(),
          stale: data.stale,
          error: data.error,
        };

        // Cache the result
        localStorage.setItem(
          GFG_CACHE_KEY,
          JSON.stringify({ data: stats, timestamp: Date.now() })
        );

        setGfgStats(stats);
      } catch (err) {
        console.error("Error fetching GFG stats:", err);
        // Fallback data
        setGfgStats({
          platform: "GeeksforGeeks",
          totalSolved: 20,
          easy: 18,
          medium: 2,
          hard: 0,
          lastUpdated: new Date().toISOString(),
          error: "Failed to load live data"
        });
      } finally {
        setGfgLoading(false);
      }
    };

    fetchGFGStats();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const },
    },
  };

  return (
    <section id="dsa" className="py-20 md:py-32 relative" ref={sectionRef}>
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Code2 className="w-4 h-4" />
            Competitive Programming
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            DSA & <span className="gradient-text">Problem Solving</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Sharpening algorithmic thinking through consistent practice on
            competitive programming platforms.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
        >
          {/* LeetCode Card */}
          <motion.div
            variants={cardVariants}
            className="glass-card glass-card-hover p-6 rounded-2xl relative overflow-hidden group flex flex-col"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#FFA116]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 flex flex-col flex-1">
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#FFA116]/10 flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-7 h-7"
                    fill="#FFA116"
                  >
                    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold">LeetCode</h3>
                  <p className="text-sm text-muted-foreground">@{LEETCODE_USERNAME}</p>
                </div>
              </div>

              {/* Stats */}
              <div className="flex-1">
                {leetCodeLoading ? (
                  <div className="space-y-4 animate-pulse">
                    <div className="h-16 bg-muted/20 rounded-lg" />
                    <div className="grid grid-cols-3 gap-3">
                      <div className="h-20 bg-muted/20 rounded-lg" />
                      <div className="h-20 bg-muted/20 rounded-lg" />
                      <div className="h-20 bg-muted/20 rounded-lg" />
                    </div>
                  </div>
                ) : leetCodeError ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-2">Unable to load stats</p>
                    <p className="text-sm text-muted-foreground/60">Please check back later</p>
                  </div>
                ) : leetCodeStats && (
                  <>
                    {/* Total Solved */}
                    <div className="text-center py-4 mb-4 rounded-xl bg-muted/10 border border-border/50">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <Trophy className="w-5 h-5 text-[#FFA116]" />
                        <span className="text-sm text-muted-foreground">Problems Solved</span>
                      </div>
                      <span className="text-4xl font-bold gradient-text">
                        <CountUp end={leetCodeStats.totalSolved} />
                      </span>
                    </div>

                    {/* Breakdown */}
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div className="text-center p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                        <span className="text-2xl font-bold text-green-400">
                          <CountUp end={leetCodeStats.easy} />
                        </span>
                        <p className="text-xs text-muted-foreground mt-1">Easy</p>
                      </div>
                      <div className="text-center p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                        <span className="text-2xl font-bold text-yellow-400">
                          <CountUp end={leetCodeStats.medium} />
                        </span>
                        <p className="text-xs text-muted-foreground mt-1">Medium</p>
                      </div>
                      <div className="text-center p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                        <span className="text-2xl font-bold text-red-400">
                          <CountUp end={leetCodeStats.hard} />
                        </span>
                        <p className="text-xs text-muted-foreground mt-1">Hard</p>
                      </div>
                    </div>

                    {/* Last Updated */}
                    {leetCodeStats.lastUpdated && (
                      <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground/60 mb-2">
                        <RefreshCw className="w-3 h-3" />
                        <span>
                          Updated: {new Date(leetCodeStats.lastUpdated).toLocaleString()}
                        </span>
                        {leetCodeStats.stale && <span className="text-yellow-500">(cached)</span>}
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Button */}
              <Button
                variant="outline"
                className="w-full border-[#FFA116]/30 text-[#FFA116] hover:bg-[#FFA116]/10 gap-2"
                asChild
              >
                <a
                  href={`https://leetcode.com/${LEETCODE_USERNAME}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View LeetCode Profile
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </motion.div>

          {/* GeeksforGeeks Card */}
          <motion.div
            variants={cardVariants}
            className="glass-card glass-card-hover p-6 rounded-2xl relative overflow-hidden group flex flex-col"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#2F8D46]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 flex flex-col flex-1">
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#2F8D46]/10 flex items-center justify-center">
                  <svg
                    viewBox="0 0 48 48"
                    className="w-7 h-7"
                    fill="none"
                  >
                    <path
                      d="M29.035 15.15c-2.464 0-4.464 1.973-4.464 4.406s2 4.405 4.464 4.405c2.465 0 4.464-1.972 4.464-4.405 0-2.433-2-4.405-4.464-4.405Zm0 6.66c-1.253 0-2.27-1.01-2.27-2.255s1.017-2.254 2.27-2.254 2.27 1.01 2.27 2.254-1.017 2.254-2.27 2.254Z"
                      fill="#2F8D46"
                    />
                    <path
                      d="M38.085 23.96c2.666-2.48 4.314-6.02 4.314-9.946 0-7.494-6.09-13.564-13.56-13.564-6.175 0-11.375 4.12-13.028 9.76h2.31c1.564-4.37 5.77-7.5 10.718-7.5 6.27 0 11.366 5.08 11.366 11.303 0 4.096-2.177 7.69-5.44 9.7v.004a1.093 1.093 0 0 0 1.157 1.855 1.09 1.09 0 0 0 .397-.299 13.537 13.537 0 0 0 1.766-1.312Z"
                      fill="#2F8D46"
                    />
                    <path
                      d="M19.035 23.96c-2.666 2.48-4.314 6.02-4.314 9.946 0 7.494 6.09 13.564 13.56 13.564 6.175 0 11.375-4.12 13.028-9.76h-2.31c-1.564 4.37-5.77 7.5-10.718 7.5-6.27 0-11.366-5.08-11.366-11.304 0-4.095 2.177-7.69 5.44-9.7v-.003a1.093 1.093 0 0 0-1.157-1.855 1.09 1.09 0 0 0-.397.299 13.537 13.537 0 0 0-1.766 1.312Z"
                      fill="#2F8D46"
                    />
                    <path
                      d="M18.965 28.35c2.464 0 4.464-1.973 4.464-4.406s-2-4.405-4.464-4.405c-2.465 0-4.464 1.972-4.464 4.405 0 2.433 2 4.405 4.464 4.405Zm0-6.66c1.253 0 2.27 1.01 2.27 2.255s-1.017 2.254-2.27 2.254-2.27-1.01-2.27-2.254 1.017-2.254 2.27-2.254Z"
                      fill="#2F8D46"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold">GeeksforGeeks</h3>
                  <p className="text-sm text-muted-foreground">@{GFG_USERNAME}</p>
                </div>
              </div>

              {/* Stats - Live from Edge Function */}
              <div className="flex-1">
                {gfgLoading ? (
                  <div className="space-y-4 animate-pulse">
                    <div className="h-16 bg-muted/20 rounded-lg" />
                    <div className="grid grid-cols-3 gap-3">
                      <div className="h-20 bg-muted/20 rounded-lg" />
                      <div className="h-20 bg-muted/20 rounded-lg" />
                      <div className="h-20 bg-muted/20 rounded-lg" />
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Total Solved */}
                    <div className="text-center py-4 mb-4 rounded-xl bg-muted/10 border border-border/50">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <Trophy className="w-5 h-5 text-[#2F8D46]" />
                        <span className="text-sm text-muted-foreground">Problems Solved</span>
                      </div>
                      <span className="text-4xl font-bold text-[#2F8D46]">
                        <CountUp end={gfgStats?.totalSolved || 0} />
                      </span>
                    </div>

                    {/* Breakdown */}
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div className="text-center p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                        <span className="text-2xl font-bold text-green-400">
                          <CountUp end={gfgStats?.easy || 0} />
                        </span>
                        <p className="text-xs text-muted-foreground mt-1">Easy</p>
                      </div>
                      <div className="text-center p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                        <span className="text-2xl font-bold text-yellow-400">
                          <CountUp end={gfgStats?.medium || 0} />
                        </span>
                        <p className="text-xs text-muted-foreground mt-1">Medium</p>
                      </div>
                      <div className="text-center p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                        <span className="text-2xl font-bold text-red-400">
                          <CountUp end={gfgStats?.hard || 0} />
                        </span>
                        <p className="text-xs text-muted-foreground mt-1">Hard</p>
                      </div>
                    </div>

                    {/* Last Updated */}
                    {gfgStats?.lastUpdated && (
                      <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground/60 mb-2">
                        <RefreshCw className="w-3 h-3" />
                        <span>
                          Updated: {new Date(gfgStats.lastUpdated).toLocaleString()}
                        </span>
                        {gfgStats.stale && <span className="text-yellow-500">(cached)</span>}
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Button */}
              <Button
                variant="outline"
                className="w-full border-[#2F8D46]/30 text-[#2F8D46] hover:bg-[#2F8D46]/10 gap-2"
                asChild
              >
                <a
                  href={`https://www.geeksforgeeks.org/user/${GFG_USERNAME}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View GeeksforGeeks Profile
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex justify-center mt-12"
        >
          <div className="flex items-center gap-3 text-muted-foreground text-sm">
            <Zap className="w-4 h-4 text-primary" />
            <span>Consistent practice builds problem-solving intuition</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DSASection;
