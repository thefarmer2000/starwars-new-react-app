import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';
import ReactCardFlip from 'react-card-flip';


function TeamMember(props) {
    let [isFlipped, setIsFlipped] = useState(false)

    return (<motion.div 
        onMouseEnter={() => {
            setIsFlipped(true)
        }}
        onMouseLeave={() => {
            setIsFlipped(false)
        }}
        variants={props.animationVarient} 
        className='m-3 md:m-6 md:mx-10 flex flex-col items-center'>
        <ReactCardFlip isFlipped={isFlipped}>
                <img className='w-20 md:w-32 lg:w-40 xl:w-56' src={props.member.dp} alt="" />
                <img className='w-20 md:w-32 lg:w-40 xl:w-56' src={props.member.dp} alt="" />
        </ReactCardFlip>
                <motion.p variants={props.animationVarient} className='text-[#EC0B26] text-sm xl:text-2xl mb-1 md:mb-3 mt-4'>{props.member.name}</motion.p>
                <motion.p variants={props.animationVarient} className='text-white text-sm xl:text-2xl mb-2'>{props.member.designation}</motion.p>
    </motion.div>);
}


function TeamSection(props) {
    let teamMembers = [
        // { dp: "/assets/img/team/ceo.png", name: "Hakusan", designation: "CEO" },
        // { dp: "/assets/img/team/cto.png", name: "Monk of Haku", designation: "CTO" },
        // { dp: "/assets/img/team/advisor.png", name: "Dave", designation: "Advisor" },
        // { dp: "/assets/img/team/developer.png", name: "Tom", designation: "Developer" },
        // { dp: "/assets/img/team/designer.png", name: "Gabriel", designation: "Designer" },
        { dp: "/assets/img/team/baseddev.png", name: "BasedDev", designation: "Developer / CEO" },
    ]
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
        <motion.section ref={ref} initial="hidden" animate={animation} variants={container} id="team" className='relative flex flex-col items-center bg-black p-8 md:p-16'>
            <div className='w-full md:w-6/12 flex flex-col items-center'>
                <motion.p variants={animationVarient} className='text-[#EC0B26] text-sm xl:text-2xl mb-3'>Meet</motion.p>
                <motion.p variants={animationVarient} className='text-xl lg:text-4xl xl:text-7xl text-white font-bold'>Our Team</motion.p>
                <motion.p variants={animationVarient} className='text-[#6C6C6C] text-sx lg:text-sm xl:text-xl max-w-2xl leading-6 xl:leading-8 mt-4 text-center' >
                We are a  team of highly experienced blockchain developers and marketers supporting the creation of the next generation play-to-earn NFT games to empower HakuSwap’s ecosystem.
                </motion.p>
            </div>
            <div className='flex flex-wrap justify-center mt-8 z-20'>
                {
                    teamMembers.map((member, id) => {
                        return <TeamMember key={id} animationVarient={animationVarient} member={member}></TeamMember>
                    })
                }
            </div>
            <div className='absolute w-[600px] h-[770px] top-1/2 left-20 transform -translate-x-1/2 -translate-y-60  blur-[80px] bg-[rgba(218,18,81,0.47)] rounded-full z-10 opacity-40' />
        </motion.section>
    );
}

export default TeamSection;