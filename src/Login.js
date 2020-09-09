import React, { useState } from 'react'
import useInterval from './useInterval'

function Login() {
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [chain, setChain] = useState('BSV')

  useInterval(() => {
    setLoggedIn(!!window.localStorage.getItem('BIP_39_KEY'))
  }, 500)

  const login = (e) => {
    e.preventDefault()
    window.localStorage.setItem('BIP_39_KEY', password)
    window.localStorage.setItem('USER_NAME', username)
    window.localStorage.setItem('CHAIN', chain)
  }

  const logout = (e) => {
    window.localStorage.removeItem('BIP_39_KEY')
    window.localStorage.removeItem('USER_NAME')
    window.localStorage.removeItem('CHAIN')
  }

  const toggleChain = (e) => {
    e.preventDefault()
    if (chain === 'BSV'){
      //set the state for the value of the chain property here
      setChain("BCH")
      //assign the chosen chain to local storage for when the computer is init'd
      window.localStorage.setItem('CHAIN', "BCH")
    } else {
      //set the state for the value of the chain property here
      setChain("BSV")
      //assign the chosen chain to local storage for when the computer is init'd
      window.localStorage.setItem('CHAIN', "BSV")
    }
  }

  return loggedIn
    ? <><button onClick={logout}>
        Logout
      </button><br /></>
    : <div className='login-screen'>
        <div id="">
          <div className="module center padding-left-24">
            <h2 className="margin-auto"> Token Wallet - By Bitcoin Computer </h2>
            {/* Use the state of this component to determine which button should be toggled */}
           <button className={chain === 'BSV' ? 'button bsv-btn' : 'button empty-button'} onClick={toggleChain} > BSV </button>
           <button className={chain === 'BCH' ? 'button bch-btn' : 'button empty-button'} onClick={toggleChain}> BCH </button>
            <form onSubmit={login}>
            <input className="textbox" placeholder='User Name (anything)' type="string" value={username} onChange={(e) => setUsername(e.target.value)} /><br />
            <input className="textbox" placeholder='Password (BIP39 Generated Seed Phrase)' type="string" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
            <button type="submit" className="button">Login</button>

          </form>
          <div> Need A Seed (Password?) <a _target="blank" href='http://accounts.protoshi.com'>Click Here</a></div>
          </div>
        </div>
      </div>
}

export default Login
