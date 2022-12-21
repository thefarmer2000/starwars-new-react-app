import {
  useEffect, useState,
  useCallback
} from 'react';
import { useWeb3React } from '@web3-react/core';
import BigNumber from 'bignumber.js';
import useRefresh from './useRefresh';
import { useStakeContract } from './useContract';
import useMulticallData from './useMulticall';
import useWeb3 from './useWeb3';
import { NotificationManager } from 'react-notifications';
import stakeAbi from '../config/abis/stake.json';

export const useStakeInfo = (forceUpdate) => {
  const web3 = useWeb3();
  const [totalMonkStaked, setTotalMonkStaked] = useState(0);
  const [totalNinjaStaked, setTotalNinjaStaked] = useState(0);
  const [totalRewardClaimed, setTotalRewardClaimed] = useState(new BigNumber(0));

  const { fastRefresh } = useRefresh();
  const tokenContract = useStakeContract();

  useEffect(() => {
    const getStakeInfo = async () => {
      try {
        const _totalMonkStaked = await tokenContract.methods.totalMonkStaked().call();
        const _totalNinjaStaked = await tokenContract.methods.totalNinjaStaked().call();
        const _totalRewardClaimed = await tokenContract.methods.totalRewardClaimed().call();

        setTotalMonkStaked(_totalMonkStaked);
        setTotalNinjaStaked(_totalNinjaStaked);
        setTotalRewardClaimed(new BigNumber(_totalRewardClaimed));
      } catch (e) {
        console.error('fetch token balance had error', e);
      }
    };

    if (tokenContract) {
      getStakeInfo();
    } else {
      setTotalMonkStaked(0);
      setTotalNinjaStaked(0);
      setTotalRewardClaimed(new BigNumber(0))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fastRefresh, tokenContract, forceUpdate, web3.eth]);

  return { totalMonkStaked, totalNinjaStaked, totalRewardClaimed };
};

export const useStakeAccountInfo = (forceUpdate) => {
  const web3 = useWeb3();
  const [stakedMonks, setStakedMonks] = useState([]);
  const [stakedNinjas, setStakedNinjas] = useState([]);
  const [accHakuPerNinja, setAccHakuPerNinja] = useState(new BigNumber(0));

  const { account } = useWeb3React();
  const { fastRefresh } = useRefresh();
  const tokenContract = useStakeContract();

  useEffect(() => {
    const getStakeInfo = async () => {
      try {
        const _stakedMonks = await tokenContract.methods.getAccountMonks(account).call();
        const _stakedNinjas = await tokenContract.methods.getAccountNinjas(account).call();
        const _accHakuPerNinja = await tokenContract.methods.accHakuPerNinja().call();

        setStakedMonks(_stakedMonks);
        setStakedNinjas(_stakedNinjas);
        setAccHakuPerNinja(new BigNumber(_accHakuPerNinja));
      } catch (e) {
        console.error('fetch token balance had error', e);
      }
    };

    if (tokenContract && account) {
      getStakeInfo();
    } else {
      setStakedMonks([]);
      setStakedNinjas([]);
      setAccHakuPerNinja(new BigNumber(0));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, fastRefresh, tokenContract, forceUpdate, web3.eth]);

  return { stakedMonks, stakedNinjas, accHakuPerNinja };
};

export const useMonkPending = (tokenIds) => {
  const web3 = useWeb3();
  const [monkPending, setMonkPneding] = useState([]);

  const { account } = useWeb3React();
  const { fastRefresh } = useRefresh();

  const calls = [];
  for (let i = 0; i < tokenIds.length; i++) {
    calls.push({ address: process.env.REACT_APP_STAKE_ADDRESS, name: 'pendingRewardForMonk', params: [tokenIds[i].tokenId, account] })
  }
  const multicall = useMulticallData(stakeAbi, calls);

  useEffect(() => {
    const getTokenInfo = async () => {
      try {
        const data = await multicall();
        setMonkPneding(data);
      } catch (e) {
        console.error('fetch token balance had error', e);
      }
    };

    if (tokenIds && tokenIds.length > 0) {
      getTokenInfo();
    } else {
      setMonkPneding([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, fastRefresh, tokenIds, web3.eth]);

  return { monkPending };
};

export const useStake = (tokenIds) => {
  const [stakePending, setStakePending] = useState(false);
  const { account } = useWeb3React();
  const tokenContract = useStakeContract();

  const handleStake = useCallback(async () => {
    try {
      if (tokenIds && tokenIds.length < 1) {
        return
      }

      setStakePending(true);
      const tx = await tokenContract.methods
        .addTokensToStake(account, tokenIds)
        .send({
          from: account
        })
        .on("error", (err) => {
          setStakePending(false);
          return null;
        })
        .on("transactionHash", (hash) => {
          NotificationManager.info(hash.slice(0, 10) + '...' + hash.slice(58), 'Transaction', 5000, () => { window.open(`https://snowtrace.io/tx/${hash}`) });
          return hash;
        })
        .on("receipt", (result) => {
          NotificationManager.success("Stake successfully!", 'Transaction');
          setStakePending(false);
          return result;
        });
      return tx;
    } catch (e) {
      console.log('token transfer had error :>> ', e);
      setStakePending(false);
      return false;
    }
  }, [account, tokenContract, tokenIds]);

  return { onStake: handleStake, stakePending };
};

export const useUnstake = (tokenIds) => {
  const [unstakePending, setUnstakePending] = useState(false);
  const { account } = useWeb3React();
  const tokenContract = useStakeContract();

  const handleUnstake = useCallback(async (unstake) => {
    try {
      if (tokenIds && tokenIds.length < 1) {
        return
      }

      setUnstakePending(true);
      const tx = await tokenContract.methods
        .claimFromStake(tokenIds, unstake)
        .send({
          from: account
        })
        .on("error", (err) => {
          setUnstakePending(false);
          return null;
        })
        .on("transactionHash", (hash) => {
          NotificationManager.info(hash.slice(0, 10) + '...' + hash.slice(58), 'Transaction', 5000, () => { window.open(`https://snowtrace.io/tx/${hash}`) });
          return hash;
        })
        .on("receipt", (result) => {
          NotificationManager.success(`${unstake ? 'Unstake' : 'Claim'} successfully!`, 'Transaction');
          setUnstakePending(false);
          return result;
        });
      return tx;
    } catch (e) {
      console.log('token transfer had error :>> ', e);
      setUnstakePending(false);
      return false;
    }
  }, [account, tokenContract, tokenIds]);

  return { onUnstake: handleUnstake, unstakePending };
};