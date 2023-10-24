"use client"
import React ,{useState , useEffect}from 'react'
import { initializeConnector } from '@web3-react/core'
import { MetaMask } from '@web3-react/metamask'
import { ethers } from 'ethers'
import { formatEther,parseUnits } from '@ethersproject/units'
import Navbar from '@/component/navbar'
const [metaMask , hooks] = initializeConnector((actions)=> new MetaMask({actions}))
const {useChainId , useAccounts, useIsActivating,useIsActive,useProvider} = hooks
const contractChain = 11155111
const contractAddress = '0x86c6ea21110b777c3af59199880291b602515578'
const page = () => {
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
const handleConnect = () => {
  metaMask.activate(contractChain)
}

const handleDisconnect = () => {
  metaMask.resetState()
}
  return (
    
    <div>
      <Navbar accounts = {accounts} chainId = {chainId} isActive = {isActive} provider = {provider}
       handleConnect={handleConnect} handleDisconnect={handleDisconnect}/>
      < div className='container'>
    <div className='card'>
      <p>chainId: { chainId }</p>
      <p>isActive: { isActive.toString() }</p>
      <p>accounts: { accounts ? accounts[0] :''}</p>
     
      </div>
      </div>
    </div>
  )}

export default page