import Link from 'next/link';
import { BsFillEggFill } from 'react-icons/bs';
import { GiAnt } from 'react-icons/gi';
import { MdOutlineSavings } from 'react-icons/md';
import { AiOutlineShop } from 'react-icons/ai';
import box from '../../assets/box.png';
import Image from 'next/image';
import metamaskwallet from '../../codes/wallet';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import mintegg from '../../codes/mint';
import dynamic from 'next/dynamic';
import { parse, stringify, toJSON, fromJSON } from 'flatted';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function DappPage() {
  const [walletAddress, setWallet] = useState('');
  const [web3provider, setweb3provider] = useState('');
  const [check, setcheck] = useState(false);

  function infotoggle() {
    const modal = document.getElementsByClassName('infomodal')[0];
    modal.classList.toggle('infoshow-modal');
  }

  async function startmintegg() {
    //document.getElementById("mintbtn").disabled = true;
    await mintegg(web3provider, walletAddress);
  }

  useEffect(() => {
    const provider = async () => {
      let checkprovider = sessionStorage.getItem('provider');
      if (checkprovider) {
        setweb3provider(parse(checkprovider));
        if (parse(checkprovider).connection.url === 'metamask') {
          setWallet(parse(checkprovider).provider.selectedAddress);
        }
        if (parse(checkprovider).connection.url === 'eip-1193:') {
          setWallet(parse(checkprovider).provider.accounts[0]);
        }
      }
    };
    provider();
  }, [check]);

  //sessionStorage.clear();
  return (
    <div className="m-4">
      <div className="mx-8 flex justify-center">
        <div className="p-2 m-3">
          <h1
            className="hover:bg-orange-600 cursor-pointer p-2 walletaddr border-2 border-orange-50 rounded-sm text-white text-bold text-xl font-bold"
            onClick={async () => {
              const xprovider = await metamaskwallet();
              setweb3provider(xprovider);
              setcheck(!check);
            }}
          >
            {walletAddress == '' ? (
              <>Connect Wallet</>
            ) : (
              String(walletAddress).substring(0, 6) +
              '...' +
              String(walletAddress).substring(38)
            )}
          </h1>
        </div>
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 m-4 text-white">
          <li className="gap-3 flex items-center navbtn cursor-pointer text-blue-600 font-semibold px-3 py-2 text-md hover:font-black">
            <BsFillEggFill style={{ fill: 'white' }} />
            <Link href="/dapp"> Mint Egg </Link>
          </li>

          <li className="gap-3 flex items-center navbtn cursor-pointer hover:bg-blue-600  hover:text-white px-3 py-2 rounded-md text-md font-semibold">
            <GiAnt style={{ fill: 'white' }} />
            <Link href="/hatchegg"> Hatch Egg </Link>
          </li>

          <li className="gap-3 flex items-center navbtn cursor-pointer hover:bg-blue-600  hover:text-white px-3 py-2 rounded-md text-md font-semibold">
            <AiOutlineShop style={{ fill: 'white' }} />
            <Link href="/mining"> Mining Nest </Link>
          </li>

          <li className="gap-3 flex items-center navbtn active:bg-orange-700 cursor-pointer hover:bg-black  hover:text-white px-3 py-2 rounded-md text-md font-semibold">
            <MdOutlineSavings style={{ fill: 'white' }} />
            <Link href="/staking"> Staking </Link>
          </li>
        </ul>
      </div>
      <br />
      <br />
      <center>
        <div className="p-3 m-4 md:w-[35rem] rounded-lg gap-3">
          <div className="bg-cyan-500 shadow-lg shadow-cyan-500/50 rounded-lg ">
            <Image src={box} alt="logo" className="eggimage" />
          </div>
          <div className="text-white p-3 text-lg text-lg text-center font-medium flex gap-4 justify-center m-4">
            <div className="flex gap-4">
              <span>ID: </span>
              <h1 className="id">********</h1>
            </div>
            <div></div>
            <div className="flex gap-4">
              <span>Mint Date: </span>
              <h1 className="birthday">********</h1>
            </div>
          </div>
          <button className="btn mintbtn" onClick={startmintegg}>
            Mint Egg
          </button>
        </div>
      </center>
      <div className="infomodal">
        <div className="infomodal-content">
          <span className="infoclose-button" onClick={infotoggle}>
            X
          </span>
          <h1 className="myinfo">Status</h1>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default dynamic(() => Promise.resolve(DappPage), { ssr: false });
