import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-border/50 relative">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="text-xl font-bold gradient-text inline-block mb-2"
            >
              VUP
            </motion.span>
            <p className="text-sm text-muted-foreground">
              © {currentYear} Varun U Pratap. All rights reserved.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <motion.a
              href="https://github.com/Varun-U-Pratap"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg hover:bg-secondary transition-colors"
            >
              <Github className="w-5 h-5 text-muted-foreground hover:text-foreground" />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/varun-u-pratap-856826340"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg hover:bg-secondary transition-colors"
            >
              <Linkedin className="w-5 h-5 text-muted-foreground hover:text-foreground" />
            </motion.a>
            <motion.a
              href="mailto:varunupratap@gmail.com"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg hover:bg-secondary transition-colors"
            >
              <Mail className="w-5 h-5 text-muted-foreground hover:text-foreground" />
            </motion.a>
          </div>

          {/* Made with Love */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Made with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            </motion.div>
            <span>in Bengaluru</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
