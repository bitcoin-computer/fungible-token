import React, { useState, useEffect } from 'react'
import Computer from 'bitcoin-computer'
import './App.css'
import Login from './Login.js'
import Wallet from './Wallet.js'
import Chat from './Chat.js'

const KEY_NAME = 'create_bitcoin_app_key'

function App() {
  const [computer, setComputer] = useState(null)
  const [refresh, setRefresh] = useState(0)

  useEffect(() => {
    const password = window.localStorage.getItem(KEY_NAME)
    if (password !== null && !computer)
      setComputer(new Computer({ chain: 'BSV', network: 'testnet', seed: password }))
    else if(password === null && computer)
      setComputer(null)

    setTimeout(() => setRefresh(refresh + 1), 5000)
  }, [refresh, computer])

  return (
    <div className="App">
      <h1>Bitcoin Chat</h1>

      <Login></Login><br />

      <Wallet computer={computer}></Wallet><br />

      <Chat computer={computer}></Chat>
    </div>
  )
}

export default App
