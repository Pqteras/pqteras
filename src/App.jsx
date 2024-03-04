import { useState, useEffect, useRef } from 'react'
import Status from './components/Status'
import Section from './components/Section'
import Links from './components/Links'
import SocialIcons from './components/SocialIcons'
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react'
import { motion } from 'framer-motion';
import './styles/app.scss'

function myAge() {
  const dateBorn = new Date('2004-03-14');
  const currentDate = new Date();
  const differenceInMilliseconds = currentDate - dateBorn;
  const differenceInYears = differenceInMilliseconds / (1000 * 60 * 60 * 24 * 365.25); // Convert milliseconds to years
  return Math.floor(differenceInYears);
}

function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isInside, setIsInside] = useState(false);
  const containerRef = useRef(null); 

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delay: 0.1, duration: 0.3, ease: "easeInOut" }
    }
  };
  
  // This could be for smaller elements like titles
  const titleVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { delay: 0.5, duration: 0.8, ease: "easeInOut" }
    }
  };

  const contentVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: index => ({
      y: 0,
      opacity: 1,
      transition: { delay: 0.7 + index * 0.2, duration: 1, ease: "easeInOut" }
    })
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isInside || window.innerWidth < 768) return;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const x = e.clientX - centerX;
      const y = e.clientY - centerY;

      setPosition({ x: x * 0.025, y: y * 0.025 });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isInside]);

  return(
    <>
      <motion.main
        variants={containerVariants}
        initial='hidden'
        animate={`visible`}
        ref={containerRef}
        className="main-container"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          transition: 'transform 0.2s ease-out',
        }}
        onMouseEnter={() => setIsInside(true)} 
        onMouseLeave={() => setIsInside(false)}
      >
        <motion.header className={`self-start`} variants={titleVariants}>
          <h1>Hey, I'm <span className='cursor-grab text-yellow-300 hover:text-yellow-200 duration-300'>Theocharis</span></h1>
          <Status />
        </motion.header>
        <motion.div className={`self-start justify-between w-full`} variants={contentVariants} initial="hidden" animate="visible" custom={0}>
          <div className="flex self-start w-full items-center space-x-2 mt-1.5 justify-between">
            <p className='self-start'>A wannabe Software Developer</p>
            <SocialIcons />
          </div>
        </motion.div>
        <motion.div variants={contentVariants} initial="hidden" animate="visible" custom={1}>
          <Section title={`About Me`}
                  text={`Greetings! My name is Theocharis Pasvantis. I am a computer science enthusiast, currently pursuing my degree in Lamia, Greece. 
                  At ${myAge()} years old, I am deeply immersed in the fascinating world of technology, dedicated to expanding my knowledge and skills in this ever-evolving field.`}
          />
        </motion.div>
        <motion.div variants={contentVariants} initial="hidden" animate="visible" custom={2}>
          <Section title={`Hobbies`}
                  text={`Alongside my computer science studies, I'm deeply involved in hobbies like table tennis, video gaming, and fitness, which complement my passion for coding. 
                  I firmly believe in blending one's career with personal interests for a fulfilling life.`}  
          />
        </motion.div>
        <motion.div variants={contentVariants} initial="hidden" animate="visible" custom={3}>
          <Section
            title={`Knowledge`}
            text={
              <>
                My coding journey ignited a passion for JavaScript, highlighted by Discord projects using
                {` `}<Links text={`discord.js`} link={`https://discord.js.org/`}/>. I'm beyond a beginner but always eager to learn more. 
                I have a solid grasp of HTML, CSS and {` `}<Links text={`electron.js`} link={`https://www.electronjs.org/`}/> and am gradually advancing in {` `}<Links text={`React.js`} link={`https://react.dev/`}/>.
              </>
            }
          />
        </motion.div>
        <Analytics />
        <SpeedInsights />
      </motion.main>
    </>
  )
}

export default App