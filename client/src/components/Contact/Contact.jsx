import './Contact.scss'
import { MdEmail } from 'react-icons/md';
import { FaLinkedin, FaGithub } from 'react-icons/fa'
import { motion, useMotionValue, useTransform, useMotionTemplate, useSpring } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
const Contact = () => {

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const cont = useRef(0);

    const [contAnchor, setContAnchor] = useState({ x: 0, y: 0 });

    const [viewportSize, setViewportSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    // Update viewport size state on window resize
    useEffect(() => {
        const handleResize = () => {
            setViewportSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);

        // Cleanup the event listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []); // Empty dependency array means this effect runs once on mount


    useEffect(() => {
        if(cont.current) {
            let contBounds = cont.current.getBoundingClientRect();
            let contX = contBounds.left;
            let contY = contBounds.top;
            setContAnchor({ x: contX, y: contY });
            console.log("Positin of top: ", contY)
          }

    }, [viewportSize])


 

    const radialX = useTransform(mouseX, x => (x - contAnchor.x));
    const radialY = useTransform(mouseY, y => {
        console.log("Y: " + y);
        console.log("contAnchor.x: " + contAnchor.y);
        return y - contAnchor.y
    });
    const springX = useSpring(radialX, { damping: 25, mass: 0.5, stiffness: 150})
    const springY = useSpring(radialY, { damping: 25, mass: 0.5, stiffness: 150})
    radialY.on('change', (x) => console.log(x));

  return (
    <div className='app-contact'    onMouseMove={(e) => {
        mouseX.set(e.pageX);
        mouseY.set(e.pageY);
    }}  ref={cont}>
        <div className='contact-card' 
              
  
            >
            <motion.div className="card-overlay" 
             
                   
                style={{ background: useMotionTemplate`radial-gradient(400px circle at ${springX}px ${springY}px, rgb(102 98 97), rgb(128, 114, 112))` }}
                />
            <div className="card-header">
                <h2>Contact me</h2>
            </div>
            <div className="card-content">
                        <div className="content-row">
                            Shoot me an email or connect with me on Linkedin!
                        </div>
                        <div className="content-row">
                            <MdEmail size={30} color='#F0E6CF' />
                           <a href="mailto:ben-zac@outlook.com">ben-zac@outlook.com</a>
                        </div>
                        <div className="content-row">
                            <FaLinkedin size={30} color='#F0E6CF' />
                            <a href='https://www.linkedin.com/in/benjamin-taylor-722398102/'>/benjamin-taylor-722398102</a>
                        </div>
                        <div className="content-row">
                            <FaGithub size={30} color='#F0E6CF' />
                            <a href='https://github.com/zaczacariah/'>
                                /zaczacariah
                            </a>
                        </div>
            </div>

        </div>
    </div>
  )
}

export default Contact