import React, { useState, useEffect } from 'react'

function Wallet({ computer }) {
  const [balance, setBalance] = useState(0)
  const [refresh, setRefresh] = useState(0)

  useEffect(() => {
    const getBalance = async () => {
      if(computer) {
        setBalance(await computer.db.wallet.getBalance())
      }
      setTimeout(() => setRefresh(refresh + 1), 5000)
    }
    getBalance()
  }, [refresh, computer])

  return (
    <div>
      <b>Address</b> {computer ? computer.db.wallet.getAddress().toString() : ''}<br />
      <b>Public Key</b> {computer ? computer.db.wallet.getPublicKey().toString() : ''}<br />
      <b>Balance</b> {balance/1e8} BSV
    </div>
  )
}

export default Wallet
