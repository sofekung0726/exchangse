"use client"
import React, { useState, useEffect } from 'react'
import { initializeConnector } from '@web3-react/core'
import { MetaMask } from '@web3-react/metamask'
import { ethers } from 'ethers'
import { parseUnits } from '@ethersproject/units'
import Navbar from '@/component/navbar'
import Card from '@/component/card'

import { _ethers } from "ethers"
import { formatEther } from '@ethersproject/units'
import abi from "./abi.json"


const [metaMask, hooks] = initializeConnector((actions) => new MetaMask({ actions }))
const { useChainId, useAccounts, useIsActivating, useIsActive, useProvider } = hooks
const contractChain = 11155111
const contractAddress = '0x86c6ea21110b777c3af59199880291b602515578'
const Page = () => {
  const chainId = useChainId()
  const accounts = useAccounts()
  const isActive = useIsActive()
  const provider = useProvider()
  const [error, setError] = useState(undefined)

  useEffect(() => {
    void metaMask.connectEagerly().catch(() => {
      console.debug('Failed to connect eagerly to metamask')
    })
  }, [])
  // useState is 0  1  1 is method to prescribed 0
  const [balance, setBalance] = useState("");
  useEffect(() => {
    const fetchBalance = async () => {
      const signer = provider.getSigner();
      const smartContract = new ethers.Contract(contractAddress, abi, signer)
      const myBalance = await smartContract.balanceOf(accounts[0]);
      console.log(formatEther(myBalance));
      setBalance(formatEther(myBalance));
    }
    if(isActive){
      fetchBalance();
    }
  },[isActive])
  
  const [sValue , setSValue ] = useState(0);
  const handleSetSValue = event => {
    setSValue(event.target.value);
  };
  const handleBuy = async () =>{
  try{
    if(sValue <= 0){
      return
    }
    const signer = provider.getSigner();
    const smartContract = new ethers.Contract(contractAddress, abi, signer)
    const buyValue = parseUnits(sValue.toString(),"ether")
    const tx = await smartContract.buy({
      value:buyValue.toString()
    });
    
  }catch(err){
    console.log(err);
  }
  }


  const handleConnect = () => {
    metaMask.activate(contractChain)
  }

  const handleDisconnect = () => {
    metaMask.resetState()
  }
  return (

    <div>
      
      <Navbar accounts={accounts} chainId={chainId} isActive={isActive} provider={provider}
        handleConnect={handleConnect} handleDisconnect={handleDisconnect} />
        
      <Card accounts={accounts} chainId={chainId} isActive={isActive} provider={provider} balance={balance} sValue ={sValue} handleBuy={handleBuy} handleSetSValue={handleSetSValue}/>
    </div>
  )
}

export default Page