import { FaLinkedin, FaGithub, FaInstagram, FaDiscord } from 'react-icons/fa';
import { useState } from 'react';

const SocialIcons = () => {
    const [showDiscord, setShowDiscord] = useState(false);

    const toggleDiscord = (e) => {
        e.preventDefault(); // Prevent the link default action
        setShowDiscord(!showDiscord);
    };

    return (
        <div className="flex space-x-4">
        <a href="https://github.com/Pqteras" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition-colors duration-200">
            <FaGithub size="24" />
        </a>
        <a href="https://www.instagram.com/pasvantiss" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition-colors duration-200">
            <FaInstagram size="24" />
        </a>
        <a href="https://www.linkedin.com/in/theocharis-pasvantis-311525166/" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition-colors duration-200">
            <FaLinkedin size="24" />
        </a>
        <a href="#" onClick={toggleDiscord} className="hover:text-yellow-300 transition-colors duration-200 relative">
        <FaDiscord size="24" />
            {showDiscord && (
            <div className="absolute -top-12 translate-x-[-70px] px-4 py-2 text-white rounded-md">
                @pqteras
            </div>
            )}
        </a>
        </div>
  );
};

export default SocialIcons;