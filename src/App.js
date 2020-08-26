import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Computer from 'bitcoin-computer'
import Login from './Login'
import Wallet from './Wallet'
import Chat from './Chat'
import StartChat from './StartChat'
import './App.css'

const KEY_NAME = 'create_bitcoin_app_key'

function App() {
  const [computer, setComputer] = useState(null)
  const [refresh, setRefresh] = useState(0)

  useEffect(() => {
    const password = window.localStorage.getItem(KEY_NAME)
    // if you are currently logging in
    if (password !== null && !computer)
      setComputer(new Computer({ chain: 'BSV', network: 'testnet', seed: password }))
    // if you are currently logging out
    else if(password === null && computer)
      setComputer(null)

    setTimeout(() => setRefresh(refresh + 1), 5000)
  }, [refresh, computer])

  return (
    <Router>
      <div className="App">
        <a href='/'>home</a>
        <h1>Bitcoin Chat</h1>
        <Login></Login><br />
        <Wallet computer={computer}></Wallet><br />
        <StartChat computer={computer}></StartChat>
        <Switch>
          <Route
            path="/chat/:id"
            render={(): object => <Chat computer={computer}></Chat>}
          />

        </Switch>
      </div>
    </Router>
  )
}

export default App
