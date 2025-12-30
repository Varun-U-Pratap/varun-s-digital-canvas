import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, MapPin, Calendar } from "lucide-react";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="about" className="py-24 md:py-32 relative" ref={ref}>
      {/* Background accent */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="section-container relative z-10"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Passionate about building meaningful applications and exploring cutting-edge technologies
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* About Text */}
          <motion.div variants={itemVariants} className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              I am a Computer Science Engineering student at Ramaiah Institute of Technology 
              with a strong interest in mobile application development, artificial intelligence, 
              and machine learning. I primarily work with <span className="text-primary font-medium">Flutter</span> and{" "}
              <span className="text-primary font-medium">Dart</span> to build cross-platform 
              mobile applications and enjoy creating real-world projects that combine clean UI 
              with efficient logic.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Alongside mobile development, I am actively learning{" "}
              <span className="text-primary font-medium">Python</span>,{" "}
              <span className="text-primary font-medium">DSA</span>,{" "}
              <span className="text-primary font-medium">AI</span>, and{" "}
              <span className="text-primary font-medium">ML</span> to build a strong foundation 
              for intelligent systems. I believe in learning by building and continuously apply 
              my knowledge through hands-on projects.
            </p>

            {/* Location Badge */}
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary" />
              <span>Bengaluru, Karnataka, India</span>
            </div>

            {/* Languages */}
            <div className="flex flex-wrap gap-3 pt-4">
              {["English", "Kannada", "Japanese"].map((lang) => (
                <span
                  key={lang}
                  className="px-4 py-2 rounded-full glass-card text-sm text-muted-foreground"
                >
                  {lang}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Education Timeline */}
          <motion.div variants={itemVariants}>
            <div className="glass-card p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg bg-primary/10">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Education</h3>
              </div>

              <div className="relative pl-8 border-l-2 border-primary/30">
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary" />
                
                <div className="pb-8">
                  <h4 className="text-lg font-semibold mb-1">
                    Bachelor of Engineering
                  </h4>
                  <p className="text-primary font-medium mb-2">
                    Computer Science & Engineering
                  </p>
                  <p className="text-muted-foreground mb-3">
                    Ramaiah Institute of Technology
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>2024 – 2028</span>
                  </div>
                </div>

                <div className="absolute left-[-9px] bottom-0 w-4 h-4 rounded-full bg-primary/30 border-2 border-primary" />
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-border/50">
                <div className="text-center">
                  <p className="text-2xl font-bold gradient-text">2+</p>
                  <p className="text-xs text-muted-foreground">Projects</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold gradient-text">3</p>
                  <p className="text-xs text-muted-foreground">Certifications</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold gradient-text">1st</p>
                  <p className="text-xs text-muted-foreground">Year Student</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
