import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'

import metamask from '../assets/img/wallet/metamask.png'
import walletconnector from '../assets/img/wallet/walletconnect.svg'

const chainId = parseInt(process.env.REACT_APP_NETWORK_ID, 10);
const rpcUrl = process.env.REACT_APP_MAIN_WEB3_PROVIDER;
const POLLING_INTERVAL = 12000

const supportedChainIds = [
  chainId,
];

const injected = new InjectedConnector({
  supportedChainIds,
});

// const walletlink = new WalletLinkConnector({
//   url: rpcUrl,
//   appName: '',
//   appLogoUrl: '',
//   darkMode: false,
//   supportedChainIds: supportedChainIds
// });

const walletconnect = new WalletConnectConnector({
  rpc: { [chainId]: rpcUrl },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
});

export const wallets = [
  {
    id: 1,
    name: 'Metamask',
    desc: 'Connect to your MetaMask Wallet',
    icon: metamask,
    connector: injected,
    link: '',
  },
  // {
  //   id: 2,
  //   name: 'Coinbase Wallet',
  //   desc: 'Connect to your Coinbase Wallet',
  //   icon: coinbase,
  //   connector: walletlink,
  //   link: '',
  // },
  {
    id: 2,
    name: 'WalletConnect',
    desc: 'Scan with WalletConnect to connect',
    icon: walletconnector,
    connector: walletconnect,
    link: '',
  },
];

export const connectorLocalStorageKey = "connectorId";