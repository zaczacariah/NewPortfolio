import './Resume.scss'
import { motion } from 'framer-motion'

const Resume = () => {
  return (
    <div className='app-resume'>
        <div className='resume-filler' />
        <div className='resume-filler' />
        
        <div className='resume-content'>
            <div className='content-container' >
                <motion.img 
                    id="html_mono" 
                    src="./avatar_icons/html_monochrome.png" 
                    alt="html" 

                    initial={{ opacity: 0, y: 200 }}
                    whileInView={{ opacity: 1, y:0 }}
                    transition={{ duration: 3, delay: 0.3  }} 
                    />

                <motion.img 
                    id="css_mono" 
                    src="./avatar_icons/css_monochrome.png" 
                    alt="css"

                    initial={{ opacity: 0, y: 200 }}
                    whileInView={{ opacity: 1, y:0 }}
                    transition={{ duration: 2 }} />
                 
                
                <h1>Resume</h1>
                <p>I'd love to work with you!</p>
                <p>Click below to view my resume.</p>
                <a href='./Ben_Taylor_Site.pdf' target='_blank'>
                    <div className='resume-button'><h1>Download</h1></div>
                </a>
            </div>
        </div>

        <div className='resume-filler' />
         <div className='resume-filler' />

    </div>
  )
}

export default Resume