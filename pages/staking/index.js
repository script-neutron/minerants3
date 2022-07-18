import { BigNumber, ethers } from 'ethers';
import { stakingContractAbi } from '/abi/stakeabi';
import { stakingAddress } from '/contractaddress/stakingaddress';
import { tokenContractAbi } from '/abi/tokenabi';
import { tokenAddress } from '/contractaddress/tokenaddress';
import Image from 'next/image';
import Mininav from '../../components/mininav';
import { useState, useEffect } from 'react';

function infotoggle() {
  const modal = document.getElementsByClassName('infomodal')[0];
  modal.classList.toggle('infoshow-modal');
}

export default function Staking() {
  const [wallet, setwallet] = useState();
  const [stakeamount, setstakeamount] = useState(0);
  const [interestrates, setinterestrates] = useState(0);
  const [totalstakes, settotalstakes] = useState(0);
  const [rewards, setrewards] = useState(0);
  const [stakewithdraw, setstakewithdraw] = useState(0);

  if (typeof window != 'undefined') {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const stakingContract = new ethers.Contract(
      stakingAddress,
      stakingContractAbi,
      provider
    );
    const tokenContract = new ethers.Contract(
      tokenAddress,
      tokenContractAbi,
      provider
    );
    const signer = provider.getSigner();
    const signerfortoken = tokenContract.connect(signer);
    const signerforstaking = stakingContract.connect(signer);
  }

  useEffect(() => {
    fetchdata();
    setInterval(fetchdata, 20000);
    async function fetchdata() {
      let account = await provider.listAccounts();
      setwallet(account[0]);
      if (wallet !== undefined) {
        let minamount = await stakingContract.minstake();
        minamount = (
          ethers.utils.formatUnits(minamount._hex, 0) / 1e18
        ).toFixed(2);
        setstakeamount(minamount);

        let mystake = await stakingContract.checkstates(wallet);
        mystake = (ethers.utils.formatUnits(mystake._hex, 0) / 1e18).toFixed(2);
        setstakewithdraw(mystake);

        let interestrates = await stakingContract.interest_rate();
        interestrates = ethers.utils.formatUnits(interestrates._hex, 0);
        console.log(interestrates);
        setinterestrates(interestrates);
        const tx = await signerforstaking.checkstakesdata();
        let amountstaked = tx.total_amount;
        amountstaked = (
          ethers.utils.formatUnits(amountstaked._hex, 0) / 1e18
        ).toFixed(2);
        let rewardsamount = tx.total_rewards;
        rewardsamount = (
          ethers.utils.formatUnits(rewardsamount._hex, 0) / 1e18
        ).toFixed(2);
        settotalstakes(amountstaked);
        setrewards(rewardsamount);
      }
    }
  }, [wallet]);

  async function stake() {
    document.getElementById('sbtn').disabled = true;
    let mystake = document.getElementsByClassName('stake')[0].value;
    mystake = BigNumber.from(mystake).mul(BigNumber.from(10).pow(18));
    document.getElementsByClassName('myinfo')[0].innerHTML =
      'Approving MANT ...';
    infotoggle();
    let tx = await signerfortoken.approve(stakingAddress, mystake);
    tx.wait(1)
      .then(async () => {
        document.getElementsByClassName('myinfo')[0].innerHTML = 'Staking ...';
        await signerforstaking._addstake(mystake);
        infotoggle();
      })
      .catch((err) => {
        document.getElementsByClassName('myinfo')[0].innerHTML =
          'Minimum MANT required for staking is 50000.00 MANT';
        infotoggle();
        console.log(err);
      });
  }

  async function Withdraw() {
    document.getElementById('wbtn').disabled = true;
    let tx = await signerforstaking.withdrawprofits(wallet);
    tx.wait(1)
      .then((rez) => {})
      .catch((err) => {
        console.log(err);
      });
  }

  async function Withdrawstakes() {
    document.getElementById('wbtn').disabled = true;
    try {
      let tx = await signerforstaking.withdrawstakes(wallet);
      tx.wait(1)
        .then((rez) => {})
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      document.getElementsByClassName('myinfo')[0].innerHTML =
        'minimum staking period isnt up';
      infotoggle();
    }
  }

  return (
    <div>
      <Mininav />
      <h1 className="font-bold text-2xl text-pink-500 text-center m-4 p-4 ">
        Minimum MANT required for staking is {stakeamount} MANT
      </h1>
      <div className="mx-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 m-4 justify-center  text-center ">
        <div className="earningbox font-medium text-lg text-white">
          <ul>
            <li>
              <h1> Total Staked</h1>
            </li>
            <li>
              <h1> {totalstakes} </h1>
            </li>
            <li>
              <h1> $MANT</h1>
            </li>
          </ul>
        </div>

        <div className="earningbox font-medium text-lg text-white">
          <ul>
            <li>
              <h1>Current Rewards</h1>
            </li>
            <li>
              <h1> {rewards} </h1>
            </li>
            <li>
              <h1> $MANT</h1>
            </li>
          </ul>
        </div>

        <div className="earningbox font-medium text-lg text-white">
          <ul>
            <li>
              <h1> Daily Capital Growth</h1>
            </li>
            <li>
              <h1> 1.095% </h1>
            </li>
          </ul>
        </div>

        <div className="earningbox font-medium text-lg text-white">
          <ul>
            <li>
              <h1> Annual Percentage Yield (APY)</h1>
            </li>
            <li>
              <h1> 5,242.375% </h1>
            </li>
            <li>
              <h1> Annual interest rate of {interestrates + '%'} </h1>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-8 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-3 m-4 justify-center  p-4 text-center">
        <div className="border-2 border-rose-500 rounded-lg p-4 m-4 text-center">
          <ul>
            <li className="font-medium text-lg text-white p-2">
              <h1>Enter Stake Amount</h1>
            </li>
            <li className="font-medium text-lg p-2">
              <input type="number" className="stake rounded-lg text-center" />{' '}
            </li>
            <li className="p-2">
              {' '}
              <button className="btn" id="sbtn" onClick={stake}>
                {' '}
                Confirm Stake
              </button>
            </li>
          </ul>
        </div>
        <div className="border-2 border-rose-500 rounded-lg p-4 m-4 text-center">
          <ul>
            <li className="font-medium text-lg text-white p-2">
              <h1>Withdraw Rewards</h1>
            </li>
            <li className="font-medium text-lg text-white p-2">
              <input
                type="number"
                className="rounded-lg text-center"
                value={rewards}
                disabled
              />{' '}
            </li>
            <li className="p-2 wbtn">
              {' '}
              <button className="btn" id="wbtn" onClick={Withdraw}>
                {' '}
                Withdraw
              </button>
            </li>
          </ul>
        </div>
        <div className="border-2 border-rose-500 rounded-lg p-4 m-4 text-center">
          <ul>
            <li className="font-medium text-lg text-white p-2">
              <h1>End Staking</h1>
            </li>
            <li className="font-medium text-lg text-white p-2">
              <input
                type="number"
                className="rounded-lg text-center"
                value={stakewithdraw}
                disabled
              />{' '}
            </li>
            <li className="p-2">
              {' '}
              <button className="btn" id="wbtn" onClick={Withdrawstakes}>
                {' '}
                Withdraw
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="infomodal absolute">
        <div className="infomodal-content">
          <span className="infoclose-button" onClick={infotoggle}>
            X
          </span>
          <h1 className="myinfo">Status</h1>
        </div>
      </div>
    </div>
  );
}
