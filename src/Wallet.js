import React, { useState, useEffect } from 'react'
import Login from './Login'

function Wallet({ computer }) {
  const [balance, setBalance] = useState(0)
  const [refresh, setRefresh] = useState(0)

  useEffect(() => {
    const getBalance = async () => {
      if(computer)
        setBalance(await computer.db.wallet.getBalance())
    }
    getBalance()
  }, [refresh, computer])

  useEffect(() => {
    setTimeout(() => setRefresh(refresh + 1), 5000)
  }, [refresh])

  return <div className='flex'>
    <small><b>Public Key</b> {computer ? computer.db.wallet.getPublicKey().toString() : ''}<br /></small>
    <small><b>Balance</b> {balance / 1e8} BSV</small>
    <small><b>Address</b> {computer ? computer.db.wallet.getAddress().toString() : ''}<br /></small>
    <small><Login></Login></small>
    </div>
}

export default Wallet
