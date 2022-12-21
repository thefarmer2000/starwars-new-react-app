import React, { useEffect } from "react";
import roadmapLine from "../../../../assets/img/roadmap-line.svg";
import roadmapLineCircle from "../../../../assets/img/roadmap-line-circle.svg";
import swordTail from "../../../../assets/img/sword-tail.svg";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import '../../../../main.css'

function RoadMapSection(props) {
  let timeline = [
    {
      name: "Phase 1",
      desc: [
        `Project concept & NFTs design`,
        `Website Beta Release`,
        `Marketing`,
        `Social media + community growth`,
        `Giveaways`,
        `Press Release Articles`,
        `Partnerships`,
      ],
    },
    {
      name: "Phase 2",
      desc: [
        `NFTs design concepts, names & attributes`,
        `Website official release`,
        `Whitelisting + Public Sale Open`,
      ],
    },
    {
      name: "Phase 3",
      desc: [
        `Team Expansion`,
        `Marketplace Public Beta Launch`,
        `Marketplace Expansion`,
      ],
    },
    {
      name: "Phase 4",
      desc: [
        `NFT staking`,
        `Marketplace Official Launch`,
        `Governance`,
      ],
    },
  ];

  const animation = useAnimation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "-100px 0px",
  });

  const container = {
    hidden: { opacity: 1 },
    show: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
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
      style={{
        background:
          "linear-gradient(rgba(0,0,0,0.8), rgba(0, 0, 0, 0.8)), url(/assets/img/roadmap-bg.png)",
        backgroundSize: "cover",
      }}
      ref={ref}
      initial='hidden'
      animate={animation}
      variants={container}
      id='roadmap'
      className='min-h-screen flex flex-col justify-center p-6 py-10 xl:py-20'
    >
      <h1 className='text-xl lg:text-4xl xl:text-5xl text-white font-bold text-center mb-10'>
        Roadmap
      </h1>
      <div className='relative flex flex-col items-center my-32 mt-16'>
        {timeline.map((phase, id) => {
          if (id % 2 === 0) {
            return (
              <motion.div
                variants={animationVarient}
                className='w-full'
                key={id}
              >
                <div className='ml-auto w-1/2 flex flex-col items-start relative'>
                  <img
                    className='mt-2 absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 z-20'
                    src={roadmapLineCircle}
                    alt=''
                  />
                  <div className='flex items-start max-w-[100px] sm:max-w-[200px] lg:max-w-none'>
                    <img
                      className='mt-2 w-full lg:w-4/12'
                      src={roadmapLine}
                      alt=''
                    />
                    <div className='ml-2 w-full'>
                      <p className='text-white whitespace-nowrap text-right lg:text-left text-sm md:text-2xl'>
                        {phase.name}
                      </p>
                      {phase.desc.map((point) => (
                        <p key={point} className='whitespace-nowrap text-[8px] sm:text-xs  lg:text-sm xl:text-base text-[#6C6C6C] max-w-sm hidden left-0 lg:block'>
                          - {point}
                        </p>
                      ))}
                    </div>
                  </div>
                  {phase.desc.map((point) => (
                    <p key={point} className='whitespace-nowrap text-[8px] sm:text-xs  lg:text-sm xl:text-base text-[#6C6C6C] max-w-[130px] sm:max-w-[185px] ml-7 lg:hidden md:text-justify'>
                      - {point}
                    </p>
                  ))}
                </div>
              </motion.div>
            );
          } else {
            return (
              <motion.div
                variants={animationVarient}
                className='w-full'
                key={id}
              >
                <div className='relative mr-auto w-1/2 flex flex-col text-right items-start'>
                  <div className='flex items-start max-w-[100px] sm:max-w-[200px] lg:max-w-lg ml-auto transform -translate-x-14 sm:-translate-x-4'>
                    <div>
                      <p className='text-white whitespace-nowrap text-right lg:text-right text-sm md:text-2xl mr-2'>
                        {phase.name}
                      </p>
                      {phase.desc.map((point) => (
                        <p key={point} className='whitespace-nowrap text-[8px] sm:text-xs  lg:text-sm xl:text-base text-[#6C6C6C] max-w-md hidden left-0 lg:block'>
                          {point} -
                        </p>
                      ))}
                    </div>
                    <img
                      className='mt-2 w-full lg:w-4/12'
                      src={roadmapLine}
                      alt=''
                    />
                  </div>
                  {phase.desc.map((point) => (
                    <p key={point} className='whitespace-nowrap text-[8px] sm:text-xs lg:text-sm xl:text-base text-[#6C6C6C]  max-w-[129px] sm:max-w-[189px] ml-auto mr-7 lg:hidden md:text-justify'>
                      {point} -
                    </p>
                  ))}
                  <img
                    className='mt-2 absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 z-20'
                    src={roadmapLineCircle}
                    alt=''
                  />
                </div>
              </motion.div>
            );
          }
        })}
        <div
          style={{
            background: "url('/assets/img/sword-head.svg')",
            backgroundSize: "cover",
          }}
          className='absolute h-[110%] w-[18px] md:w-[25px] top-0 left-1/2 transform -translate-x-1/2 -translate-y-9 z-10'
        >
          <div className='w-[14px] md:w-[20px] absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full'>
            <img
              className='w-full transform -translate-y-5'
              src={swordTail}
              alt=''
            />
            <div className='w-[9px] h-[7.2px] md:w-[13px] md:h-[8px] absolute -top-[13px] md:-top-2 -right-[9px] md:-right-[11px]  bg-[#EC0B26]' />
            <div className='w-[9px] h-[7.2px] md:w-[13px] md:h-[8px] absolute -top-[13px] md:-top-2 -left-[9px] md:-left-[11px]  bg-[#EC0B26]' />
          </div>
        </div>
        <div className='absolute w-96 h-96 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  blur-[50px] bg-[rgba(218,18,81,0.47)] rounded-full' />
      </div>
    </motion.section>
  );
}

export default RoadMapSection;
