import React from 'react';
import Marquee from "react-fast-marquee";

function HorizontalSection(props) {
    return (
        <div className='bg-black' style={{ height: '52vh' }}>
            <Marquee gradientColor="000" gradientWidth={200} speed={35}>
                <div className="flex" style={{ height: '40vh', marginTop: '6vh' }}>
                    <img className='h-full mx-2' src="/assets/img/hori.png" alt="" />
                    <img className='h-full mx-2' src="/assets/img/hori.png" alt="" />
                    <img className='h-full mx-2' src="/assets/img/hori.png" alt="" />
                </div>
            </Marquee>
        </div>
    );
}

export default HorizontalSection;