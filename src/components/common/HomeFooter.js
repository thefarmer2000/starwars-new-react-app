import React from 'react';
import logoColor from '../../assets/img/logo-color.svg';

function HomeFooter(props) {
    return (
        <footer className='bg-black flex flex-col items-center pt-20'>
            <img className='w-72 mb-10 transform translate-x-5' src={logoColor} alt="" />
            <div className='flex justify-center items-center mb-10'>
                <a href='https://twitter.com/hakuswap' target="_blank">
                    <img className='mx-6' src="/assets/img/socials/twitter.svg" alt="" />
                </a>
                <a href='https://hakuswap.medium.com/' target="_blank">
                    <img className='mx-6' src="/assets/img/socials/medium.svg" alt="" />
                </a>
                <a href='https://discord.com/invite/hakuswap' target="_blank">
                    <img className='mx-6' src="/assets/img/socials/discord.svg" alt="" />
                </a>
            </div>
            {/* <div className='text-white mb-10 flex flex-col md:flex-row text-center'>
                <a href='/#' className='mx-5 lg:mx-10 my-2'>Privacy Policy</a>
                <a href='/#' className='mx-5 lg:mx-10 my-2'>Terms & Conditions</a>
                <a href='/#' className='mx-5 lg:mx-10 my-2'>Contact US</a>
            </div> */}
            <div className='border-t border-[#6C6C6C] w-full p-14 flex justify-center'>
                <p className='text-[#6C6C6C]'>Copyright © Battle of Haku 2022</p>
            </div>
        </footer>
    );
}

export default HomeFooter;