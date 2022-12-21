import React, { useEffect } from 'react';
import specsImage from '../../../../assets/img/specs-image.png'
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useMediaQuery } from "react-responsive";
import '../../../../main.css'

function SpecsSection(props) {
    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
    const animation = useAnimation();
    const { ref, inView } = useInView({
        triggerOnce: true,
        rootMargin: '-100px 0px',
    });

    const container = {
        hidden: { opacity: 1 },
        show: {
            transition: {
                staggerChildren: 0.1,
                // delayChildren: 0.3
            }
        }
    };

    const animationVarient = {
        hidden: { opacity: 0, y: 50 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                ease: "easeInOut",
                duration: 0.5,
            }
        }
    }
    useEffect(() => {
        if (inView) {
            animation.start('show');
        }
        if (!inView) {
            animation.start('hidden');
        }
    }, [animation, inView]);

    return (
        <motion.section
            ref={ref}
            initial="hidden"
            animate={animation}
            variants={container}
            id="specs"
            style={{ background: "url(/assets/img/specs-bg.png)", backgroundSize: "cover" }}
            className="flex flex-col-reverse lg:flex-row items-center p-12 py-24 pt-0 lg:pt-44 pb-0 lg:pb-24"
        >
            <motion.img variants={animationVarient} className='w-11/12 sm:w-10/12 md:w-6/12 mr-6 mb-12 lg:mb-0 mt-10 lg:mt-0' src={specsImage} alt="" />
            {
                !isMobile &&
                <div className='md:w-1/12' />
            }
            <div className='lg:mr-9 w-full md:w-5/12'>
                <motion.p variants={animationVarient} className='text-[#EC0B26] text-sm xl:text-2xl mb-3 text-center lg:text-left'>About</motion.p>
                <motion.p variants={animationVarient} className='text-xl lg:text-4xl xl:text-7xl text-white font-bold text-center lg:text-left'>Specs</motion.p>
                <motion.p variants={animationVarient} className='text-white text-sx lg:text-sm xl:text-xl max-w-2xl leading-6 xl:leading-8 mt-4 text-center lg:text-left' >
                    A play-to-earn NFT Game built on Avalanche and consists of distinct NFTs designed exclusively for the game with unique tokenomics and interactions between the ERC-20 and ERC-721 protocols allowing their scarcity and monetization capabilities.
                    </motion.p>
            </div>
        </motion.section>
    );
}

export default SpecsSection;