import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Computer from 'bitcoin-computer'
import Wallet from './Wallet'
import Chat from './Chat'
import StartChat from './StartChat'
import './App.css'

const KEY_NAME = 'create_bitcoin_app_key'

function App() {
  const [computer, setComputer] = useState(null)
  const [refresh, setRefresh] = useState(0)
  const [myObjects, setMyObjects] = useState([])

  useEffect(() => {
    const password = window.localStorage.getItem(KEY_NAME)
    // if you are currently logging in
    if (password !== null && !computer)
      setComputer(new Computer({ chain: 'BSV', network: 'testnet', seed: password }))
    // if you are currently logging out
    else if(password === null && computer)
      setComputer(null)
  }, [refresh, computer])

  useEffect(() => {
    const refresh = async () => {
      if (computer) {
        const revs = await computer.getRevs(computer.db.wallet.getPublicKey().toString())
        setMyObjects(await Promise.all(revs.map(
          async rev => computer.sync(rev))
        ))
      }
    }
    refresh()
  }, [refresh, computer])

  useEffect(() => {
    setTimeout(() => setRefresh(refresh + 1), 5000)
  }, [refresh])

  return (
    <Router>
      <div className="App">
        <Wallet computer={computer}></Wallet><br />
        <div className="sidenav">
          <StartChat computer={computer}></StartChat><br />
          {myObjects.map(object => <small><a href={`/chat/${object._id}`}>{object._id.substr(0, 16)}</a><br /></small>)}
        </div>

        <div className="main">
          <h1>Bitcoin Chat</h1>
          <Switch>
            <Route
              path="/chat/:id"
              render={(): object => <Chat computer={computer}></Chat>}
            />

          </Switch>
      </div>
      </div>
    </Router>
  )
}

export default App
