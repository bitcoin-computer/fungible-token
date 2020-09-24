import React, { useState } from 'react'
import useInterval from './useInterval'
import { Modal, ModalContent, Close } from './Modal'

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
      isVisible && <Modal>
        <ModalContent>
          <Close onClick={() => setVisible(false)}>&times;</Close>
          <h1>Wallet</h1>
          {balance === 0 && <p>Copy your address into a <a target="_blank" rel="noopener noreferrer" href='http://faucet.bitcoincloud.net'>BSV Faucet</a> or a <a target="_blank" rel="noopener noreferrer" href='http://faucet.fullstack.cash'>BCH Faucet</a> to fund your wallet.</p>}

          <b>Balance</b><br /> {balance / 1e8} {chain}<br /><br />
          <b>Address</b><br /> {computer ? computer.db.wallet.getAddress().toString() : ''}<br /><br />
          <b>Public Key</b><br /> {computer ? computer.db.wallet.getPublicKey().toString() : ''}
        </ModalContent>
      </Modal>
    }
  </>
}

export default Wallet
