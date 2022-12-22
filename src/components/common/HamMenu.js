import { motion } from 'framer-motion';
import React from 'react';
import HamburgerMenu from 'react-hamburger-menu';
import { Link, NavLink } from 'react-router-dom';

function HamMenu({ isHamOpen, setIsHamOpen, links }) {
    return (
        <motion.div 
            initial={{ x: 800 }}
            animate={{ x: 0 }}
            exit={{ x: 800 }}
            transition={{ ease: "easeInOut" }}
            className='flex flex-col fixed top-0 left-0 w-screen h-screen bg-black z-50 p-5'
            onClick={()=>{ setIsHamOpen(!isHamOpen) }}    
        >
            <div className='self-end  cursor-pointer'>
                <HamburgerMenu
                    isOpen={isHamOpen}
                    menuClicked={()=>{ setIsHamOpen(!isHamOpen) }}
                    width={25}
                    height={20}
                    strokeWidth={2.5}
                    rotate={0}
                    color='white'
                    borderRadius={0}
                    animationDuration={0.5}
                />
            </div>
            <div className="flex flex-col flex-grow items-center text-white uxppercase mt-12">
                {
                    links.map( (link,id) => {
                    if(link.isLinkExternal){
                        return <NavLink key={id} to={link.link} className="mx-4">
                            <p className="my-3 text-3xl">{link.linkName}</p>
                        </NavLink>
                    }else if(link.isScroll){
                        return <a key={id} className="my-3 text-3xl" href={link.link}>{link.linkName}</a>
                    }else{
                        return <a key={id} className="my-3 text-3xl" href={link.link}>{link.linkName}</a>
                    }
                    })
                }
            </div>
            <Link to="/stake" >
                <button className="bg-[#EC0B26] p-3 px-7 font-bold rounded-full text-xs mx-10 text-white mb-20 w-10/12 ">MINT/HAKU GAME</button>
            </Link>
        </motion.div>
    );
} 

export default HamMenu;