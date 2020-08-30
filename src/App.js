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

  useInterval(() => {
    const password = window.localStorage.getItem('BIP_39_KEY')
      // if you are currently logging in
      if (password !== null && !computer){
        setComputer(new Computer({ chain: 'BSV', network: 'testnet', seed: password }))
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
        <Wallet computer={computer}></Wallet>
        <SideBar computer={computer} chats={chats}></SideBar>

        <div className="main">
          <Switch>
            <Route path="/chat/:id" render={(): object => <Chat computer={computer}></Chat>} />
          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default App
