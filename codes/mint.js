import { ethers } from "ethers";
import {buyContractAbi} from "../abi/buyabi"
import {tokenContractAbi} from "../abi/tokenabi"
import {tokenAddress} from "../contractaddress/tokenaddress"
import {buyAddress} from "../contractaddress/buyaddress"

function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    return time;
  }

  async function checkconnection() {
     const provider = new ethers.providers.Web3Provider(window.ethereum)
    provider.listAccounts().then((accounts) =>{
        if(accounts[0] === undefined){
            document.getElementsByClassName('myinfo')[0].innerHTML ='Please refresh page and connect wallet'
            infotoggle()
            setTimeout(()=>{window.location.reload()},500)   
        }else{
            autorizetoken(accounts[0]);
        }
    }).catch((err)=>console.log(err))
  
}

function infotoggle() {
    const modal = document.getElementsByClassName("infomodal")[0];
    modal.classList.toggle("infoshow-modal");
}

async function autorizetoken(wallet){
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    infotoggle()
    const signer = provider.getSigner()
    const tokenContract = new ethers.Contract(tokenAddress , tokenContractAbi, provider)
    const signerfortoken = tokenContract.connect(signer);
    const buyContract = new ethers.Contract(buyAddress , buyContractAbi , provider)
    const signerforbuy = buyContract.connect(signer)
    let amount =  await buyContract.Mintprice();
    amount = ethers.utils.formatUnits(amount._hex,0)
    console.log(amount);
    try {
        let tx = await signerfortoken.approve(buyAddress , amount)
        tx.wait(1).then( async ()=>{
             try {
                 document.getElementsByClassName('myinfo')[0].innerHTML = 'Minting Egg ....'
                 let buytz = await signerforbuy.buyant()
                 buytz.wait(1).then(async() =>{
                     buyContract.once("mintedegg" , async (_id, event) =>{
                         let id = ethers.utils.formatUnits(_id._hex,0);
                         buyContract.getURI(id).then((uri) =>{
                             let decoded= JSON.parse(atob(uri.replace(/^data:\w+\/\w+;base64,/, '')));
                             let date = decoded.attributes[2].value;
                             date = timeConverter(date);
                             document.getElementsByClassName('birthday')[0].innerHTML = date;
                             document.getElementsByClassName('eggimage')[0].srcset =  decoded.image;
                             document.getElementsByClassName('id')[0].innerHTML = decoded.id;
                             console.log(decoded);
                             document.getElementsByClassName('myinfo')[0].innerHTML = 'Egg minted...'
                             infotoggle()
                         }).catch((err)=> {
                             document.getElementsByClassName('myinfo')[0].innerHTML = 'Minting Egg failed...'
                             console.log(err)
                             
                         })  
                     })
     
                 }).catch((err)=>{
                     console.log(err)
                     document.getElementsByClassName('myinfo')[0].innerHTML = 'Minting Egg failed...'
                 })
                 
             } catch (error) {
                 console.log(error);
                 document.getElementsByClassName('myinfo')[0].innerHTML = 'Minting Egg failed...'
                 
             } 
        })
    } catch (error) {
        window.location.reload();
    }
    
}

export default async function mintegg() {
	try {
		checkconnection();
		
	} catch (error) {
		document.getElementsByClassName('myinfo')[0].innerHTML = 'Minting Egg failed...'
		console.log(error);
	}
    
}