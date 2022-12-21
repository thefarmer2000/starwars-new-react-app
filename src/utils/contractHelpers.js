import { getWeb3NoAccount } from './web3';

import lpAbi from '../config/abis/lp.json';
import tokenAbi from '../config/abis/token.json';
import nftAbi from '../config/abis/nft.json';
import stakeAbi from '../config/abis/stake.json';
import multiAbi from '../config/abis/multi.json';

const getContract = (abi, address, web3) => {
  const _web3 = web3 ?? getWeb3NoAccount();
  return new _web3.eth.Contract(abi, address);
};

export const getLpContract = (web3) => {
  return getContract(lpAbi, process.env.REACT_APP_LP_ADDRESS, web3);
};

export const getTokenContract = (web3) => {
  return getContract(tokenAbi, process.env.REACT_APP_TOKEN_ADDRESS, web3);
};

export const getNFTContract = (web3) => {
  return getContract(nftAbi, process.env.REACT_APP_NFT_ADDRESS, web3);
};

export const getStakeContract = (web3) => {
  return getContract(stakeAbi, process.env.REACT_APP_STAKE_ADDRESS, web3);
};

export const getMulticallContract = (web3) => {
  return getContract(multiAbi, process.env.REACT_APP_MULTI_ADDRESS, web3);
};