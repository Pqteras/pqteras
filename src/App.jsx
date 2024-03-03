import { useState, useEffect, useRef } from 'react'
import Status from './components/Status'
import Section from './components/Section'
import Links from './components/Links'
import SocialIcons from './components/SocialIcons'
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

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isInside) return;
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
      <main
        ref={containerRef}
        className="main-container"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          transition: 'transform 0.2s ease-out',
        }}
        onMouseEnter={() => setIsInside(true)} 
        onMouseLeave={() => setIsInside(false)}
      >
        <header className='self-start'>
          <h1>Hey, I'm <span className='cursor-grab text-yellow-300 hover:text-yellow-200 duration-300'>Theocharis</span></h1>
          <Status />
        </header>
        <div className="flex self-start w-full items-center space-x-2 mt-1.5 justify-between">
          <p className='self-start'>A wannabe Software Developer</p>
          <SocialIcons />
        </div>
        <Section title={`About Me`} 
                 text={`Greetings! My name is Theocharis Pasvantis. I am a computer science enthusiast, currently pursuing my degree in Lamia, Greece. 
                 At ${myAge()} years old, I am deeply immersed in the fascinating world of technology, dedicated to expanding my knowledge and skills in this ever-evolving field.`}
        />
        <Section title={`Hobbies`}
                 text={`Alongside my computer science studies, I'm deeply involved in hobbies like table tennis, video gaming, and fitness, which complement my passion for coding. 
                 I firmly believe in blending one's career with personal interests for a fulfilling life.`}  
        />
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
      </main>
    </>
  )
}

export default App