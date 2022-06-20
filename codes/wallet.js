import  { useState, useEffect } from 'react'
import { ethers } from 'ethers'



export default async function metamaskwallet(){
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!')
        let wallet = await provider.send('eth_requestAccounts', [])
        return wallet[0]
      } else {
        console.log('install wallet')
      }
}

