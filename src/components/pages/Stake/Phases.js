import React, { useEffect, useState } from 'react';
import { useInfo, useMintedCountInfo } from '../../../hooks/useNFTData'
import { useStakeInfo } from '../../../hooks/useStakeData'
import { usePrice } from '../../../hooks/useLpData'
import { formatBigNumber, formatedPercent } from '../../../utils/utils'
import BigNumber from 'bignumber.js';
import './index.css'

function Phases(props) {
    const { update } = props;
    const [monkApr, setMonkApr] = useState(new BigNumber(0));
    const [ninjaApr, setNinjaApr] = useState(new BigNumber(0));
    const { totalSupply, mintedNinja } = useMintedCountInfo(update);
    const { totalMonkStaked, totalNinjaStaked, totalRewardClaimed } = useStakeInfo(update);
    const { phase, ninjaStolen, monkStolen } = useInfo(update);
    const price = usePrice(update);

    useEffect(() => {
        if (price && totalNinjaStaked && totalMonkStaked) {
            const total = price.multipliedBy(8500 * 365);
            setNinjaApr(total.multipliedBy(20).div(totalNinjaStaked))
            setMonkApr(total.multipliedBy(80).div(totalMonkStaked))
        }
    }, [price, setMonkApr, setNinjaApr, totalMonkStaked, totalNinjaStaked])

    return (
        <div className="flex flex-col frosted-glass-black p-6 rounded-xl w-10/12 lg:w-1/2 max-w-lg mx-auto lg:mx-4 mt-10 lg:mt-0">
            <div className='py-4'>
                <p className='text-xl font-semibold mb-4'>PHASES</p>
                <div className='flex justify-between mb-4 text-[8px] sm:text-xs md:text-sm '>
                    <p className='whitespace-nowrap text-left'>0 ~ 4,999 / 1 AVAX<br />5,000 ~ 6,677 / 1,000 HAKU</p>
                    <p className='whitespace-nowrap text-right md:text-left'>6,678 ~ 8,343 / 1,250 HAKU<br />8,344 ~ 9,999 / 1,500 HAKU</p>
                </div>
            </div>
            <div className="h-[0.5px] bg-gray-300"></div>
            <p className='text-xl font-semibold mt-8'>STATUS</p>
            <div className='flex justify-between text-xs md:text-base'>
                <div className='flex flex-col md:flex-row justify-between mt-6 w-1/2 mr-3'>
                    <p className='text-left'>Ninja Minted:</p>
                    <p className='text-[#EC0B26] font-extrabold text-left md:text-right'>{mintedNinja}</p>
                </div>
                <div className='flex flex-col md:flex-row justify-between mt-6 w-1/2 ml-3'>
                    <p className='text-right md:text-left'>Ninja Staked:</p>
                    <p className='text-[#EC0B26] font-extrabold text-right md:text-right'>{totalNinjaStaked}</p>
                </div>
            </div>
            <div className='flex justify-between text-xs md:text-base'>
                <div className='flex flex-col md:flex-row justify-between mt-6 w-1/2 mr-3'>
                    <p className='text-left'>Monk Minted:</p>
                    <p className='text-[#EC0B26] font-extrabold text-left md:text-right'>{totalSupply - mintedNinja}</p>
                </div>
                <div className='flex flex-col md:flex-row justify-between mt-6 w-1/2 ml-3'>
                    <p className='text-right md:text-left'>Monk Staked:</p>
                    <p className='text-[#EC0B26] font-extrabold text-right md:text-right'>{totalMonkStaked}</p>
                </div>
            </div>
            <div className='flex justify-between text-xs md:text-base'>
                <div className='flex flex-col md:flex-row justify-between mt-6 w-1/2 mr-3'>
                    <p className='text-left'>Ninja Stolen:</p>
                    <p className='text-[#EC0B26] font-extrabold text-left md:text-right'>{ninjaStolen}</p>
                </div>
                <div className='flex flex-col md:flex-row justify-between mt-6 w-1/2 ml-3'>
                    <p className='text-right md:text-left'>Monk Stolen:</p>
                    <p className='text-[#EC0B26] font-extrabold text-right md:text-right'>{monkStolen}</p>
                </div>
            </div>
            <div className='flex justify-between text-xs md:text-base'>
                <div className='flex flex-col md:flex-row justify-between mt-6 w-1/2 mr-3'>
                    <p className='text-left'>HAKU Claimed</p>
                    <p className='text-[#EC0B26] font-extrabold text-left md:text-right'>
                        {formatBigNumber(totalRewardClaimed).toFormat(0)}
                    </p>
                </div>
                <div className='flex flex-col md:flex-row justify-between mt-6 w-1/2 ml-3'>
                    <p className='text-right md:text-left'>Phase</p>
                    <p className='text-[#EC0B26] font-extrabold text-right md:text-right'>{phase}</p>
                </div>
            </div>
            <div className='flex justify-between text-xs md:text-base'>
                <div className='flex flex-col md:flex-row justify-between mt-6 w-1/2 mr-3'>
                    <p className='text-left'>MONK Staking APR</p>
                    <p className='text-[#EC0B26] font-extrabold text-left md:text-right'>
                        {formatedPercent(monkApr)}%
                    </p>
                </div>
                <div className='flex flex-col md:flex-row justify-between mt-6 w-1/2 ml-3'>
                    <p className='text-right md:text-left'>NINJA Staking APR</p>
                    <p className='text-[#EC0B26] font-extrabold text-right md:text-right'>
                        {formatedPercent(ninjaApr)}%
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Phases;