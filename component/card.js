"use client"
import React, { useState, useEffect } from 'react'
import { initializeConnector } from '@web3-react/core'
import { MetaMask } from '@web3-react/metamask'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { _ethers } from "ethers"
import { formatEther } from '@ethersproject/units'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const Card = ({ isActive, accounts, sValue, balance ,handleSetSValue,handleBuy ,isLoading}) => {
    const [metaMask, hooks] = initializeConnector((actions) => new MetaMask({ actions }))
    const contractChain = 11155111
    const contractAddress = '0x86c6ea21110b777c3af59199880291b602515578'

    return (
        < div className='container'>
            <div className='card'>
                <h1>My Wallet Balance</h1>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '50ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >{isActive && (
                    <TextField
                        required
                        label="Address"
                        value={accounts ? accounts[0] : ''}
                    />)}
                    {isActive && (
                        <TextField
                            required
                            label="SToken"
                            value={balance}
                        />)}
                         {isActive && (
                        <TextField
                            required
                            label="Buy Token"
                            defaultValue=""
                            type='number'
                            onChange={handleSetSValue}
                        />)}

                </Box>
                <Stack spacing={1} direction="row" sx={{
                    justifyContent: "center",
                    p:'2ch',
                    
                }}>
                    <Button variant="contained"   sx={{
                        width:'50ch'
                    }}onClick={handleBuy}   >{isLoading ?"Loading":"Buy SToken"}</Button>
                </Stack>
            </div>
        </div>
    )
}

export default Card