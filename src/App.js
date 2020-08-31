import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Computer from 'bitcoin-computer'
import Wallet from './Wallet'
import Chat from './Chat'
import SideBar from './SideBar'
import './App.css'
import useInterval from './useInterval'

function App() {
  const [computer, setComputer] = useState(null)
  const [chats, setChats] = useState([])
  const [chain, setChain] = useState('BSV')

  useInterval(() => {
    const password = window.localStorage.getItem('BIP_39_KEY')
    // if you are currently logging in
    if (password !== null && !computer){
      //clicking one of the toggle buttons on login will set this value 
      let _chain = window.localStorage.getItem('CHAIN')
      //if chain doesnt exist in storage, set it to BSV 
      if(_chain === undefined){
        _chain = chain
        //otherwise set the current state value to the value we pulled from local storage 
      } else (setChain(_chain))
      console.log('chain from local staorage on app:' + _chain)
      setComputer(new Computer({ chain: _chain, network: 'testnet', seed: password }))
      console.log("Bitcoin Computer created on chain: " + _chain)
    // if you are currently logging out
    } else if (password === null && computer){
      setComputer(null)
    }
  }, 3000)

  useInterval(() => {
    const refresh = async () => {
      if (computer) {
        const revs = await computer.getRevs(computer.db.wallet.getPublicKey().toString())
        setChats(await Promise.all(revs.map(
          async rev => computer.sync(rev))
        ))
      }
    }
    refresh()
  }, 3000)

  return (
    <Router>
      <div className="App">
        {/* bind the value of chain stored in the state to the child component */}
        <Wallet computer={computer} chain={chain}></Wallet>
        <SideBar computer={computer} chats={chats} ></SideBar>

        <div className="main">
          <Switch>
            <Route path="/chat/:id" render={() => <Chat computer={computer}></Chat>} />
          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default App
