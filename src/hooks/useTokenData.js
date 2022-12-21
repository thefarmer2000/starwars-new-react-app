import {
  useEffect, useState,
  useCallback
} from 'react';
import { useWeb3React } from '@web3-react/core';
import BigNumber from 'bignumber.js';
import useRefresh from './useRefresh';
import { useTokenContract } from './useContract';
import useWeb3 from './useWeb3';
import { NotificationManager } from 'react-notifications';

export const useAllowance = (targetAddress, forceUpdate) => {
  const [allowance, setAllowance] = useState(new BigNumber(0));
  const { account } = useWeb3React();
  const { fastRefresh } = useRefresh();
  const tokenContract = useTokenContract();

  useEffect(() => {
    const fetchAllowance = async () => {
      try {
        const res = await tokenContract.methods.allowance(account, targetAddress).call();
        setAllowance(new BigNumber(res));
      } catch (e) {
        console.error('fetch token allowance had error', e);
      }
    };
    if (account && tokenContract) {
      fetchAllowance();
    }
  }, [account, tokenContract, targetAddress, fastRefresh, forceUpdate]);

  return allowance;
};

export const useApprove = (targetAddress) => {
  const [approvePending, setApprovePending] = useState(false);
  const { account } = useWeb3React();
  const tokenContract = useTokenContract();

  const handleApprove = useCallback(async () => {
    try {
      setApprovePending(true);
      const tx = await tokenContract.methods
        .approve(targetAddress, (new BigNumber(2).pow(256).minus(1)).toString(10))
        .send({ from: account })
        .on("error", (err) => {
          setApprovePending(false);
          return null;
        })
        .on("transactionHash", (hash) => {
          NotificationManager.info(hash.slice(0, 10) + '...' + hash.slice(58), 'Transaction', 5000, () => { window.open(`https://snowtrace.io/tx/${hash}`) });
          return hash;
        })
        .on("receipt", (result) => {
          NotificationManager.success("Approved successfully!", 'Transaction');
          setApprovePending(false);
          return result;
        });
      return tx;
    } catch (e) {
      setApprovePending(false);
      console.log('token approve had error :>> ', e);
      return false;
    }
  }, [account, tokenContract, targetAddress]);

  return { onApprove: handleApprove, approvePending };
};

// export const useTransfer = (targetAddress, amount, address) => {
//   const [pending, setPending] = useState(false);
//   const { account } = useWeb3React();
//   const tokenContract = useTokenFromAddress(address);

//   const handleTransfer = useCallback(async () => {
//     try {
//       setPending(true);
//       const tx = await tokenContract.methods
//         .transfer(targetAddress, new BigNumber(amount).times(1e18).dp(0).toString(10))
//         .send({ from: account });
//       setPending(false);
//       return tx;
//     } catch (e) {
//       console.log('token transfer had error :>> ', e);
//       setPending(false);
//       return false;
//     }
//   }, [account, tokenContract, targetAddress, amount]);

//   return { onTransfer: handleTransfer, pending };
// };

export const useETHBalance = (forceUpdate) => {
  const web3 = useWeb3();
  const [tokenBalance, setTokenBalance] = useState(new BigNumber(0));

  const { account, chainId } = useWeb3React();
  const { fastRefresh } = useRefresh();

  const getBalance = async () => {
    const ftmBalance = await web3.eth.getBalance(account)
    setTokenBalance(new BigNumber(ftmBalance));
  }

  useEffect(() => {
    if (account) {
      getBalance();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, chainId, fastRefresh, forceUpdate]);

  return tokenBalance;
};

export const useBalance = (forceUpdate) => {
  const web3 = useWeb3();
  const [tokenBalance, setTokenBalance] = useState(new BigNumber(0));

  const { account, chainId } = useWeb3React();
  const { fastRefresh } = useRefresh();
  const tokenContract = useTokenContract();

  useEffect(() => {
    const getTokenInfo = async () => {
      try {
        const res = await tokenContract.methods.balanceOf(account).call();
        setTokenBalance(new BigNumber(res));
      } catch (e) {
        console.error('fetch token balance had error', e);
      }
    };
    if (account && tokenContract) {
      getTokenInfo();
    } else {
      setTokenBalance(new BigNumber(0));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, chainId, fastRefresh, tokenContract, forceUpdate, web3.eth]);

  return tokenBalance;
};
