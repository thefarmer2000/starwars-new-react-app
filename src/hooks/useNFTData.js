import {
  useEffect, useState,
  useCallback
} from 'react';
import { useWeb3React } from '@web3-react/core';
import BigNumber from 'bignumber.js';
import useRefresh from './useRefresh';
import { useNFTContract } from './useContract';
import useMulticallData from './useMulticall';
import useWeb3 from './useWeb3';
import { NotificationManager } from 'react-notifications';
import nftAbi from '../config/abis/nft.json';

export const useInfo = (forceUpdate) => {
  const web3 = useWeb3();
  const [privateSaleIsEnabled, setPrivateSaleIsEnabled] = useState(false);
  const [saleIsEnabled, setSaleIsEnabled] = useState(false);
  const [phase, setPhase] = useState(0);
  const [ninjaStolen, setNinjaStolen] = useState(0);
  const [monkStolen, setMonkStole] = useState(0);
  const [tokenPrice, setTokenPrice] = useState(new BigNumber(0));
  const [phaseTokenPrice, setPhaseTokenPrice] = useState(new BigNumber(0));

  const { fastRefresh } = useRefresh();
  const tokenContract = useNFTContract();

  useEffect(() => {
    const getTokenInfo = async () => {
      try {
        const _privateSaleIsEnabled = await tokenContract.methods.privateSaleIsEnabled().call();
        const _saleIsEnabled = await tokenContract.methods.saleIsEnabled().call();
        const _phase = await tokenContract.methods.phase().call();
        const _mintPrice = await tokenContract.methods.mintPrice().call();
        const _ninjaStolen = await tokenContract.methods.ninjaStolen().call();
        const _monkStolen = await tokenContract.methods.monkStolen().call();
        const _phaseTokenPrice = await tokenContract.methods.phasePrice(_phase).call();

        setPrivateSaleIsEnabled(_privateSaleIsEnabled);
        setSaleIsEnabled(_saleIsEnabled);
        setPhase(parseInt(_phase));
        setTokenPrice(new BigNumber(_mintPrice));
        setNinjaStolen(_ninjaStolen);
        setMonkStole(_monkStolen);
        setPhaseTokenPrice(new BigNumber(_phaseTokenPrice));
      } catch (e) {
        console.error('fetch token balance had error', e);
      }
    };

    if (tokenContract) {
      getTokenInfo();
    } else {
      setPhase(0);
      setTokenPrice(new BigNumber(0));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fastRefresh, tokenContract, forceUpdate, web3.eth]);

  return { privateSaleIsEnabled, saleIsEnabled, phase, tokenPrice, phaseTokenPrice, ninjaStolen, monkStolen };
};

export const useMintedCountInfo = (forceUpdate) => {
  const web3 = useWeb3();
  const [totalSupply, setTotalSupply] = useState(0);
  const [mintedNinja, setMintedNinja] = useState(0);

  const { fastRefresh } = useRefresh();
  const tokenContract = useNFTContract();

  useEffect(() => {
    const getTokenInfo = async () => {
      try {
        const _totalSupply = await tokenContract.methods.totalSupply().call();
        const _mintedNinja = await tokenContract.methods.ninjaMinted().call();
        setTotalSupply(_totalSupply);
        setMintedNinja(_mintedNinja);
      } catch (e) {
        console.error('fetch token balance had error', e);
      }
    };

    if (tokenContract) {
      getTokenInfo();
    } else {
      setTotalSupply(0);
      setMintedNinja(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fastRefresh, tokenContract, forceUpdate, web3.eth]);

  return { totalSupply, mintedNinja };
};

export const useNFTAccountInfo = (forceUpdate) => {
  const web3 = useWeb3();
  const [whitelist, setWhitelist] = useState(false);
  const [nftIDs, setNftIds] = useState([]);

  const { account } = useWeb3React();
  const { fastRefresh } = useRefresh();
  const tokenContract = useNFTContract();

  useEffect(() => {
    const getTokenInfo = async () => {
      try {
        const _whitelist = await tokenContract.methods.whitelist(account).call();
        const _nftIDs = await tokenContract.methods.tokensOfOwner(account).call();
        setWhitelist(_whitelist);
        setNftIds(_nftIDs);
      } catch (e) {
        console.error('fetch token balance had error', e);
      }
    };

    if (tokenContract && account) {
      getTokenInfo();
    } else {
      setWhitelist(false);
      setNftIds([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, fastRefresh, tokenContract, forceUpdate, web3.eth]);

  return { whitelist, nftIDs };
};

export const useNinjaData = (tokenIds) => {
  const web3 = useWeb3();
  const [ninjaData, setNinjaData] = useState([]);
  const [ninjaCount, setNinjaCount] = useState(0);

  const { fastRefresh } = useRefresh();

  const calls = [];
  for (let i = 0; i < tokenIds.length; i++) {
    calls.push({ address: process.env.REACT_APP_NFT_ADDRESS, name: 'isNinja', params: [tokenIds[i]] })
  }
  const multicall = useMulticallData(nftAbi, calls);

  useEffect(() => {
    const getTokenInfo = async () => {
      try {
        const data = await multicall();
        const temp = [];
        let _ninjaCount = 0;
        if (data && data.length > 0) {
          for (let i = 0; i < data.length; i++) {
            temp.push(data[i][0]);
            if (data[i][0]) {
              _ninjaCount++;
            }
          }
        }
        setNinjaData(temp);
        setNinjaCount(_ninjaCount);
      } catch (e) {
        console.error('fetch token balance had error', e);
      }
    };

    if (tokenIds && tokenIds.length > 0) {
      getTokenInfo();
    } else {
      setNinjaData([]);
      setNinjaCount(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fastRefresh, tokenIds, web3.eth]);

  return { ninjaData, ninjaCount };
};

export const useMint = (totalPrice, amount) => {
  const [mintPending, setMintPending] = useState(false);

  const { account } = useWeb3React();
  const tokenContract = useNFTContract();

  const handleMint = useCallback(async (staked, phase) => {
    try {
      setMintPending(true);
      const tx = await tokenContract.methods
        .mint(amount, staked)
        .send({
          from: account,
          value: phase === 0 ? new BigNumber(totalPrice).dp(0).toString(10) : 0
        })
        .on("error", (err) => {
          setMintPending(false);
          return null;
        })
        .on("transactionHash", (hash) => {
          NotificationManager.info(hash.slice(0, 10) + '...' + hash.slice(58), 'Transaction', 5000, () => { window.open(`https://snowtrace.io/tx/${hash}`) });
          return hash;
        })
        .on("receipt", (result) => {
          NotificationManager.success("Mint successfully!", 'Transaction');
          setMintPending(false);
          return result;
        });
      return tx;
    } catch (e) {
      console.log('token transfer had error :>> ', e);
      setMintPending(false);
      return false;
    }
  }, [account, tokenContract, totalPrice, amount]);

  return { onMint: handleMint, mintPending };
};