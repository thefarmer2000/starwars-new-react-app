import { useEffect, useState, useRef } from 'react';
import Web3 from 'web3/dist/web3.min.js'
import { useWeb3React } from '@web3-react/core';
import { getWeb3NoAccount } from '../utils/web3';

const useWeb3 = () => {
  const { library } = useWeb3React();
  const refEth = useRef(library);
  const [web3, setweb3] = useState(library ? new Web3(library) : getWeb3NoAccount());

  useEffect(() => {
    if (library !== refEth.current) {
      setweb3(library ? new Web3(library) : getWeb3NoAccount());
      refEth.current = library;
    }
  }, [library]);

  return web3;
};

export default useWeb3;
