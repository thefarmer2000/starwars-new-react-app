import React, { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core'
import { NotificationManager } from 'react-notifications'
import Bignumber from 'bignumber.js'
import { useETHBalance, useBalance, useAllowance, useApprove } from '../../../hooks/useTokenData'
import { useInfo, useNFTAccountInfo, useMintedCountInfo, useMint } from '../../../hooks/useNFTData'
import { formatBigNumber } from '../../../utils/utils'
import config from '../../../config';

function Mint(props) {
    const { setModalView } = props;
    const { update, setUpdate } = props;
    const [stopedPass, setStopedPass] = useState(false);
    const [amount, setAmount] = useState(1);
    const [totalPrice, setTotalPrice] = useState(new Bignumber(0));

    const { account, deactivate } = useWeb3React()
    const ethBalance = useETHBalance(update);
    const tokenBalance = useBalance(update);
    const tokenAllowance = useAllowance(process.env.REACT_APP_NFT_ADDRESS, update);
    const { onApprove, approvePending } = useApprove(process.env.REACT_APP_NFT_ADDRESS);
    const { privateSaleIsEnabled, saleIsEnabled, phase, tokenPrice, phaseTokenPrice } = useInfo(update);
    const { whitelist } = useNFTAccountInfo(update);
    const { totalSupply } = useMintedCountInfo(update);
    const { onMint, mintPending } = useMint(totalPrice, amount);

    useEffect(() => {
        if (parseInt(totalSupply) >= config.phase[phase]) {
            setStopedPass(true);
        } else {
            setStopedPass(false);
        }
    }, [phase, totalSupply])

    useEffect(() => {
        if (phase === 0) {
            setTotalPrice(tokenPrice.multipliedBy(amount));
        } else {
            setTotalPrice(phaseTokenPrice.multipliedBy(amount));
        }
    }, [amount, phase, phaseTokenPrice, tokenPrice])

    const approve = async () => {
        await onApprove();
        setUpdate(!update)
    }

    const mint = async (stake) => {
        if (!account) {
            setModalView(true);
            return
        }
        if (amount < 1 || amount > 10) {
            return;
        }
        if (!saleIsEnabled && !whitelist) {
            NotificationManager.warning('Mint Error', 'You are not whitelisted');
            return
        }
        if (phase === 0) {
            if (tokenPrice.gt(ethBalance)) {
                NotificationManager.warning('Mint Error', 'Not enough balance');
                return;
            }
        } else {
            if (totalPrice.gt(tokenBalance)) {
                NotificationManager.warning("Mint Error", "Not enough balance");
                return;
            }
        }

        await onMint(stake, phase);
        setUpdate(!update)
    }

    const timestamp = 1653066000;
    const [days, setDays] = useState(0)
    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0)
    const [intervalId, setIntervalId] = useState(0)
    const [showTimer, setShowTimer] = useState(false)

    useEffect(() => {
        if (intervalId) {
            clearInterval(intervalId)
        }

        const id = setInterval(() => {
            const timee = timestamp * 1000 - Date.now()
            const delta = Math.abs(timee)
            if (timee <= 0) {
                setShowTimer(false)
                clearInterval(intervalId)
                return
            }

            const _days = Math.floor(delta / (1000 * 60 * 60 * 24))
            const _hours = Math.floor((delta / (1000 * 60 * 60)) % 24)
            const _minutes = Math.floor((delta / 1000 / 60) % 60)
            const _seconds = Math.floor((delta / 1000) % 60)

            setDays(_days)
            setHours(_hours > 9 ? _hours : `0${_hours}`)
            setMinutes(_minutes > 9 ? _minutes : `0${_minutes}`)
            setSeconds(_seconds > 9 ? _seconds : `0${_seconds}`)
            setShowTimer(true)
        }, 1000)
        setIntervalId(id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="flex flex-col frosted-glass-black p-6 rounded-xl w-10/12 lg:w-1/2 max-w-lg mx-auto lg:mx-4">
            <div className='p-4'>
                <p className='text-xl font-semibold mb-4'>MINT YOUR MONK</p>
                <div className='flex justify-center mb-1 text-[12px] sm:text-xs md:text-sm '>
                    <p className='whitespace-nowrap'>
                        {
                            showTimer ?
                                `${days} D : ${hours} H : ${minutes} M : ${seconds} S`
                                :
                                stopedPass ?
                                    `PHASE ${phase} COMPLETED`
                                    :
                                    !saleIsEnabled ?
                                        'Mint is live at 1000 WL'
                                        :
                                        'Public sale is live now'
                        }
                    </p>
                </div>
                {
                    account ?
                        <button className='text-xl text-[#EC0B26] font-semibold underline cursor-pointer'
                            onClick={() => window.open(`https://snowtrace.io/address/${account}`, "_blank")}
                        >
                            {account.slice(0, 6) + '...' + account.slice(36)}
                        </button>
                        :
                        <button className='text-xl text-[#EC0B26] font-semibold underline cursor-pointer'
                            onClick={() => setModalView(true)}
                        >
                            Connect Wallet
                        </button>
                }
            </div>
            <div className="h-[0.5px] bg-gray-300"></div>
            <div className='flex justify-between mt-6 text-xs md:text-base'>
                <p>My Balance:</p>
                <p>
                    {
                        phase === 0 ?
                            `${formatBigNumber(ethBalance).toFormat(3)} AVAX`
                            :
                            `${formatBigNumber(tokenBalance).toFormat(0)} HAKU`
                    }
                </p>
            </div>
            <div className='flex justify-between mt-6 text-xs md:text-base'>
                <p>Amount to buy:</p>
                <div className="flex">
                    <button className='mx-1 cursor-pointer text-[#EC0B26] font-extrabold'
                        onClick={() => {
                            if (amount > 1) {
                                setAmount(amount - 1);
                            }
                        }}
                    >
                        -
                    </button>
                    <p className='mx-3'>{amount}</p>
                    <button className='mx-1 mr-3 cursor-pointe text-[#EC0B26] font-extrabold'
                        onClick={() => {
                            if (amount < 10) {
                                setAmount(amount + 1);
                            }
                        }}
                    >
                        +
                    </button>
                    <button className="cursor-pointer text-[#EC0B26] font-extrabold"
                        onClick={() => {
                            setAmount(10);
                        }}
                    >
                        Max
                    </button>
                </div>
            </div>
            <div className='flex justify-between mt-6 text-xs md:text-base'>
                <p>Price:</p>
                <p>
                    {
                        phase === 0 ?
                            `${formatBigNumber(tokenPrice)} AVAX`
                            :
                            `${formatBigNumber(phaseTokenPrice).toFormat(0)} HAKU`
                    }
                </p>
            </div>
            <div className='flex justify-between mt-6 text-xs md:text-base'>
                <p>Available:</p>
                <p>
                    {
                        phase === 0 ?
                            `${formatBigNumber(totalPrice)} AVAX`
                            :
                            `${formatBigNumber(totalPrice).toFormat(0)} HAKU`
                    }
                </p>
            </div>
            {
                account && phase !== 0 && tokenAllowance.lte(0) ?
                    <div className='flex justify-center'>
                        <button className="bg-[#EC0B26] p-3 font-bold rounded-xl w-1/2 text-white m-5 mt-10 ml-0"
                            disabled={approvePending}
                            onClick={() => {
                                approve();
                            }}
                        >
                            APPROVE
                        </button>
                    </div>
                    :
                    <div className='flex'>
                        <button className="bg-[#EC0B26] p-3 font-bold rounded-xl w-1/2 text-white m-5 mt-10 ml-0"
                            disabled={mintPending || (!saleIsEnabled && !privateSaleIsEnabled) || stopedPass}
                            onClick={() => {
                                mint(false);
                            }}
                        >
                            MINT
                        </button>
                        <button className="bg-[#EC0B26] p-3 font-bold rounded-xl w-1/2 text-white m-5 mt-10 mr-0"
                            disabled={mintPending || (!saleIsEnabled && !privateSaleIsEnabled) || stopedPass}
                            onClick={() => {
                                mint(true);
                            }}
                        >
                            MINT & STAKE
                        </button>
                    </div>
            }
        </div>
    );
}

export default Mint;