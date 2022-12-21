import { useMemo } from 'react';
import {
  getLpContract,
  getTokenContract,
  getNFTContract,
  getStakeContract,
  getMulticallContract
} from '../utils/contractHelpers';
import useWeb3 from './useWeb3';

export const useLpContract = () => {
  const web3 = useWeb3();
  return useMemo(() => getLpContract(web3), [web3]);
};

export const useTokenContract = () => {
  const web3 = useWeb3();
  return useMemo(() => getTokenContract(web3), [web3]);
};

export const useNFTContract = () => {
  const web3 = useWeb3();
  return useMemo(() => getNFTContract(web3), [web3]);
};

export const useStakeContract = () => {
  const web3 = useWeb3();
  return useMemo(() => getStakeContract(web3), [web3]);
};

export const useMulticallContract = () => {
  const web3 = useWeb3();
  return useMemo(() => getMulticallContract(web3), [web3]);
};