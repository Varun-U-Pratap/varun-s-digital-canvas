import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Code2, Trophy, Target, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const LEETCODE_USERNAME = "upratapvarun";
const GFG_USERNAME = "upratapim33";

const CACHE_KEY = "leetcode_stats_cache";
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in ms

interface LeetCodeStats {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  acceptanceRate: number;
  ranking: number;
}

interface CachedData {
  data: LeetCodeStats;
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const fetchLeetCodeStats = async () => {
      // Check cache first
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsedCache: CachedData = JSON.parse(cached);
        if (Date.now() - parsedCache.timestamp < CACHE_DURATION) {
          setLeetCodeStats(parsedCache.data);
          setLoading(false);
          return;
        }
      }

      try {
        const response = await fetch(
          `https://leetcode-stats-api.herokuapp.com/${LEETCODE_USERNAME}`
        );
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        
        if (data.status === "error") throw new Error("API error");

        const stats: LeetCodeStats = {
          totalSolved: data.totalSolved || 0,
          easySolved: data.easySolved || 0,
          mediumSolved: data.mediumSolved || 0,
          hardSolved: data.hardSolved || 0,
          acceptanceRate: data.acceptanceRate || 0,
          ranking: data.ranking || 0,
        };

        // Cache the result
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ data: stats, timestamp: Date.now() })
        );

        setLeetCodeStats(stats);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchLeetCodeStats();
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
            className="glass-card glass-card-hover p-6 rounded-2xl relative overflow-hidden group"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#FFA116]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10">
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
              {loading ? (
                <div className="space-y-4 animate-pulse">
                  <div className="h-16 bg-muted/20 rounded-lg" />
                  <div className="grid grid-cols-3 gap-3">
                    <div className="h-20 bg-muted/20 rounded-lg" />
                    <div className="h-20 bg-muted/20 rounded-lg" />
                    <div className="h-20 bg-muted/20 rounded-lg" />
                  </div>
                </div>
              ) : error ? (
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
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="text-center p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                      <span className="text-2xl font-bold text-green-400">
                        <CountUp end={leetCodeStats.easySolved} />
                      </span>
                      <p className="text-xs text-muted-foreground mt-1">Easy</p>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                      <span className="text-2xl font-bold text-yellow-400">
                        <CountUp end={leetCodeStats.mediumSolved} />
                      </span>
                      <p className="text-xs text-muted-foreground mt-1">Medium</p>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                      <span className="text-2xl font-bold text-red-400">
                        <CountUp end={leetCodeStats.hardSolved} />
                      </span>
                      <p className="text-xs text-muted-foreground mt-1">Hard</p>
                    </div>
                  </div>
                </>
              )}

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
            className="glass-card glass-card-hover p-6 rounded-2xl relative overflow-hidden group"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#2F8D46]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#2F8D46]/10 flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-7 h-7"
                    fill="#2F8D46"
                  >
                    <path d="M21.45 14.315c-.143.28-.334.532-.565.745a3.691 3.691 0 0 1-1.104.695 4.51 4.51 0 0 1-3.116-.016 3.79 3.79 0 0 1-2.135-2.078 3.571 3.571 0 0 1-.292-.906c-.009-.042-.017-.085-.022-.128h3.305a1.108 1.108 0 0 0 1.104-1.104v-.222a1.108 1.108 0 0 0-1.104-1.104h-3.343c.023-.335.078-.668.164-.992.368-1.377 1.404-2.476 2.739-2.905a4.52 4.52 0 0 1 3.102.012c.428.147.827.358 1.176.619.349.26.651.575.889.932l.126.193a1.108 1.108 0 0 0 1.543.29 1.108 1.108 0 0 0 .29-1.543l-.126-.193a5.945 5.945 0 0 0-1.198-1.251 6.127 6.127 0 0 0-1.578-.832 6.747 6.747 0 0 0-4.63-.017c-2.008.639-3.535 2.277-4.045 4.33a5.927 5.927 0 0 0-.163 1.362h-1.36a5.928 5.928 0 0 0-.163-1.362c-.51-2.053-2.037-3.691-4.045-4.33a6.747 6.747 0 0 0-4.63.017 6.128 6.128 0 0 0-1.578.832 5.946 5.946 0 0 0-1.198 1.251l-.126.193a1.108 1.108 0 0 0 .29 1.543 1.108 1.108 0 0 0 1.543-.29l.126-.193c.238-.357.54-.672.889-.932.349-.261.748-.472 1.176-.619a4.52 4.52 0 0 1 3.102-.012c1.335.43 2.371 1.528 2.739 2.905.086.324.141.657.164.992H5.478a1.108 1.108 0 0 0-1.104 1.104v.222a1.108 1.108 0 0 0 1.104 1.104h3.305c-.005.043-.013.086-.022.128a3.571 3.571 0 0 1-.292.906 3.79 3.79 0 0 1-2.135 2.078 4.51 4.51 0 0 1-3.116.016 3.691 3.691 0 0 1-1.104-.695 3.348 3.348 0 0 1-.565-.745l-.193-.361a1.108 1.108 0 0 0-1.481-.481 1.108 1.108 0 0 0-.481 1.481l.193.361a5.608 5.608 0 0 0 .958 1.262 5.94 5.94 0 0 0 1.482.933c.556.26 1.149.443 1.762.543a6.693 6.693 0 0 0 1.93.026 6.57 6.57 0 0 0 1.873-.584 5.94 5.94 0 0 0 1.482-.933 5.609 5.609 0 0 0 .958-1.262c.147-.277.272-.565.373-.862a5.93 5.93 0 0 0 .248-.926h1.36c.05.313.132.62.248.926.101.297.226.585.373.862a5.608 5.608 0 0 0 .958 1.262 5.94 5.94 0 0 0 1.482.933 6.57 6.57 0 0 0 1.873.584 6.693 6.693 0 0 0 1.93-.026 6.174 6.174 0 0 0 1.762-.543 5.94 5.94 0 0 0 1.482-.933 5.608 5.608 0 0 0 .958-1.262l.193-.361a1.108 1.108 0 0 0-.481-1.481 1.108 1.108 0 0 0-1.481.481z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold">GeeksforGeeks</h3>
                  <p className="text-sm text-muted-foreground">@{GFG_USERNAME}</p>
                </div>
              </div>

              {/* GFG Stats Badge */}
              <div className="flex flex-col items-center justify-center py-6 mb-6 rounded-xl bg-muted/10 border border-border/50">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="w-5 h-5 text-[#2F8D46]" />
                  <span className="text-sm text-muted-foreground">Coding Score & Stats</span>
                </div>
                
                {/* GFG Stats Card Image */}
                <img
                  src={`https://geeks-for-geeks-stats-card.vercel.app/?username=${GFG_USERNAME}`}
                  alt="GeeksforGeeks Stats"
                  className="max-w-full h-auto rounded-lg"
                  loading="lazy"
                />
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
