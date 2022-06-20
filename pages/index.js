import launch from "../assets/launch.png";
import Image from "next/image";
import capricon from "../assets/eggs/Capricorn_egg.gif";
import Top4 from "../components/top4";
import { BsFillSafeFill } from 'react-icons/bs';
import { BsPeopleFill } from 'react-icons/bs';
import walletpic from '../assets/wallet.png'
import polygonpic from '../assets/polygon.png'
import maticpic from '../assets/matic.png'
import manttokenpic from '../assets/manttoken.png'
import blindeggpic from '../assets/blindegg.png'
import hatchpic from '../assets/hatch.png'
import ant1 from '../assets/ant1.png'
import ant2 from '../assets/ant2.png'
import ant3 from '../assets/ant3.png'
import ant4 from '../assets/ant4.png'


function Homepage() {
  return (
    <div>
      <div className="home flex my-8 items-center content-around justify-around">
        <div>
          <h3 className="text-base text-pink-600 text-lg pb-8 font-medium mt-8">
            Zodiac Powered MinerAnts
          </h3>
          <h1 className="text-2xl font-medium pb-8 text-[#f37335]">
            A multi-purpose Self Mining Zodiac Powered NFT designed for
            producing daily passive income
          </h1>
          <p className="text-lg font-bold pb-8 text-[#ccc]">
            Start mining MANT tokens 24/7 without the need to be online or have
            any mining equipments.
            <br />
            Earn high returns daily depending on your MinerAnt HashPower.
          </p>
          <button className="btn">Mint Egg</button>
        </div>
        <div>
          <Image src={launch} alt="logo" />
        </div>
      </div>

      <div className="explore items-center content-around justify-around">
        <div>
          <h2 className="text-2xl font-bold pb-8 m-5">
            BEGIN YOUR MINER ANTS NFT MINING JOURNEY
          </h2>
          <p className="text-lg font-medium m-5">
            Draw out a random Zodiac Powered MinerAnt from the dark cosmos
          </p>
          <p className="text-lg font-medium m-5">
            Hatch your Egg into a worker Miner Ant to start mining $MANT tokens
            automatically daily
          </p>
          <p className="text-lg font-medium m-5">
            Each of the 12 Zodiac Powered Miner Ants has its own unique traits
            which boosts its mining output and attack power
          </p>
        </div>
        <div className="m-5">
          <Image src={capricon} alt="logo" className="rounded-lg" />
        </div>
      </div>
      <Top4 />
      <div className=" text-white p-4 m-4">
        <h1 className="p-2 text-center text-4xl font-bold">Tokenomics</h1>
        <div className="flex justify-evenly text-center items-center p-3">
          <div className="mini-cards flex flex-col p-2 rounded-xl border-2 border-rose-500 text-lg font-medium">
            <h1>200 million</h1>
            <h1>MANT Tokens</h1>
          </div>
          <h1 className="text-1xl font-bold  text-white text-center"> $MANT is the native token of MinerAnts. A super-defaltionary and auto liquidity adding token used for MinerAnts blind box opening ,<br/>mining rewards, payment on 3rd party marketplaces connected to MinerAnts</h1>
          <div className="mini-cards flex flex-col p-2 rounded-xl border-2 border-rose-500 text-lg font-medium">
            <h1>10,000</h1>
            <h1>Miner Ants NFTS</h1>
          </div>
        </div>

        <div className="flex justify-center text-lg font-medium  text-black items-center p-3">
          <div className="text-center border border-sky-500 rounded-lg p-3 bg-amber-400 m-4">
          <BsFillSafeFill fontSize="3rem" style={{margin:"auto"}}/>
          <h1>6% Liquidity Pool</h1>
          <h2 className="text-base">6% of every buy transaction is converted into liquidity. This is automatic and helps to create a price floor (stability)</h2>
          </div>
          <div className="text-center border border-sky-500 rounded-lg p-3 bg-amber-400 m-4">
          <BsFillSafeFill fontSize="3rem" style={{margin:"auto"}}/>
          <h1>8% Liquidity Pool</h1>
          <h2 className="text-base">8% of every sell transaction is converted into liquidity. This is automatic and helps to create a price floor</h2>
          </div>
          <div className="text-center border border-sky-500 rounded-lg p-3 bg-amber-400 m-4">
          <BsPeopleFill fontSize="3rem" style={{margin:"auto"}}/>
          <h1>5% Marketing</h1>
          <h2 className="text-base">We set up a marketing wallet (5% of supply) for every buy transactions to help support our marketing outreach in the coming months</h2>
          </div>
          <div className="text-center border border-sky-500 rounded-lg p-3 bg-amber-400 m-4">
          <BsPeopleFill fontSize="3rem" style={{margin:"auto"}}/>
          <h1>7% Marketing</h1>
          <h2 className="text-base">We set up a marketing wallet (7% of supply) for every sell transactions to help support our marketing outreach in the coming months</h2>
          </div>
          <div></div>
        </div>
        <div className="flex justify-center p-3">
          <div></div>
        <button className="btn">Buy MANT tokens</button>
        <div></div>
        </div>
        
      </div>
      <br/>
      <h1 className="text-2xl font-bold text-center text-white mt-8 py-8">FEATURES</h1>
      <div className="flex p-4 m-5 text-center items-center">
        <div className="p-3 m-4 border-2 border-rose-500 rounded-lg bg-stone-800 text-white">
          <h1 className="text-xl font-bold text-rose-600">NFT automated mining</h1>
          <h2 className="text-base font-bold text-orange-400">Mine $MANT tokens with your Miner Ants NFTs</h2>
          <h3>Earn high ROI in $MANT from our automated NFT system when you get MinerAnt NFTs</h3>
        </div>
        <div className="p-3 m-4 border-2 border-rose-500 rounded-lg bg-stone-800 text-white">
        <h1 className="text-xl font-bold text-rose-600">Battle-To-Earn</h1>
          <h2 className="text-base font-bold text-orange-400">Miner Ant Mini Games</h2>
          <h3>Compete with other players in mini-games to earn $MANT tokens</h3>
        </div>
        <div className="p-3 m-4 border-2 border-rose-500 rounded-lg bg-stone-800 text-white">
        <h1 className="text-xl font-bold text-rose-600">Stake-To-Earn</h1>
          <h2 className="text-base font-bold text-orange-400">Earn high returns from Staking $MANT</h2>
          <h3>Earn up to 5,242.375% APY $MANT tokens rewards from staking $MANT tokens.</h3>
        </div>
        <div className="p-3 m-4 border-2 border-rose-500 rounded-lg bg-stone-800 text-white">
        <h1 className="text-xl font-bold text-rose-600">E-Payments</h1>
          <h2 className="text-base font-bold text-orange-400">Use $MANT to complete payments</h2>
          <h3>$MANT tokens can be used as payment tokens on 3rd party shops</h3>
        </div>
        <div className="p-3 m-4 border-2 border-rose-500 rounded-lg bg-stone-800 text-white">
        <h1 className="text-xl font-bold text-rose-600">Access to comics</h1>
          <h2 className="text-base font-bold text-orange-400">Get access to Miner Ant comics with $MANT</h2>
          <h3>Your MinerAnt NFT gets you access to MinerAnts comics . If you are lucky you can stand a chance to be a contributor in new chapters in the comics.</h3>
        </div>
      </div>

      <h1 className="text-2xl font-bold text-center text-white p-3 mt-8 py-8">GET YOUR FIRST MINER ANT EGG</h1>
      <div className="flex align-center">
        <div>
        <Image src={walletpic} alt="logo" />
        </div>
        <div>
        <Image src={polygonpic} alt="logo" />
        </div>
        <div>
        <Image src={maticpic} alt="logo" />
        </div>
        <div>
        <Image src={manttokenpic} alt="logo" />
        </div>
        <div>
        <Image src={blindeggpic} alt="logo" />
        </div>
        <div>
        <Image src={hatchpic} alt="logo" />
        </div>
      </div>

      <br/>
      <h1 className="text-2xl font-bold text-center text-white p-3 mt-8 py-8">MINER ANTS TEAM</h1>
      <div className="flex align-center">
        <div className="card">
        <Image src={ant1} alt="logo" className="rounded-2xl" />
        <div className="flex flex-col text-white">
          <h1 className="text-2xl font-bold text-center p-3">SCRIPT</h1>
          <h2 className="text-lg font-bold text-center p-3 text-red-500">Smart contract and Web Developer</h2>
        </div>
        </div>

        <div className="card">
        <Image src={ant2} alt="logo" className="rounded-2xl" />
        <div className="flex flex-col text-white">
          <h1 className="text-2xl font-bold text-center p-3">Daphs</h1>
          <h2 className="text-lg font-bold text-center p-3 text-red-500">Executive Assistant and community manager</h2>
        </div>
        </div>

        <div className="card">
        <Image src={ant3} alt="logo" className="rounded-2xl" />
        <div className="flex flex-col text-white">
          <h1 className="text-2xl font-bold text-center p-3">Bright</h1>
          <h2 className="text-lg font-bold text-center p-3 text-red-500">Operations Manager</h2>
        </div>
        </div>

        <div className="card">
        <Image src={ant3} alt="logo" className="rounded-2xl" />
        <div className="flex flex-col text-white">
          <h1 className="text-2xl font-bold text-center p-3">Maabena</h1>
          <h2 className="text-lg font-bold text-center p-3 text-red-500">Content and graphics creator</h2>
        </div>
        </div>

      </div>
    </div>
  );
}

export default Homepage;
