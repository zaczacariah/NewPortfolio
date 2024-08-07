import './Work.scss';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from "react";
import { GoChevronDown } from 'react-icons/go';
import { FaGithub, FaExternalLinkSquareAlt } from 'react-icons/fa';
import { urlFor, client } from '../../client.js';
import './Work.scss';

const Work = () => {
    const scrollRef = useRef(null);
    const [work, setWork] = useState([]); 
    const [pairedWork, setPairedWork] = useState([]);
    const [filteredWork, setFilteredWork ] = useState([]);
    const [ firstItem, setFirstItem ] = useState(true);
    const data = 
    [
        {
            "id": "1",
            "name": "Full List",
            "value": "FL"
        },
        {
            "id": "2",
            "name": "Full Stack",
            "value": "FS"
        },
        {
            "id": "3",
            "name": "Front-End",
            "value": "FE"
        },
        {
            "id": "4",
            "name": "Back-End",    
            "value": "BE",
        },
        {
            "id": "5",
            "name": "Wordpress",    
            "value": "WP",
        },
        
        
      ]

      const handleSelect = (value) => {
        if(value == "FL"){
            setFirstItem(true)
            return setFilteredWork(work)
        }
        setFirstItem(false)
        setFilteredWork(()=> work.filter((piece) => piece.tags.includes(value)));
        let pairedWork = groupIntoPairs(filteredWork);
        setPairedWork(pairedWork);

      };

    
    
    
    function groupIntoPairs(array) {
        return array.reduce((result, value, index, array) => {
            if (index % 2 === 0)
                result.push(array.slice(index, index + 2));
            return result;
        }, []);
    }
    
      useEffect( () => {
            const query = `*[_type == "works"]`;
            client.fetch(query).then((work) => {

            setWork(work);
            setFilteredWork(work)
        });
        
      }, []);

      useEffect( ()=> {
        setPairedWork(() => groupIntoPairs(filteredWork));
      }, [filteredWork])



  return (
    <div className='app-work'>
        <div className='work-content'>
            <div className="work-head">
                <div className="title-container">
                    <h1>Work</h1>
                </div>

                <div className="work-filter">
                    <p>My </p> 
                    <Dropdown
                        id='person'
                        title='Full List'
                        data={data}
                        hasImage
                        style='bg-purple-800'
                        selectedId='1'
                        onSelect={handleSelect}
                        /> 
                    <p>{firstItem ? ' of ' : '' }Projects, for your pleasure.</p>
                </div>
            </div>

             {
    //     "imgUrl": {
    //         "asset": {
    //             "_ref": "image-b7b36e4c931f80956a8c24ac91aa283b22540ca9-1310x783-png",
    //             "_type": "reference"
    //         },
    //         "_type": "image"
    //     },
    //     "_createdAt": "2024-01-28T10:33:51Z",
    //     "_rev": "Xtl0w0ATcwtfTomIhqVC6y",
    //     "_id": "96a76e7e-bcaa-459c-b1ab-4b7f46a09778",
    //     "title": "Network EQ",
    //     "_updatedAt": "2024-05-09T08:37:21Z",
    //     "codeLink": "https://github.com/zaczacariah/NetworkEQ",
    //     "_type": "works",
    //     "description": "NetworkEQ is a basic headless social network platform built using Mongodb, mongoose and node.js",
    //     "tags": [
    //         "MongoDB",
    //         "Mongoose",
    //         "Node"
    //     ]
    // }
            }
            <div className="work-pieces" ref={scrollRef}>
                {
                    pairedWork?.map((workPair, index) => {
                        return(
                            <div key={index} className="pieces-pair">
                                { 
                                    workPair?.map((workPiece, index) => {
                                        return (
                                            <motion.div 
                                                key={index} 
                                                className="work-piece"
                                                initial={{ opacity: 0, y: 200 }}
                                                whileInView={{ opacity: 1, y:0, transition: { duration: 1} }}
                                                viewport={{ root: scrollRef }}
                                                >
                                                <div className="piece-image">
                                                    <img src={urlFor(workPiece.imgUrl)} alt="workPiece.name" />
                                                </div>
                                                <div className="piece-info">
                                                    <h2>{workPiece.title}</h2>
                                                    <p>{workPiece.description}</p>
                                                    <div className='info-links'>
                                                        { workPiece.codeLink &&
                                                            <a href={workPiece.codeLink} target='_blank'>
                                                                <FaGithub size={25} color="#AB4D3E" />
                                                            </a>
                                                        }
                                                        { workPiece.projectLink &&
                                                            <a href={workPiece.projectLink} target='_blank' >
                                                                <FaExternalLinkSquareAlt size={25} color="#AB4D3E" />
                                                            </a>
                                                        }
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )
                                    })
                                }
                            </div>
                            ) 
                                                            
                    } )
                }
            </div>
        </div>
    </div>
  )
}

export default Work;

const Dropdown = ({
    id,
    title = "Select", //Default value
    data,
    position = "bottom-left", //Default value
    hasImage,
    style,
    selectedId,
    onSelect,
  }) => {

    const [isOpen, setIsOpen] = useState(false);

    const [selectedItem, setSelectedItem] = useState(
        selectedId ? data?.find((item) => item.value === selectedId) : undefined
    );

    const handleChange = (item) => {
        setSelectedItem(item);
        onSelect && onSelect(item.value);
        setIsOpen(false);
      };

    useEffect(() => {
    if (selectedId && data) {
        const newSelectedItem = data.find((item) => item.value === selectedId);
        newSelectedItem && setSelectedItem(newSelectedItem);
    } else {
        setSelectedItem(undefined);
    }
    }, [selectedId, data]);

    const dropdownRef = useRef(null);
    useOutsideClick({
        ref: dropdownRef,
        handler: () => setIsOpen(false),
    });

    return (
        <div 
            className='dropdown-cont'
            ref={dropdownRef}
            >
            <motion.button
            
            id={id}
            aria-label='Toggle dropdown'
            aria-haspopup='true'
            aria-expanded={isOpen}
            type='button'
            onClick={() => setIsOpen(!isOpen)}
            className='dropdown-button'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, transition: { duration: 1.5, delay: 0.5 } }}
            viewport={{ root: dropdownRef }}
            >
            <span>[{
            selectedItem?.name || title
            
            }
            <motion.span
                initial={{ opacity: 0, y:-40 }}
                whileInView={{ opacity: 1, y:0, transition: { duration: 1, delay: 1 } }}
                style={{ color: '#568A9A' }}
                >
            <GoChevronDown
                size={15}
                className={'chevron ' + (isOpen ? 'rotate' : '')}
            />
            </motion.span>]</span>
            
            </motion.button>
            {/* Open */}
            
            {isOpen && (
                <motion.div 
                    aria-label='Dropdown menu' 
                    className={`dropdown ${position}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { duration: 0.3 }}}
                    >
                    <ul
                    role='menu'
                    aria-labelledby={id}
                    aria-orientation='vertical'
                    style={{ lineHeight: '2.5rem', margin: 0, padding: 0 }}
                    >
                    {
                    data?.map((item) => (
                        <motion.li
                        key={item.id}
                        onClick={() => handleChange(item)}
                        className={`dropdown-item ${selectedItem?.id === item.id ? 'selected' : ''}`}
                        initial={{ opacity: 0}}
                        animate={{ opacity: 1,  transition: { duration: 0.5  } }}
                        
                        >
                        <span>{item.name}</span>
                        </motion.li>
                    ))}
                    </ul>
                </motion.div>
           
            )}
        </div>
        );
};


const useOutsideClick = ({ ref, handler }) => {
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          handler();
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
  
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref, handler]);
  };
  
