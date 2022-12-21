/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { NotificationManager } from 'react-notifications'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector';
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from '@web3-react/walletconnect-connector';
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import { wallets, connectorLocalStorageKey } from '../../../utils/connectors'
import { setupNetwork } from '../../../utils/addRPC'
import { ReactComponent as Arrow } from '../../../assets/img/arrow-right.svg'

import '../../../main.css';

const WalletConnetor = (props) => {
  const { modalView, setModalView } = props;
  const { activate } = useWeb3React();

  const handleClick = async (wallet) => {
    const { connector } = wallet;
    setModalView(false);
    try {
      activate(connector, async (error) => {
        if (error instanceof UnsupportedChainIdError) {
          const hasSetup = await setupNetwork();
          if (hasSetup) {
            activate(connector);
          }
        } else {
          window.localStorage.removeItem(connectorLocalStorageKey);
          if (error instanceof NoEthereumProviderError) {
            NotificationManager.warning('Provider Error', 'No provider was found');
          } else if (
            error instanceof UserRejectedRequestErrorInjected ||
            error instanceof UserRejectedRequestErrorWalletConnect
          ) {
            if (connector instanceof WalletConnectConnector) {
              const walletConnector = connector;
              walletConnector.walletConnectProvider = null;
            }
            NotificationManager.warning(
              'Authorization Error',
              'Please authorize to access your account',
            );
          } else {
            NotificationManager.warning(error.name, error.message);
          }
        }
      });
    } catch (error) {
      NotificationManager.warning('Something went wrong while connect wallet');
    }
  }

  if (!modalView) {
    return null;
  }

  return (
    <div
      className={`modal`}
      onClick={() => setModalView(false)}
    >
      <div className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          CONNECT WALLET
        </div>
        <div className="modal-body">
          {wallets.map((item, index) => (
            <div key={index} className="connect-wallet-item">
              <div
                className="wallet"
                onClick={() => handleClick(item)}
              >
                <div>
                  <img src={item.icon} alt="Wallet" className="wallet-icon" />
                </div>
                <div lg={9} sm={9} xs={12} className="text-xs-center">
                  <div className="wallet-name text-xs-center text-md-left">
                    {item.name}
                  </div>
                  <p className="wallet-content text-xs-center text-md-left">{item.desc}</p>
                </div>
                <div className="wallet-arrow" lg={1} sm={1} xs={12}>
                  <Arrow />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WalletConnetor