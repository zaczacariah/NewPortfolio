import './Resume.scss'
import { motion } from 'framer-motion'
import {images} from '../../assets/index.js'

document.documentElement.style.setProperty('--button-border', `url(${images.button_border})`);

const Resume = () => {
return (
    <div className='app-resume'>
            <div className='resume-filler' />
            <div className='resume-filler' />
            
            <div className='resume-content'>
                    <div className='content-container' >
                            <motion.img 
                                    id="html_mono" 
                                    src={images.html_mono}
                                    alt="html" 

                                    initial={{ opacity: 0, y: 200 }}
                                    whileInView={{ opacity: 1, y:0 }}
                                    transition={{ duration: 3, delay: 0.3  }} 
                                    />

                            <motion.img 
                                    id="css_mono" 
                                    src={images.css_mono} 
                                    alt="css"

                                    initial={{ opacity: 0, y: 200 }}
                                    whileInView={{ opacity: 1, y:0 }}
                                    transition={{ duration: 2 }} />
                             
                            
                            <h1>Resume</h1>
                            <p>I'd love to work with you!</p>
                            <p> I am actively seeking opportunities within large or enterprise-level businesses to further sharpen my skills and contribute to impactful projects. While I am eager to contribute to dynamic, large-scale environments, I am also actively seeking opportunities in smaller businesses, where I bring valuable experience from working in versatile roles across the stack and in product development. 
                            </p>
                            <a href='./ben_taylor_cv.docx' download='./ben_taylor_cv.docx'>
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