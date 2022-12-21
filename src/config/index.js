const web3Provider = process.env.REACT_APP_MAIN_WEB3_PROVIDER;

const config = {
  web3Provider: web3Provider || '',
  networkId: Number(process.env.REACT_APP_NETWORK_ID) || 592,

  phase: [5000, 6678, 8344, 10000]
};

module.exports = config;
