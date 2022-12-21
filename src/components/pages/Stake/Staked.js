import React, { useState } from 'react';
import { useStakeAccountInfo, useUnstake, useMonkPending } from '../../../hooks/useStakeData'
import Data from '../../../config/data.json'
// import CheckBg from '../../../assets/img/check.png'
import BigNumber from 'bignumber.js';
import { formatBigNumber } from '../../../utils/utils'
import '../../../main.css'

function Staked(props) {
    const { update, setUpdate } = props;
    const [selectedMonkIds, setSelectedMonkIds] = useState([]);
    const [selectedNinjaIds, setSelectedNinjaIds] = useState([]);

    const { stakedMonks, stakedNinjas, accHakuPerNinja } = useStakeAccountInfo(update);
    const { monkPending } = useMonkPending(stakedMonks);
    const { onUnstake, unstakePending } = useUnstake(selectedMonkIds.concat(selectedNinjaIds));

    const selectAll = () => {
        let temp1 = [], temp2 = [];
        if (stakedNinjas && stakedNinjas.length > 0) {
            for (let i = 0; i < stakedNinjas.length; i++) {
                temp1.push(stakedNinjas[i].tokenId);
            }
            setSelectedNinjaIds(temp1);
        }
        if (stakedMonks && stakedMonks.length > 0) {
            for (let i = 0; i < stakedMonks.length; i++) {
                temp2.push(stakedMonks[i].tokenId);
            }
            setSelectedMonkIds(temp2);
        }
    }

    const checkSelectedMonk = (currentId) => {
        const temp = selectedMonkIds.filter((id) => id === currentId);
        if (temp && temp.length > 0) {
            return true;
        }
        return false;
    }

    const setSelectedMonk = (currentId) => {
        let temp = [];
        let exist = false;
        for (let i = 0; i < selectedMonkIds.length; i++) {
            if (selectedMonkIds[i] === currentId) {
                exist = true;
            } else {
                temp.push(selectedMonkIds[i]);
            }
        }
        if (!exist) {
            temp.push(currentId);
        }
        setSelectedMonkIds(temp)
    }


    const checkSelectedNinja = (currentId) => {
        const temp = selectedNinjaIds.filter((id) => id === currentId);
        if (temp && temp.length > 0) {
            return true;
        }
        return false;
    }

    const setSelectedNinja = (currentId) => {
        let temp = [];
        let exist = false;
        for (let i = 0; i < selectedNinjaIds.length; i++) {
            if (selectedNinjaIds[i] === currentId) {
                exist = true;
            } else {
                temp.push(selectedNinjaIds[i]);
            }
        }
        if (!exist) {
            temp.push(currentId);
        }
        setSelectedNinjaIds(temp)
    }

    const unstake = async (needUnstake) => {
        await onUnstake(needUnstake);
        setUpdate(!update);
        setSelectedMonkIds([]);
        setSelectedNinjaIds([]);
    }

    return (
        <div className="flex flex-col frosted-glass-black p-6 rounded-xl w-10/12 lg:w-1/2 max-w-lg mx-auto lg:mx-4  mt-10 lg:mt-0">
            <div className='p-4'>
                <p className='text-xl font-semibold mb-4'>STAKED</p>
            </div>
            <div className=''>
                <div className='flex justify-between'>
                    <p>NINJA ({stakedNinjas.length})</p>
                    <p>
                        {selectedNinjaIds.length > 0 ? selectedNinjaIds.length : '-'}
                    </p>
                </div>
                <div className="items-container">
                    {
                        stakedNinjas.map((ninja, index) => {
                            return (
                                <div key={index} className="item-container"
                                    onClick={() => {
                                        setSelectedNinja(ninja.tokenId);
                                    }}
                                >
                                    <img src={Data[ninja.tokenId]} alt="" className="avatar" />
                                    <div className="item-desc">HakuMonk #{ninja.tokenId}</div>
                                    <div className="item-price">{formatBigNumber(formatBigNumber(accHakuPerNinja).minus(new BigNumber(ninja.value))).toFormat(3)} HAKU</div>
                                    {
                                        // checkSelectedNinja(ninja.tokenId) ?
                                        //     <img src={CheckBg} alt="" className="check" />
                                        //     :
                                            <div className="check"></div>
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="h-[0.5px] bg-gray-300"></div>
            <div className='mt-4'>
                <div className='flex justify-between'>
                    <p>MONK ({stakedMonks.length})</p>
                    <p>
                        {selectedMonkIds.length > 0 ? selectedMonkIds.length : '-'}
                    </p>
                </div>
                <div className="items-container">
                    {
                        stakedMonks.map((monk, index) => {
                            if (monkPending && monkPending.length > index) {
                                return (
                                    <div key={index} className="item-container"
                                        onClick={() => {
                                            setSelectedMonk(monk.tokenId);
                                        }}
                                    >
                                        <img src={Data[monk.tokenId]} alt="" className="avatar" />
                                        <div className="item-desc">HakuMonk #{monk.tokenId}</div>
                                        <div className="item-price">{formatBigNumber(new BigNumber(monkPending[index])).toFormat(3)} HAKU</div>
                                        {
                                            // checkSelectedMonk(monk.tokenId) ?
                                            //     <img src={CheckBg} alt="" className="check" />
                                            //     :
                                                <div className="check"></div>
                                        }
                                    </div>
                                )
                            }
                        })
                    }
                </div>
            </div>

            <div className='flex justify-end text-[12px] cursor-pointer mt-2'
                onClick={() => {
                    selectAll();
                }}
            >
                <input type={"checkbox"} readOnly checked={true} className='mt-0.5' />
                <div className='ml-1'>Select all</div>
            </div>

            <div className='flex flex-col lg:flex-row w-full justify-between'>
                <button className="bg-[#EC0B26] p-3 px-24 lg:px-12 font-bold rounded-xl w-max text-white mt-5 self-center"
                    disabled={unstakePending}
                    onClick={() => {
                        unstake(false);
                    }}
                >
                    CLAIM
                </button>
                <button className="bg-[#EC0B26] p-3 px-12 font-bold rounded-xl w-max text-white mt-5 self-center"
                    disabled={unstakePending}
                    onClick={() => {
                        unstake(true);
                    }}
                >
                    CLAIM & UNSTAKE
                </button>
            </div>
            {/* <p className='text-xs text-center mx-10 mt-3'>You can only unstake a harvester if he has at least 5 days worth of $HAKU</p> */}
        </div>
    );
}

export default Staked;