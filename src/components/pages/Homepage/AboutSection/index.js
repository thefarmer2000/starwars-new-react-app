import { motion, useAnimation } from "framer-motion";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import monk from "../../../../assets/img/monk.png";
import { useMediaQuery } from "react-responsive";

function AboutSection(props) {
  const animation = useAnimation();
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "-100px 0px",
  });

  const container = {
    hidden: { opacity: 1 },
    show: {
      transition: {
        staggerChildren: 0.1,
        // delayChildren: 0.3
      },
    },
  };

  const animationVarient = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        ease: "easeInOut",
        duration: 0.5,
      },
    },
  };

  useEffect(() => {
    if (inView) {
      animation.start("show");
    }
    if (!inView) {
      animation.start("hidden");
    }
  }, [animation, inView]);
  return (
    <motion.section
      ref={ref}
      id='story'
      initial='hidden'
      animate={animation}
      variants={container}
      className='flex justify-center items-center pt-12 pb-12 md:pb-0 flex-1'
      style={{
        background: !isMobile
          ? "linear-gradient(270deg, #EC0B26 0%, rgba(236, 11, 38, 0) 64.49%), black"
          : "linear-gradient(0deg, #EC0B26 0%, rgba(236, 11, 38, 0) 64.49%), black",
      }}
    >
      <div className='text-center md:text-left w-10/12 lg:w-9/12 flex flex-col gap-20 md:flex-row justify-between items-center'>
        <div className='mx-auto md:mr-9'>
          <motion.p
            variants={animationVarient}
            className='text-[#EC0B26] text-sm xl:text-2xl mb-3'
          >
            About
          </motion.p>
          <motion.p
            variants={animationVarient}
            className='text-xl lg:text-4xl xl:text-7xl text-white font-bold'
          >
            The Story
          </motion.p>
          <motion.p
            variants={animationVarient}
            className='text-white text-sx lg:text-sm xl:text-xl max-w-2xl leading-6 xl:leading-8 mt-4 text-left'
          >
            A congregation of Monks strive to protect the spirit within Mount
            Haku in their efforts to be enlightened with the power of Haku while
            fighting back the Dark Valley Ninjas. Only the ones faithful to the
            spirit will remain unharmed to protect Haku from the Dark Valley
            Ninjas …
          </motion.p>
        </div>
        {
          !isMobile &&
          <div className="w-1/12" />
        }
        {<img className='w-3/12 max-w-md md:flex' src={monk} alt='' /> }
      </div>
    </motion.section>
  );
}

export default AboutSection;
