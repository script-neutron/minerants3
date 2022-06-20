import Link from "next/link";
import { BsFillEggFill } from "react-icons/bs";
import { GiAnt } from "react-icons/gi";
import { MdOutlineSavings } from "react-icons/md";
import { AiOutlineShop } from "react-icons/ai";
import box from "../../assets/box.png";
import metamask from "../../assets/metamask.png";
import Image from "next/image";
import metamaskwallet from "../../codes/wallet";
import { useState, useEffect } from "react";
import { ethers } from 'ethers'
import mintegg from "../../codes/mint";

function DappPage() {
  const [walletAddress, setWallet] = useState("");

  function wallettoggle() {
    if(walletAddress.length < 5){
      const modal = document.getElementsByClassName("xmodal")[0];
      modal.classList.toggle("xshow-modal");
    }
  }

  function xwallettoggle() {
      const modal = document.getElementsByClassName("xmodal")[0];
      modal.classList.toggle("xshow-modal");
  }

  function infotoggle() {
    const modal = document.getElementsByClassName("infomodal")[0];
    modal.classList.toggle("infoshow-modal");
}

  const isMetaMaskConnected = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const accounts = await provider.listAccounts()
    return accounts
  }

  async function startmintegg(){
    //document.getElementById("mintbtn").disabled = true;
    await mintegg()
  }

  useEffect(() => {
    isMetaMaskConnected()
      .then((rez) => {
        if (rez.length !== 0) {
          setWallet(rez[0])
          if (walletAddress !== '') {
            document.getElementsByClassName('walletaddr')[0].innerHTML =
              String(walletAddress).substring(0, 6) +
              '...' +
              String(walletAddress).substring(38)
          }
        }
        else{
          document.getElementsByClassName('walletaddr')[0].innerHTML ='Connect Wallet'
        }
      })
      .catch((err) => console.log(err))
  
  }, [walletAddress])
  
  return (
    <div className="m-4">
      <div className="mx-8 flex justify-center">
        <div className="p-2 m-3">
          <h1
            className="hover:bg-orange-600 cursor-pointer p-2 walletaddr border-2 border-orange-50 rounded-sm text-white text-bold text-xl font-bold"
            onClick={wallettoggle}
          >
            Connect Wallet
          </h1>
        </div>
        <ul className="flex text-white">
          <li className="gap-3 flex items-center navbtn cursor-pointer text-blue-600 font-semibold px-3 py-2 text-md hover:font-black">
            <BsFillEggFill style={{ fill: "white" }} />
            <Link href="/dapp"> Mint Egg </Link>
          </li>

          <li className="gap-3 flex items-center navbtn cursor-pointer hover:bg-blue-600  hover:text-white px-3 py-2 rounded-md text-md font-semibold">
            <GiAnt style={{ fill: "white" }} />
            <Link href="/hatchegg"> Hatch Egg </Link>
          </li>

          <li className="gap-3 flex items-center navbtn cursor-pointer hover:bg-blue-600  hover:text-white px-3 py-2 rounded-md text-md font-semibold">
            <AiOutlineShop style={{ fill: "white" }} />
            <Link href="/mining"> Mining Nest </Link>
          </li>

          <li className="gap-3 flex items-center navbtn active:bg-orange-700 cursor-pointer hover:bg-black  hover:text-white px-3 py-2 rounded-md text-md font-semibold">
            <MdOutlineSavings style={{ fill: "white" }} />
            <Link href="/staking"> Staking </Link>
          </li>
        </ul>
      </div>
      <br />
      <br />
      <center>
        <div className="p-3 m-4 md:w-[35rem] rounded-lg gap-3">
          <div className="bg-cyan-500 shadow-lg shadow-cyan-500/50 rounded-lg ">
            <Image src={box} alt="logo" className="eggimage"/>
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
          <button className="btn mintbtn" onClick={startmintegg}>Mint Egg</button>
        </div>
      </center>
      <div className="xmodal">
        <div className="xmodal-content">
          <span className="xclose-button" onClick={xwallettoggle}>X</span>
          <h1 className="wallet">Choose your wallet</h1>
          <div className="walletlogo flex gap-4 w-[10rem]">
            <Image
              src={metamask}
              alt=""
              onClick={() => {
                metamaskwallet().then((rez)=>{
                  setWallet(rez)
                })
              }}
            />
          </div>
        </div>
      </div>
      <div className="infomodal">
        <div className="infomodal-content">
        <span className="infoclose-button" onClick={infotoggle}>X</span>
        <h1 className="myinfo">Status</h1>
        </div>
      </div>
    </div>
  );
}

export default DappPage;
