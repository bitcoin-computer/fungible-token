import React, { useState } from 'react'
import useInterval from './useInterval'

function Wallet({ computer, chain}) {
  const [balance, setBalance] = useState(0)
  const [isVisible, setVisible] = useState(false)

  useInterval(() => {
    const getBalance = async () => {
      if(computer) setBalance(await computer.db.wallet.getBalance())
    }
    getBalance()
  }, 3000)

  return <>
    <button onClick={() => setVisible(true)}>Wallet</button>
    {
      isVisible && <div id="myModal" class="modal">
        <div class="modal-content">
          <span class="close" onClick={() => setVisible(false)}>&times;</span>
          <h1>Wallet</h1>
          <b>Balance</b><br /> {balance / 1e8} {chain}<br />
          <b>Address</b><br /> {computer ? computer.db.wallet.getAddress().toString() : ''}<br />
          <b>Public Key</b><br /> {computer ? computer.db.wallet.getPublicKey().toString() : ''}
        </div>
      </div>
    }
  </>
}

export default Wallet
