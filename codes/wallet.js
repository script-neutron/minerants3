import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import { parse, stringify, toJSON, fromJSON } from 'flatted';
import WalletConnectProvider from '@walletconnect/web3-provider';

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: {
        137: 'https://polygon-rpc.com',
      },
      network: 'matic',
    },
  },
};

export default async function metamaskwallet() {
  try {
    let web3modal = new Web3Modal({
      cacheProvider: false,
      providerOptions,
    });

    const web3ModalInstance = await web3modal.connect();
    const web3ModalProvider = new ethers.providers.Web3Provider(
      web3ModalInstance
    );
    console.log(web3ModalProvider);
    sessionStorage.setItem('provider', stringify(web3ModalProvider));
    return stringify(web3ModalProvider);
  } catch (error) {
    console.log(error);
  }
}
