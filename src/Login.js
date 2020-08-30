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

  return loggedIn
    ? <><button onClick={logout}>
        Logout
      </button><br /></>
    : <div className='login-screen'>
        <div>
          <h1>Bitcoin Computer Chat</h1><br />
          <form onSubmit={login}>
            <select value={chain} id="chain">
              <option value="BSV">BSV</option>
              <option value="BCH">BCH</option>
            </select><br />
            <input placeholder='User Name (anything)' type="string" value={username} onChange={(e) => setUsername(e.target.value)} /><br />
            <input placeholder='Password (BIP39)' type="string" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
}

export default Login
