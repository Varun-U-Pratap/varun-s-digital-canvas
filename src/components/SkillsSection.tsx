import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Smartphone, 
  Code2, 
  Brain, 
  Wrench,
  Zap
} from "lucide-react";

const skillCategories = [
  {
    title: "Mobile Development",
    icon: Smartphone,
    color: "text-cyan-400",
    bgColor: "bg-cyan-400/10",
    skills: [
      { name: "Flutter", level: 85 },
      { name: "Dart", level: 80 },
    ],
  },
  {
    title: "Programming",
    icon: Code2,
    color: "text-violet-400",
    bgColor: "bg-violet-400/10",
    skills: [
      { name: "Python", level: 70 },
      { name: "Dart", level: 80 },
      { name: "DSA", level: 50, learning: true },
    ],
  },
  {
    title: "AI / ML",
    icon: Brain,
    color: "text-pink-400",
    bgColor: "bg-pink-400/10",
    skills: [
      { name: "AI Fundamentals", level: 55, learning: true },
      { name: "ML Basics", level: 45, learning: true },
    ],
  },
  {
    title: "Tools & Technologies",
    icon: Wrench,
    color: "text-amber-400",
    bgColor: "bg-amber-400/10",
    skills: [
      { name: "Git", level: 75 },
      { name: "GitHub", level: 80 },
      { name: "Linux", level: 60 },
      { name: "VS Code", level: 90 },
      { name: "Cursor AI", level: 70 },
    ],
  },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="skills" className="py-24 md:py-32 relative" ref={ref}>
      {/* Background accent */}
      <div className="absolute right-0 top-1/3 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="section-container relative z-10"
      >
        {/* Section Header */}
        <motion.div variants={cardVariants} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A curated collection of technologies I work with and am actively learning
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((category) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                variants={cardVariants}
                className="glass-card-hover p-6"
              >
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 rounded-xl ${category.bgColor}`}>
                    <Icon className={`w-6 h-6 ${category.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold">{category.title}</h3>
                </div>

                {/* Skills List */}
                <div className="space-y-4">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{skill.name}</span>
                          {skill.learning && (
                            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs">
                              <Zap className="w-3 h-3" />
                              Learning
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground">{skill.level}%</span>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                          className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Tech Stack Icons */}
        <motion.div variants={cardVariants} className="mt-12">
          <p className="text-center text-sm text-muted-foreground mb-6">Primary Tech Stack</p>
          <div className="flex flex-wrap justify-center gap-4">
            {["Flutter", "Dart", "Python", "Git", "VS Code"].map((tech) => (
              <motion.div
                key={tech}
                whileHover={{ scale: 1.1, y: -5 }}
                className="px-6 py-3 glass-card text-sm font-medium hover:border-primary/50 transition-colors cursor-default"
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default SkillsSection;
