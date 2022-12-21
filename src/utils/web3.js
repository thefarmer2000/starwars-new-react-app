import Web3 from 'web3/dist/web3.min.js'

const RPC_URL = process.env.REACT_APP_MAIN_WEB3_PROVIDER;

const getWeb3NoAccount = () => {
  const httpProvider = new Web3.providers.HttpProvider(RPC_URL, { timeout: 10000 })
  const web3NoAccount = new Web3(httpProvider)
  return web3NoAccount;
}

export { getWeb3NoAccount }