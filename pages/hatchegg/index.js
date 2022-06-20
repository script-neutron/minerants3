import { ethers } from "ethers";
import { antABI } from "/abi/antabi";
import { antAddress } from "/contractaddress/antaddress";
import { useState, useEffect } from "react";
import { BsFillEggFill } from "react-icons/bs";
import { GiAnt } from "react-icons/gi";
import { MdOutlineSavings } from "react-icons/md";
import { AiOutlineShop } from "react-icons/ai";
import Link from "next/link";
import Mininav from "../../components/mininav";
import Image from "next/image";

function timeConverter(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000);
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time =
    date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
  return time;
}

function infotoggle() {
    const modal = document.getElementsByClassName("infomodal")[0];
    modal.classList.toggle("infoshow-modal");
}

async function starthatching(id) {
    let provider = new ethers.providers.Web3Provider(window.ethereum)
    const antContract = new ethers.Contract(antAddress, antABI, provider)
    document.getElementsByClassName('myinfo')[0].innerHTML = 'Hatching Egg . <br/> Please wait...'
    infotoggle()
    let img = 'img' + id
    let name = 'description' + id
    let hash = 'hash' + id
    let attack = 'attack' + id
    let birthday = 'date' + id
    let btn = 'btn' + id
  
    document.getElementsByClassName(btn)[0].disabled = true
    const signer = provider.getSigner()
    const antsigner = antContract.connect(signer)
    let tx = await antsigner.hatchegg(id)
    tx.wait(1)
      .then(async () => {
        let URI = await antContract.tokenURI(id)
        URI = JSON.parse(atob(URI.replace(/^data:\w+\/\w+;base64,/, '')))
        document.getElementsByClassName(img)[0].srcset = URI.image
        document.getElementsByClassName(name)[0].innerHTML =  URI.name
        document.getElementsByClassName(hash)[0].innerHTML =
          'Hash Pow : ' + URI.attributes[0].value
        document.getElementsByClassName(attack)[0].innerHTML =
          'Attack Pow : ' + URI.attributes[1].value
        let date = URI.attributes[3].value
        date = timeConverter(date)
        document.getElementsByClassName(birthday)[0].innerHTML = 'Birthday : ' + date
        infotoggle()
        document.getElementsByClassName(`${'btn' + id}`)[0].innerHTML= 'Hatched'
      })
      .catch((err) => console.log(err))
  }

export default function Index() {
  const [myArray, setArray] = useState([]);
  const [wallet, setwallet] = useState();

  useEffect(() => {
    async function fetchdata() {
     let provider = new ethers.providers.Web3Provider(window.ethereum)
     const antContract = new ethers.Contract(antAddress, antABI, provider)
      if (provider) {
        let account = await provider.listAccounts()
        setwallet(account[0])
      }
      if (wallet !== undefined) {
        infotoggle()
        let myeggs = []
        document.getElementsByClassName('myinfo')[0].innerHTML = 'Loading assets'
        let Balance = await antContract.balanceOf(wallet)
        Balance = ethers.utils.formatUnits(Balance._hex, 0)
        let allnfts = await antContract.getcurrentholders(wallet);
        for (let index = 0; index < allnfts[0].length; index++) {
          if(ethers.utils.formatUnits(allnfts[0][index]._hex, 0) != 7777777){
            myeggs.push(ethers.utils.formatUnits(allnfts[0][index]._hex, 0))
          }
        }
        //let TokenNFT = await antContract._tokenIds()
        //TokenNFT = ethers.utils.formatUnits(TokenNFT._hex, 0)
          for (let i = 0; i < myeggs.length; i++) {
            console.log(i);
              let nftowner = await antContract.ownerOf(myeggs[i])
              nftowner = nftowner.toLowerCase()
              if (nftowner === wallet.toLowerCase()) {
                let URI = await antContract.tokenURI(myeggs[i])
                URI = JSON.parse(
                  atob(URI.replace(/^data:\w+\/\w+;base64,/, ''))
                )
                if (URI.attributes[0].value == 0) {
                  setArray((myArray) => [...myArray, URI])
                  
                }
              } 
          }
          document.getElementsByClassName('myinfo')[0].innerHTML = 'Done loading assets!'
      }
    }
    fetchdata()
  }, [wallet])


  const listitems = myArray.map((item) => {
    let date = item.attributes[3].value
    date = timeConverter(date)
    return (
      <div className={`hatch-cards ${item.id} text-center m-4 p-4 shadow-lg shadow-indigo-500/50 rounded-lg `} key={item.id}>
        <h1 className={`${'id' + item.id} font-bold text-2xl text-red-600 m-1`}>ID : {item.id}</h1>
        <Image src={item.image} width='500px' height='500px' alt='img' className={`${'img' + item.id} rounded-lg`} />
        <h1 className={`${'description' + item.id} font-medium text-lg text-cyan-300`}> {item.description}</h1>
        <h3 className={`${'hash' + item.id} font-medium text-lg text-pink-700`}>
          Hash Pow: {item.attributes[0].value}
        </h3>
        <h3 className={`${'attack' + item.id} font-medium text-lg text-pink-700`}>
          Attack Pow: {item.attributes[1].value}
        </h3>
        <h3 className={`${'date' + item.id} font-medium text-lg text-pink-700`}> Birthday: {date}</h3>
        <button
          onClick={async () => starthatching(item.id)}
          className={`${'btn' + item.id} btn m-4`}
        >
          Hatch Egg
        </button>
      </div>
    )
  })


  return (
    <div>
        <Mininav/>
        <div className="p-4 m-4 container mx-auto">
            <h1 className="text-lg font-bold text-center text-pink-600"> View all Your Miner Ants Eggs here and Hatch them</h1>
            <div className="grid gap-3 grid-cols-1 md:grid-cols-4 p-3 z-0">
                {listitems}
            </div>
        </div>
        <div className="infomodal absolute">
        <div className="infomodal-content">
        <span className="infoclose-button" onClick={infotoggle}>X</span>
        <h1 className="myinfo">Status</h1>
        </div>
      </div>
    </div>
  );
}
