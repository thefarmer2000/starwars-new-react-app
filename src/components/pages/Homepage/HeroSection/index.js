import React from "react";
import heroCard from "../../../../assets/img/hero_card.png";
import { motion } from "framer-motion";

function HeroSection(props) {
  return (
    <div
      style={{
        background: `url("/assets/img/bg.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
      className='flex-grow flex-1 flex flex-col justify-between items-center min-h-80 md:min-h-screen -mb-32 md:mb-0 md:pb-20 pt-32 lg:pt-36 xl:pt-56 overflow-hidden'
    >
      <div className='w-full lg:w-9/12 flex flex-col items-center h-full justify-between'>
        <div className='flex flex-col lg:flex-row items-center justify-between w-full '>
          <div className='text-white mx-12 lg:mx-0 lg:mr-16'>
            <motion.h1
              initial={{ opacity: 0, y: 200 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0, ease: "easeOut", duration: 0.5 }}
              className='text-xl lg:text-2xl xl:text-6xl font-bold text-center lg:text-left'
            >
              Welcome to <br /> The Battle of Haku
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 200 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, ease: "easeOut", duration: 0.5 }}
              className='text-[12px] sm:text-sx lg:text-sm xl:text-xl max-w-xl md:leading-6 xl:leading-8 mt-4 text-justify md:text-center lg:text-left'
            >
              Choose a side, challenge your opponents and earn rewards in an
              action-packed battle on Mountain Haku with a s
              <i>tate-of-the-art Play-to-Earn NFT Game built on Avalanche</i>.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 200 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, ease: "easeOut", duration: 0.5 }}
              className='mt-[120px] sm:mt-[0px] text-[12px] sm:text-sx lg:text-sm xl:text-xl max-w-xl md:leading-6 xl:leading-8 mt-4 text-justify md:text-center lg:text-left flex flex-col items-center justify-between'
            >
              <a href="/stake">
                <button className='bg-[#EC0B26] p-3 px-24 font-bold rounded-xl w-max text-white mt-10'>
                  Mint Now
                </button>
              </a>
            </motion.p>
          </div>
          <motion.img
            initial={{ opacity: 0, x: 600 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, ease: "easeOut", duration: 0.5 }}
            className='hidden lg:block w-80 lg:w-96 xl:w-full  lg:max-w-sx xl:max-w-xl'
            src={heroCard}
            alt=''
          />
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
