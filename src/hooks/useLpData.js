import {
  useEffect, useState,
} from 'react';
import BigNumber from 'bignumber.js';
import useRefresh from './useRefresh';
import { useLpContract } from './useContract';

export const usePrice = (forceUpdate) => {
  const [price, setPrice] = useState(new BigNumber(0));
  const { fastRefresh } = useRefresh();
  const tokenContract = useLpContract();

  useEffect(() => {
    const fetchAllowance = async () => {
      try {
        const res = await tokenContract.methods.getReserves().call();
        setPrice(new BigNumber(res[1]).div(new BigNumber(res[0])))
      } catch (e) {
        console.error('fetch token allowance had error', e);
      }
    };
    if (tokenContract) {
      fetchAllowance();
    }
  }, [tokenContract, fastRefresh, forceUpdate]);

  return price;
};
