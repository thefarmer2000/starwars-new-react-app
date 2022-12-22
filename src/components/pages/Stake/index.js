import React, { useState } from 'react';
import Header from '../../common/Header';
import HomeFooter from '../../common/HomeFooter';
import Mint from './Mint';
import Phases from './Phases';
import Staked from './Staked';
import UnStaked from './Unstaked';
import WalletConnetor from '../../common/WalletConnetor';
import './index.css'

function StakePage(props) {
    const [modalView, setModalView] = useState(false)
    const [update, setUpdate] = useState(false)

    return (
        <div className=''>
            <Header />
            <div /* style={{ background: "url(/assets/img/stake-bg.png)", backgroundSize: 'cover' }} */ className='relative py-24 lg:py-32 flex flex-col items-center bg-black text-white text-center'>
                <div className='absolute top-[5%] lg:top-[20%]'>
                    <h1 className='text-2xl lg:text-4xl xl:text-5xl text-white font-bold text-center'>The Battle of Haku</h1>
                    <p className='text-xs lg:text-base lg:w-full max-w-md lg:max-w-3xl mt-5 lg:mt-8 mx-12'>Choose a side, challenge your opponents and earn rewards in an action-packed battle on Mountain Haku with a state-of-the-art Play-to-Earn NFT Game built on Avalanche.</p>
                    <a href="/whitepaper.pdf" target="_blank">
                        <button className="bg-[#EC0B26] p-3 px-24 font-bold rounded-xl w-max text-white mt-10" >Whitepaper</button>
                    </a>
                </div>
                <div className='w-full min-h-[400px]'>
                    <img className="w-full" src="/assets/img/stake-bg.png" alt="" />
                </div>
                <div className='w-full lg:absolute top-[38%] sm:-mt-20  md:-mt-48 lg:mt-0'>
                    <div className='flex w-full justify-center flex-col lg:flex-row'>
                        <Mint modalView={modalView} setModalView={setModalView}
                            update={update} setUpdate={setUpdate}
                        />
                        <Phases
                            update={update} setUpdate={setUpdate}
                        />
                    </div>
                    <div className='flex flex-col lg:flex-row w-full justify-center mt-10'>
                        <UnStaked
                            update={update} setUpdate={setUpdate}
                        />
                        <Staked
                            update={update} setUpdate={setUpdate}
                        />
                    </div>
                    <div className='w-full'>
                        <HomeFooter />
                    </div>
                </div>
            </div>
            <WalletConnetor
                modalView={modalView}
                setModalView={setModalView}
            />
        </div>
    );
}

export default StakePage;