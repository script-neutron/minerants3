import { ethers } from 'ethers';
import { buyContractAbi } from '../abi/buyabi';
import { tokenContractAbi } from '../abi/tokenabi';
import { tokenAddress } from '../contractaddress/tokenaddress';
import { buyAddress } from '../contractaddress/buyaddress';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function timeConverter(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000);
  var months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time =
    date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
  return time;
}

async function checkconnection(provider, walletaddr) {
  toast.info(' Approve contract', {
    position: 'top-center',
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
  });
  autorizetoken(provider, walletaddr);
}

async function autorizetoken(provider, walletaddr) {
  const signer = provider.getSigner();
  const tokenContract = new ethers.Contract(
    tokenAddress,
    tokenContractAbi,
    provider
  );
  const signerfortoken = tokenContract.connect(signer);
  const buyContract = new ethers.Contract(buyAddress, buyContractAbi, provider);
  const signerforbuy = buyContract.connect(signer);
  try {
    let amount = await buyContract.Mintprice();
    amount = ethers.utils.formatUnits(amount._hex, 0);
    console.log(amount);
    let tx = await signerfortoken.approve(buyAddress, amount);
    tx.wait(1).then(async () => {
      try {
        toast.info('Minting Started...', {
          position: 'top-center',
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
        let buytz = await signerforbuy.buyant();
        buytz
          .wait(1)
          .then(async () => {
            buyContract.once('mintedegg', async (_id, event) => {
              let id = ethers.utils.formatUnits(_id._hex, 0);
              buyContract
                .getURI(id)
                .then((uri) => {
                  let decoded = JSON.parse(
                    atob(uri.replace(/^data:\w+\/\w+;base64,/, ''))
                  );
                  let date = decoded.attributes[2].value;
                  date = timeConverter(date);
                  document.getElementsByClassName('birthday')[0].innerHTML =
                    date;
                  document.getElementsByClassName('eggimage')[0].srcset =
                    decoded.image;
                  document.getElementsByClassName('id')[0].innerHTML =
                    decoded.id;
                  console.log(decoded);
                  toast.success('Egg minted', {
                    position: 'top-center',
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                  });
                })
                .catch((err) => {
                  toast.error('Minting failed', {
                    position: 'top-center',
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                  });
                  console.log(err);
                });
            });
          })
          .catch((err) => {
            console.log(err);
            toast.error('Minting failed', {
              position: 'top-center',
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
            });
          });
      } catch (error) {
        console.log(error);
        toast.error('Approval failed', {
          position: 'top-center',
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      }
    });
  } catch (error) {
    window.location.reload();
  }
}

export default async function mintegg(web3provider, walletAddress) {
  try {
    if (web3provider.connection.url === 'metamask') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      checkconnection(provider, walletAddress);
    }
    if (web3provider.connection.url === 'eip-1193:') {
      const p = new WalletConnectProvider({
        rpc: {
          137: 'https://polygon-rpc.com',
        },
      });
      const provider = new ethers.providers.Web3Provider(p);
      checkconnection(provider, walletAddress);
    }
  } catch (error) {
    toast.error('Minting failed', {
      position: 'top-center',
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
    console.log(error);
  }
}
