import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import HamburgerMenu from "react-hamburger-menu";
import { NavLink, Link } from "react-router-dom";
import logo from "../../assets/img/logo.svg";
import HamMenu from "./HamMenu";
import '../../main.css'

const links = [
  {
    linkName: "Story",
    link: "/#story",
    isScroll: true
  },
  {
    linkName: "Roadmap",
    link: "/#roadmap",
    isScroll: true
  },
  {
    linkName: "Specs and traits",
    link: "/#specs",
    isScroll: true
  },
  {
    linkName: "Team",
    link: "/#team",
    isScroll: true
  },
  {
    linkName: "FAQ",
    link: "/#faq",
    isScroll: true
  },
]

function Header() {
  let [isHamOpen,setIsHamOpen] = useState(false)
  return (
    <header className="absolute top-0 left-0 bg-black w-full p-5 flex justify-center z-50">
      <nav className="w-11/12 lg:w-9/12 flex text-white justify-between items-center">
        <Link to="/">
          <img className="w-20 xl:w-40" src={logo} alt="" />
        </Link>
        <div className="items-center hidden md:flex text-center">
          {
            links.map( (link,id) => {
              if(link.isLinkExternal){
                return <NavLink key={id} to={link.link} className="mx-2 lg:mx-4">
                    <p className="text-xs xl:text-lg">{link.linkName}</p>
                </NavLink>

              }else if(link.isScroll){
                
                return <a key={id} className="mx-2 lg:mx-4 text-sm xl:text-lg" href={link.link}>{link.linkName}</a>
              }else{
                return <a key={id} className="mx-2 lg:mx-4 text-sm xl:text-lg" href={link.link}>{link.linkName}</a>
              }
            })
          }
           <Link to="/stake">
              <button className="ml-3 bg-[#EC0B26] p-2 lg:p-3 px-4 lg:px-7 font-bold rounded-full text-xs xl:text-lg">MINT/HAKU GAME</button>
          </Link>
        </div>
        <div className="block md:hidden cursor-pointer">
          <HamburgerMenu
            isOpen={isHamOpen}
            menuClicked={()=>{ setIsHamOpen(!isHamOpen) }}
            width={18}
            height={15}
            strokeWidth={2.5}
            rotate={0}
            color='white'
            borderRadius={0}
            animationDuration={0.5}
          />
        </div>
      </nav>
      <AnimatePresence>
        {
          isHamOpen &&
          <HamMenu
            links={links} 
            isHamOpen={isHamOpen}
            setIsHamOpen={setIsHamOpen}
          />
        }
      </AnimatePresence>
    </header>
  );
}
  
  export default Header;
  