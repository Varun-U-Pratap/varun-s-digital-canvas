import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { 
  Github, 
  ExternalLink, 
  Cloud, 
  Utensils,
  ChevronDown,
  ChevronUp,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    id: 1,
    title: "Weather Forecast Web App",
    shortDescription: "Real-time weather forecasting with dynamic day/night themes",
    fullDescription: "A responsive weather forecasting web application that fetches real-time data using the OpenWeatherMap API. Users can search for any city and view temperature, feels-like values, wind speed, humidity, cloud coverage, visibility, and sunrise/sunset times. The interface dynamically switches between day and night themes based on local time.",
    icon: Cloud,
    color: "text-sky-400",
    bgColor: "bg-sky-400/10",
    tech: ["HTML", "CSS", "JavaScript", "OpenWeatherMap API"],
    github: "https://github.com/Varun-U-Pratap/weather",
    features: [
      "Real-time weather data fetching",
      "Dynamic day/night theme switching",
      "Comprehensive weather metrics",
      "City search functionality",
      "Responsive design"
    ]
  },
  {
    id: 2,
    title: "NutriCalc",
    shortDescription: "AI-powered personalized nutrition tracking mobile app",
    fullDescription: "A Flutter-based mobile application for tracking nutrition goals and daily food intake. NutriCalc supports multiple user profiles, personalized calorie and macro calculations, food search via the Edamam API, AI-powered diet and workout suggestions, daily motivational tips, and a polished UI with light/dark themes and animations.",
    icon: Utensils,
    color: "text-emerald-400",
    bgColor: "bg-emerald-400/10",
    tech: ["Flutter", "Dart", "Riverpod", "Edamam API", "Google Gemini API"],
    github: "https://github.com/Varun-U-Pratap/NutriCalc",
    features: [
      "Multiple user profiles support",
      "AI-powered diet recommendations",
      "Personalized macro calculations",
      "Food search with Edamam API",
      "Light/dark theme support"
    ]
  }
];

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = project.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="glass-card-hover overflow-hidden"
    >
      {/* Card Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-xl ${project.bgColor}`}>
            <Icon className={`w-6 h-6 ${project.color}`} />
          </div>
          <div className="flex items-center gap-2">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-secondary transition-colors"
            >
              <Github className="w-5 h-5 text-muted-foreground hover:text-foreground" />
            </a>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
        <p className="text-muted-foreground text-sm mb-4">{project.shortDescription}</p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs font-medium rounded-full bg-secondary text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Expand Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full justify-center gap-2 text-muted-foreground hover:text-foreground"
        >
          {isExpanded ? (
            <>
              Show Less <ChevronUp className="w-4 h-4" />
            </>
          ) : (
            <>
              View Details <ChevronDown className="w-4 h-4" />
            </>
          )}
        </Button>
      </div>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-2 border-t border-border/50">
              <p className="text-muted-foreground text-sm mb-4">{project.fullDescription}</p>
              
              <div className="mb-4">
                <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  Key Features
                </h4>
                <ul className="space-y-1">
                  {project.features.map((feature, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  View on GitHub
                </Button>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-24 md:py-32 relative" ref={ref}>
      {/* Background accent */}
      <div className="absolute left-1/4 top-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        className="section-container relative z-10"
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A selection of projects that showcase my skills in mobile development and web technologies
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/Varun-U-Pratap"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              size="lg"
              className="gap-2 border-border hover:bg-secondary"
            >
              <Github className="w-5 h-5" />
              View More on GitHub
            </Button>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ProjectsSection;
