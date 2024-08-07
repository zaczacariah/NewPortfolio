import './Intro.scss'
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'


const containerVariants = {
  hidden: { 
    opacity: 0, 
    y: -100 
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 1.5, 
      staggerChildren: 0.3, 
      delayChildren: 0.3 
    }
  }
}

const childVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 }
}

const Intro = () => {

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [eyeOneAnchor, setEyeOneAnchor] = useState({ x: 0, y: 0 });
  const [eyeTwoAnchor, setEyeTwoAnchor] = useState({ x: 0, y: 0 });

  const eyeOne = useRef(null);
  const eyeTwo = useRef(null);


  useEffect(() => {

    if(eyeOne.current) {
      const rekt = eyeOne.current.getBoundingClientRect();
      const eyeX = rekt.left + rekt.width / 2;
      const eyeY = rekt.top + rekt.height / 2;
      setEyeOneAnchor({ x: eyeX-5, y: eyeY });
    }

    if(eyeTwo.current) {
      const rekt = eyeTwo.current.getBoundingClientRect();
      const eyeX = rekt.left + rekt.width / 2;
      const eyeY = rekt.top + rekt.height / 2;
      setEyeTwoAnchor({ x: eyeX+5, y: eyeY });
    }

  }, []); 


  const eyeOneX = useTransform(mouseX, x => (x - eyeOneAnchor.x));
  const eyeOneY = useTransform(mouseY, y => (y - eyeOneAnchor.y));
  const eyeTwoX = useTransform(mouseX, x => (x - eyeTwoAnchor.x));
  const eyeTwoY = useTransform(mouseY, y => (y - eyeTwoAnchor.y));
  const iconSetX = useTransform(mouseX, x => (x - eyeOneAnchor.x));
  const iconSetY = useTransform(mouseY, x => (x - eyeOneAnchor.y));
  

  const eyeOneXRange = useTransform(eyeOneX, [-300, 0, 300], [-7, 0, 7]);
  const eyeoneYRange = useTransform(eyeOneY, [-300, 0, 300], [-1, 0, 4.5]);
  const eyeTwoXMove = useTransform(eyeTwoX, [-300, 0, 300], [-7, 0, 7]);
  const eyeTwoYMove = useTransform(eyeTwoY, [-300, 0, 300], [-1, 0, 4.5]);
  const iconSetXMove = useTransform(iconSetX, [-600, 0, 600], [3, 0, -3]);
  const iconSetYMove = useTransform(iconSetY, [-600, 0, 600], [3, 0, -3]);


  const eyeOneXSpring = useSpring(eyeOneXRange, { damping: 10, mass: 0.5, stiffness: 100});
  const eyeOneYSpring = useSpring(eyeoneYRange, { damping: 10, mass: 0.5, stiffness: 100});
  const eyeTwoXSpring = useSpring(eyeTwoXMove, { damping: 10, mass: 0.5, stiffness: 100});
  const eyeTwoYSpring = useSpring(eyeTwoYMove, { damping: 10, mass: 0.5, stiffness: 100});
  const iconSetXSpring = useSpring(iconSetXMove, { damping: 20, mass: 1.5, stiffness: 50});
  const iconSetYSpring = useSpring(iconSetYMove, { damping: 10, mass: 1, stiffness: 100});
  const iconSetXSpring2 = useSpring(iconSetXMove, { damping: 25, mass: 0.5, stiffness: 150});

  return (
    <div className='app-intro' onMouseMove={(e) => {
      mouseX.set(e.pageX);
      mouseY.set(e.pageY);
    }}>
        <motion.div 
          className='intro-avatar'
          // initial={{ opacity: 0, scale: .9  }}
          // animate={{ opacity: 1, scale: 1 }}
          // transition={{ delay: 0.5, duration: 1.5 }}        

          > 
          <div className='avatar-container'>
            <div className='backdrop' />
            <img id="eyeholes" src='./avatar_eyeholes_comp.png' alt='avatar' />
            <img id="eyeless" src='./avatar_eyeless_comp.png' alt='avatar' />
            <motion.img id="eyeone" src='./avatar_eyeone_comp.png' alt='avatar' ref={eyeOne} style={{transform: useMotionTemplate`translateX(${eyeOneXSpring}px) translateY(${eyeOneYSpring}px) `, transformOrigin: 'center' }} />
            <motion.img id="eyetwo" src='./avatar_eyetwo_comp.png' alt='avatar' ref={eyeTwo} style={{transform: useMotionTemplate`translateX(${eyeTwoXSpring}px) translateY(${eyeTwoYSpring}px) `, transformOrigin: 'center' }} />
            <motion.img id="react" src='./avatar_icons/react_new.png' alt='react' style={{transform: useMotionTemplate`translateX(${iconSetXSpring2}px) translateX(-55%) translateY(${iconSetYSpring}px) `, transformOrigin: 'center' }} />
            <motion.img id="node" src='./avatar_icons/node_new.png' alt='node' style={{transform: useMotionTemplate`translateX(${iconSetXSpring2}px) translateX(-55%) translateY(${iconSetYSpring}px) `, transformOrigin: 'center' }} />
            <motion.img id="html" src='./avatar_icons/html_new.png' alt='html' style={{transform: useMotionTemplate`translateX(${iconSetXSpring}px) translateX(-55%) translateY(${iconSetYSpring}px) `, transformOrigin: 'center' }} />
            <motion.img id="css" src='./avatar_icons/css_new.png' alt='css' style={{transform: useMotionTemplate`translateX(${iconSetXSpring}px) translateX(-55%) translateY(${iconSetYSpring}px) `, transformOrigin: 'center' }} />
            <motion.img id="jscript" src='./avatar_icons/js_new.png' alt='css' style={{transform: useMotionTemplate`translateX(${iconSetXSpring2}px) translateX(-55%) translateY(${iconSetYSpring}px) `, transformOrigin: 'center' }} />
            <motion.img id="mongo" src='./avatar_icons/mongo_new.png' alt='css' style={{transform: useMotionTemplate`translateX(${iconSetXSpring}px) translateX(-55%) translateY(${iconSetYSpring}px) `, transformOrigin: 'center' }} />
            <motion.img id="graphql" src='./avatar_icons/graph_new.png' alt='css' style={{transform: useMotionTemplate`translateX(${iconSetXSpring2}px) translateX(-55%) translateY(${iconSetYSpring}px) `, transformOrigin: 'center' }} />
            <motion.img id="git" src='./avatar_icons/git_new.png' alt='css' style={{transform: useMotionTemplate`translateX(${iconSetXSpring}px) translateX(-55%) translateY(${iconSetYSpring}px) `, transformOrigin: 'center' }} />
            <img id="backdrop" src='./backdrop.png' alt='backdrop' />
            
            
          </div>
        </motion.div>
        <motion.div 
          className='intro-content'
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2 variants={childVariants}>Hey, my name is</motion.h2>
          <motion.h1 variants={childVariants}>BEN <span id='lastname'>TAYLOR</span></motion.h1>
          <motion.p variants={childVariants}>I am an Adelaide based Junior Full-Stack Web Developer.</motion.p>
          <motion.p variants={childVariants}>Specialising in React, Node, Express & Wordpress</motion.p>
          <motion.p id='love' variants={childVariants}>...and yes, I love design.</motion.p>

          <motion.div variants={childVariants} className='intro-skills'>
            <div className='row'>
              <div><img src='./react.png' alt='react' height='35px' width='40px' /> React</div>
              <div><img src='./node.png' alt='node' height='35px' width='35px' /> Node</div>
              <div><img src='./wordpress.png' alt='wordpress' height='35px' width='35px' /> Wordpress</div>
              <div><img src='./mysql.png' alt='mysql' height='35px' width='50px' /> Mysql</div>
            </div>
            <div className='row'>
              <div><img src='./graphql.png' alt='graphql' height='35px' width='35px' />Graphql</div>
              <div><img src='./heroku.png' alt='heroku' height='40px' width='35px' />Heroku</div>
              <div><img src='./mongo.png' alt='mongodb' height='35px' width='18px' />Mongodb</div>
            </div>
          
          </motion.div>
          
        </motion.div>
        <motion.div 
          className='scroll-down tablet-hide'
          initial={{ opacity: 0, y:50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1.5 }}
          >
            Down Here!
          </motion.div>
        <motion.div 
            initial={{ height: '0px'}}
            animate={{ height: '400px'}}
            transition={{ duration: 2 }}
            className='line tablet-hide' />
        
    </div>
  )
}

export default Intro
