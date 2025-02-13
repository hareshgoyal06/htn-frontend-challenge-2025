import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Globe, XIcon } from "lucide-react";

// Define props for handling close functionality
interface AboutMePopupProps {
  onClose: () => void;
}

// Social Links
const socialLinks = [
  { name: "GitHub", url: "https://github.com/hareshgoyal06", icon: "🐙" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/haresh-goyal-744232286/", icon: "🔗" },
  { name: "Website", url: "https://hareshgoyal.ca", icon: "🌍" },
];

const AboutMePopup: React.FC<AboutMePopupProps> = ({ onClose }) => {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose} // Close when clicking outside
      >
        <motion.div
          className="bg-gray-800 rounded-lg border border-blue-500 shadow-xl p-6 w-full max-w-lg flex flex-col items-center relative"
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          onClick={(e) => e.stopPropagation()} // Prevents modal from closing when clicking inside
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-all"
          >
            <XIcon className="h-5 w-5" />
          </button>

          {/* Profile Image (Slightly Smaller for Compact Layout) */}
          <div className="w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg mb-4">
            <img
              src="/images/rugby.jpg" // Replace with actual image path
              alt="Haresh Goyal"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Centered Name & Bio */}
          <h2 className="text-2xl font-bold text-blue-300 text-center mb-2">
            👋🏼 Hey, I'm Haresh!
          </h2>
          <p className="text-gray-300 text-sm text-center">
            First-year Computer Engineering student @ University of Waterloo.
          </p>

          {/* Hack the North Section */}
          <h3 className="text-md font-bold text-blue-300 text-center mt-3">
            🌟 Hack the North Frontend Developer?
          </h3>
          <p className="text-gray-300 text-xs text-center">
            I’m eager to join Hack the North and contribute to a great hacker experience. Looking forward to connecting!
          </p>

          {/* Skills & Fun Fact */}
          <h3 className="text-md font-bold text-blue-300 text-center mt-3">
            💻 Tech Stack
          </h3>
          <p className="text-gray-300 text-xs text-center">
            Proficient in Python, Java, C++, Web & Full-Stack Development. Working on ML projects for social good.
          </p>

          <h3 className="text-md font-bold text-blue-300 text-center mt-3">
            🎯 Fun Fact
          </h3>
          <p className="text-gray-300 text-xs text-center">
            Got a concussion playing dodgeball—so I definitely don’t dodge opportunities! 😅
          </p>

          {/* Social Links */}
          <div className="mt-4 flex gap-4">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-blue-300 transition-all flex items-center gap-2 text-sm"
              >
                {link.icon}
                <span className="hidden sm:inline">{link.name}</span>
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AboutMePopup;
