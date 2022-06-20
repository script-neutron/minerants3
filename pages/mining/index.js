import Mininav from "../../components/mininav";
import { GiAnt } from "react-icons/gi";
import { GiMining } from "react-icons/gi";
import { RiCoinsFill } from "react-icons/ri";
import { ethers } from "ethers";
import { buyContractAbi } from "/abi/buyabi.js";
import { antABI } from "/abi/antabi";
import { antAddress } from "/contractaddress/antaddress";
import { buyAddress } from "/contractaddress/buyaddress";
import { useState, useEffect } from "react";
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

async function claim(id) {
    try {
      const signer = provider.getSigner();
      const buysigner = buyContract.connect(signer);
      let tx = await buysigner.getrewards(id);
      tx.wait(1)
        .then(() => {
          document.getElementsByClassName(`${"anttoken" + id}`)[0].innerHTML =
            "N/A";
        })
        .catch((err) => console.log(err));
  
    } catch (error) {
      document.getElementsByClassName("hatching")[0].innerHTML =
        "Error occured..";
      toggleModal();
    }
  }

  function startclaim(id) {
    claim(id);
  }



export default function HatchEgg() {
    const [myArray, setArray] = useState([]);
    const [wallet, setwallet] = useState();

    useEffect(() => {
        fetchdata();
        async function fetchdata() {
            let provider = new ethers.providers.Web3Provider(window.ethereum);
            const antContract = new ethers.Contract(antAddress, antABI, provider);
            const buyContract = new ethers.Contract(buyAddress, buyContractAbi, provider);
            if (provider) {
              let account = await provider.listAccounts();
              setwallet(account[0]);
            }
            infotoggle();
        
            if (wallet !== undefined) {
              let myants = []
              document.getElementsByClassName("myinfo")[0].innerHTML = "Loading your ants...<br> Please be patience";
              let Balance = await antContract.balanceOf(wallet);
              Balance = ethers.utils.formatUnits(Balance._hex, 0);
              let allnfts = await antContract.getcurrentholders(wallet);
              for (let index = 0; index < allnfts[0].length; index++) {
                if(ethers.utils.formatUnits(allnfts[0][index]._hex, 0) != 7777777){
                  myants.push(ethers.utils.formatUnits(allnfts[0][index]._hex, 0))
                }
              }
              let unclaimed = 0;
              let pool = await buyContract.currentpool();
              pool = ethers.utils.formatUnits(pool._hex, 0);
              pool = pool / 1e18;
              let claimed = await buyContract.claimedrewards(wallet);
              claimed = ethers.utils.formatUnits(claimed._hex, 0);
              claimed = claimed / 1e18;
              document.getElementsByClassName("pool")[0].innerHTML = pool.toFixed(2);
              document.getElementsByClassName("claimed")[0].innerHTML = claimed.toFixed(2);
              let nft = [];
              let workers = 0;
              for (let i = 0; i < myants.length; i++) {
                  let nftowner = await antContract.ownerOf(myants[i]);
                  nftowner = nftowner.toLowerCase();
                  if (nftowner === wallet.toLowerCase()) {
                    let URI = await antContract.tokenURI(myants[i]);
                    URI = JSON.parse(atob(URI.replace(/^data:\w+\/\w+;base64,/, "")));
                    if (URI.attributes[0].value != 0) {
                      let rez = await buyContract.currentreward(myants[i]);
                      rez = ethers.utils.formatUnits(rez._hex, 0);
                      rez = rez / 1e18;
                      nft.push(myants[i]);
                      unclaimed = unclaimed + rez;
                      workers++;
                      console.log(workers);
                      document.getElementsByClassName("unclaimed")[0].innerHTML = unclaimed.toFixed(2);
                      setArray(prev => [...prev, URI]);
                    }
                  } else{
                    console.log("not owner");
                  }
              }
              document.getElementsByClassName("workers")[0].innerHTML = workers;
              for (let index = 0; index < nft.length; index++) {
                let rez = await buyContract.currentreward(nft[index]);
                rez = ethers.utils.formatUnits(rez._hex, 0);
                rez = rez / 1e18;
                showunclaim(nft[index], rez);
              }
            }
            infotoggle();
          }
      }, [wallet]);

      function showunclaim(id, value) {
        document.getElementsByClassName(`${"anttoken" + id}`)[0].innerHTML =
          value.toFixed(2);
      }

      
      const listitems = myArray.map((item) => {
        let date = item.attributes[3].value;
        date = timeConverter(date);
        return (
          <div className={`hatch-cards ${item.id} text-center m-4 p-4 shadow-lg shadow-indigo-500/50 rounded-lg`} key={item.id}>
            <h1 className="font-medium text-lg text-cyan-600"> Unmined rewards: </h1>
            <h1 className={`${"anttoken" + item.id} font-bold text-2xl text-orange-600 m-1`}>----</h1>
            <Image src={item.image} width='500px' height='500px' alt="img" className={`${"img" + item.id} rounded-lg`} />
            <h5 className={`${"id" + item.id} font-medium text-lg text-red-300`}>{item.id}</h5>
            <h1 className={`${"description" + item.id} font-medium text-lg text-cyan-300`}> {item.name}</h1>
            <h3 className={`${"hash" + item.id} font-medium text-lg text-pink-600`}>
              {" "}
              Hash Pow: {item.attributes[0].value}
            </h3>
            <h3 className={`${"attack" + item.id} font-medium text-lg text-pink-600`}>
              {" "}
              Attack Pow: {item.attributes[1].value}
            </h3>
            <h3 className={`${"date" + item.id} font-medium text-lg text-pink-600`}> Birthday: {date}</h3>
            <button
              onClick={() => startclaim(item.id)}
              className={`${"btn" + item.id} btn m-4`}
            >
              {" "}
              Mine rewards
            </button>
          </div>
        );
      });
      
  return (
    <div>
        <Mininav/>
        <div className="mx-8 flex justify-center m-7">
            <ul className="flex text-white">
                <li className="gap-3 flex text-center items-center miningbtn cursor-pointer font-semibold px-3 py-2 text-md hover:font-black">
                    <div>
                        <h1>Total Workers</h1>
                        <h2 className="workers">---</h2>
                    </div>
                    <GiAnt style={{ fill: "white" }} />
                </li>

                <li className="gap-3 flex text-center items-center miningbtn cursor-pointer font-semibold px-3 py-2 text-md hover:font-black">
                    <div>
                        <h1>Unclaimed Rewards</h1>
                        <h2 className="unclaimed">---</h2>
                    </div>
                    <GiMining style={{ fill: "white" }} />
                </li>

                <li className="gap-3 flex text-center items-center miningbtn cursor-pointer font-semibold px-3 py-2 text-md hover:font-black">
                    <div>
                        <h1>Reward Pool</h1>
                        <h2 className="pool">---</h2>
                    </div>
                    <RiCoinsFill style={{ fill: "white" }} />
                </li>

                <li className="gap-3 flex text-center items-center miningbtn cursor-pointer font-semibold px-3 py-2 text-md hover:font-black">
                    <div>
                        <h1>Claimed Rewards</h1>
                        <h2 className="claimed">---</h2>
                    </div>
                    <RiCoinsFill style={{ fill: "white" }} />
                </li>

            </ul>
        </div>
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
  )
}
