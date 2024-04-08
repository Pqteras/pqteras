import { useState, useEffect, useRef } from 'react'
import './styles/app.scss'
import Status from './components/Status'
import Section from './components/Section'
import Links from './components/Links'
import SocialIcons from './components/SocialIcons'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { Analytics } from '@vercel/analytics/react'
import { motion } from 'framer-motion'
import calcAge from './utils/calcAge'
import { containerVariants, titleVariants, contentVariants } from './utils/animations'

function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isInside, setIsInside] = useState(false);
  const containerRef = useRef(null);

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
          <h1>Hey, I'm <span className='cursor-grab text-yellow-300 hover:text-yellow-400 duration-300'>Theocharis</span></h1>
          <Status />
        </motion.header>
        <motion.div className={`self-start justify-between w-full`} variants={contentVariants} initial="hidden" animate="visible" custom={0}>
          <div className="flex self-start w-full items-center space-x-2 mt-1.5 justify-between">
            <p className='self-start'>A wannabe Software Developer</p>
            <SocialIcons />
          </div>
        </motion.div>
        <Section
          index={1}
          title={`About Me`}
          text={`Greetings! My name is Theocharis Pasvantis. I am a computer science enthusiast, currently pursuing my degree in Lamia, Greece. 
                  At ${calcAge()} years old, I am deeply immersed in the fascinating world of technology, dedicated to expanding my knowledge and skills in this ever-evolving field.`}
        />
        <Section 
          index={2}
          title={`Hobbies`}
          text={`Alongside my computer science studies, I'm deeply involved in hobbies like table tennis, video gaming, and fitness, which complement my passion for coding. 
          I firmly believe in blending one's career with personal interests for a fulfilling life.`}
        />
        <Section 
          index={3}
          title={`Knowledge`}
          text={
            <>
              My coding journey ignited a passion for JavaScript, highlighted by Discord projects using
              {` `}<Links text={`discord.js`} link={`https://discord.js.org/`}/>. I'm beyond a beginner but always eager to learn more. 
              I have a solid grasp of HTML, CSS and {` `}<Links text={`electron.js`} link={`https://www.electronjs.org/`}/> and am gradually advancing in {` `}<Links text={`React.js`} link={`https://react.dev/`}/>.
            </>
          }
        />
        <Analytics />
        <SpeedInsights />
      </motion.main>
    </>
  )
}

export default App