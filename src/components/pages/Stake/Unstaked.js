import React, { useState } from 'react';
import { useNFTAccountInfo, useNinjaData } from '../../../hooks/useNFTData'
import { useStake } from '../../../hooks/useStakeData'
import Data from '../../../config/data.json'
// import CheckBg from '../../../assets/img/check.png'
import '../../../main.css'

function UnStaked(props) {
    const { update, setUpdate } = props;
    const [selectedMonkIds, setSelectedMonkIds] = useState([]);
    const [selectedNinjaIds, setSelectedNinjaIds] = useState([]);

    const { nftIDs } = useNFTAccountInfo(update);
    const { ninjaData, ninjaCount } = useNinjaData(nftIDs);
    const { onStake, stakePending } = useStake(selectedMonkIds.concat(selectedNinjaIds));

    const selectAll = () => {
        let temp1 = [], temp2 = [];
        if (nftIDs && ninjaData && nftIDs.length > 0 && ninjaData.length > 0) {
            for (let i = 0; i < nftIDs.length; i++) {
                if (ninjaData[i]) {
                    temp1.push(nftIDs[i]);
                } else {
                    temp2.push(nftIDs[i])
                }
            }

            setSelectedNinjaIds(temp1);
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

    const stake = async () => {
        await onStake();
        setUpdate(!update)
        setSelectedMonkIds([]);
        setSelectedNinjaIds([]);
    }

    return (
        <div className="flex flex-col frosted-glass-black p-6 rounded-xl w-10/12 lg:w-1/2 max-w-lg mx-auto lg:mx-4">
            <div className='p-4'>
                <p className='text-xl font-semibold mb-4'>UNSTAKED</p>
            </div>
            <div className=''>
                <div className='flex justify-between'>
                    <p>NINJA ({ninjaCount})</p>
                    <p>
                        {selectedNinjaIds.length > 0 ? selectedNinjaIds.length : '-'}
                    </p>
                </div>
                <div className="items-container">
                    {
                        nftIDs.map((id, index) => {
                            if (ninjaData[index]) {
                                return (
                                    <div key={index} className="item-container"
                                        onClick={() => {
                                            setSelectedNinja(id);
                                        }}
                                    >
                                        <img src={Data[id]} alt="" className="avatar" />
                                        <div className="item-desc">HakuMonk #{id}</div>
                                        {
                                            // checkSelectedNinja(id) ?
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
            <div className="h-[0.5px] bg-gray-300"></div>
            <div className='mt-4'>
                <div className='flex justify-between'>
                    <p>MONK ({nftIDs.length - ninjaCount})</p>
                    <p>
                        {selectedMonkIds.length > 0 ? selectedMonkIds.length : '-'}
                    </p>
                </div>
                <div className="items-container">
                    {
                        nftIDs.map((id, index) => {
                            if (!ninjaData[index]) {
                                return (
                                    <div key={index} className="item-container"
                                        onClick={() => {
                                            setSelectedMonk(id);
                                        }}
                                    >
                                        <img src={Data[id]} alt="" className="avatar" />
                                        <div className="item-desc">HakuMonk #{id}</div>
                                        {
                                            // checkSelectedMonk(id) ?
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

            <button className="bg-[#EC0B26] p-3 px-24 font-bold rounded-xl w-max text-white mt-5 self-center"
                disabled={stakePending}
                onClick={() => {
                    stake();
                }}
            >
                STAKE
            </button>
        </div>
    );
}

export default UnStaked;