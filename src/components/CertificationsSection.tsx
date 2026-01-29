import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Award, GraduationCap, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";

import cs50xCert from "@/assets/certificates/cs50x.png";
import cs50pCert from "@/assets/certificates/cs50p.png";
import aiVerseCert from "@/assets/certificates/ai-verse.jpeg";

const certifications = [
  {
    id: 1,
    title: "CS50x: Introduction to Computer Science",
    institution: "Harvard University",
    icon: "🎓",
    color: "border-l-red-500",
    bgGlow: "bg-red-500/10",
    image: cs50xCert,
  },
  {
    id: 2,
    title: "CS50's Introduction to Programming with Python",
    institution: "Harvard University",
    icon: "🐍",
    color: "border-l-amber-500",
    bgGlow: "bg-amber-500/10",
    image: cs50pCert,
  },
  {
    id: 3,
    title: "Into the AI Verse",
    institution: "IEEE CIS Chapter",
    icon: "🤖",
    color: "border-l-violet-500",
    bgGlow: "bg-violet-500/10",
    image: aiVerseCert,
  },
];

const CertificationsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedCert, setSelectedCert] = useState<typeof certifications[0] | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Reset image loaded state when dialog opens with new certificate
  useEffect(() => {
    if (selectedCert) {
      setImageLoaded(false);
    }
  }, [selectedCert]);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="certifications" className="py-24 md:py-32 relative" ref={ref}>
      {/* Background accent */}
      <div className="absolute right-0 top-1/4 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="section-container relative z-10"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Certifications</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Continuous learning through world-class courses and certifications
          </p>
        </motion.div>

        {/* Certifications Grid */}
        <div className="max-w-3xl mx-auto space-y-4">
          {certifications.map((cert) => (
            <motion.div
              key={cert.id}
              variants={itemVariants}
              whileHover={{ x: 8 }}
              onClick={() => setSelectedCert(cert)}
              className={`glass-card p-6 border-l-4 ${cert.color} relative overflow-hidden group cursor-pointer`}
            >
              {/* Background Glow on Hover */}
              <div className={`absolute inset-0 ${cert.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10 flex items-center gap-4">
                {/* Icon */}
                <div className="text-4xl">{cert.icon}</div>
                
                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1 group-hover:text-foreground transition-colors">
                    {cert.title}
                  </h3>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <GraduationCap className="w-4 h-4" />
                    <span>{cert.institution}</span>
                  </div>
                </div>

                {/* Badge */}
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm">
                  <Award className="w-4 h-4" />
                  <span>View</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Learning Philosophy */}
        <motion.div
          variants={itemVariants}
          className="max-w-2xl mx-auto mt-12 text-center"
        >
          <div className="glass-card p-6 inline-block">
            <p className="text-muted-foreground italic">
              "I believe in learning by building and continuously apply my knowledge through hands-on projects."
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Certificate Preview Dialog */}
      <Dialog open={!!selectedCert} onOpenChange={() => setSelectedCert(null)}>
        <DialogContent className="max-w-4xl w-[95vw] p-2 sm:p-4 bg-background/95 backdrop-blur-xl">
          <DialogTitle className="sr-only">
            {selectedCert?.title} Certificate
          </DialogTitle>
          <button
            onClick={() => setSelectedCert(null)}
            className="absolute right-3 top-3 z-10 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          {selectedCert && (
            <div className="relative w-full">
              {/* Loading Skeleton */}
              {!imageLoaded && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full aspect-[4/3] rounded-lg overflow-hidden"
                >
                  <Skeleton className="w-full h-full bg-muted/50" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-3">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
                      />
                      <span className="text-sm text-muted-foreground">Loading certificate...</span>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {/* Actual Image */}
              <motion.img
                src={selectedCert.image}
                alt={`${selectedCert.title} Certificate`}
                className={`w-full h-auto rounded-lg shadow-2xl transition-opacity duration-300 ${
                  imageLoaded ? "opacity-100" : "opacity-0 absolute top-0 left-0"
                }`}
                onLoad={() => setImageLoaded(true)}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={imageLoaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
              
              <motion.div 
                className="mt-4 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: imageLoaded ? 1 : 0, y: imageLoaded ? 0 : 10 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <h3 className="text-lg font-semibold">{selectedCert.title}</h3>
                <p className="text-sm text-muted-foreground">{selectedCert.institution}</p>
              </motion.div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default CertificationsSection;
