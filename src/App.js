import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Computer from 'bitcoin-computer'
import Wallet from './Wallet'
import SideBar from './SideBar'
import './App.css'
import useInterval from './useInterval'

function App() {
  const [computer, setComputer] = useState(null)
  const [tokens, setTokens] = useState([])
  const [amountToMint, setAmountToMint] = useState(0)
  const [amountToSend, setAmountToSend] = useState(0)
  const [to, setTo] = useState('')
  const [chain, setChain] = useState('BSV')

  useInterval(() => {
    // the BIP_39_KEY is set on login and we fetch it from local storage
    const password = window.localStorage.getItem('BIP_39_KEY')
    // the chain has also been stored in local storage on login, we need
    // to store the chain in the state because we pass it to Wallet
    setChain(window.localStorage.getItem('CHAIN'))

    const isLoggedIn = password && chain

    // if you are currently logging in
    if (isLoggedIn && !computer){
      setComputer(new Computer({ chain, network: 'testnet', seed: password }))
      console.log("Bitcoin Computer created on chain: " + chain)
    // if you are currently logging out
    } else if (!isLoggedIn && computer){
      console.log("You have been logged out")
      setComputer(null)
    }
  }, 3000)

  useInterval(() => {
    const refresh = async () => {
      if (computer) {
        const revs = await computer.getRevs(computer.db.wallet.getPublicKey().toString())
        setTokens(await Promise.all(revs.map(
          async rev => computer.sync(rev))
        ))

        setAmountToMint(tokens.reduce((acc, token) => acc + parseInt(token.coins, 10), 0))
      }
    }
    refresh()
  }, 3000)

  const send = async (e) => {
    e.preventDefault()
    const tokenToSpend = tokens.find(token => {
      console.log('token.coins', token.coins, 'amountToSend', amountToSend, token.coins >= amountToSend)
      return parseInt(token.coins, 10) >= amountToSend
    })
    console.log('tokenToSpend', tokenToSpend)
    if(tokenToSpend){
      await tokenToSpend.send(amountToSend, to)
      console.log('sent', amountToSend, 'from token with id', tokenToSpend._id)
    } else {
      alert('Insuficient funds')
    }
  }

  return (
    <Router>
      <div className="App">
        {/* bind the value of chain stored in the state to the child component */}
        <Wallet computer={computer} chain={chain}></Wallet>
        <SideBar computer={computer} tokens={tokens} ></SideBar>

        <div className="main">
          <h3>Your Balance</h3>
          {amountToMint}

          <h3>Send Token</h3>
          <form onSubmit={send}>
            Amount<br />
            <input type="number" value={amountToSend} onChange={(e) => setAmountToSend(e.target.value)} /><br />
            To<br />
            <input type="string" value={to} onChange={(e) => setTo(e.target.value)} /><br />

            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </Router>
  )
}

export default App
