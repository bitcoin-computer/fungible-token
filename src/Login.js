import React, { useState } from 'react'
import useInterval from './useInterval'

function Login() {
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [chain, setChain] = useState('bsv')

  useInterval(() => {
    setLoggedIn(!!window.localStorage.getItem('BIP_39_KEY'))
  }, 500)

  const login = (e) => {
    e.preventDefault()
    window.localStorage.setItem('BIP_39_KEY', password)
    window.localStorage.setItem('USER_NAME', username)
  }

  return loggedIn
    ? <><button onClick={() => window.localStorage.removeItem('BIP_39_KEY')}>
        Logout
      </button><br /></>
    : <div className='login-screen'>
        <div>
          <h1>Bitcoin Computer Chat</h1><br />
          <form onSubmit={login}>
            <input placeholder='User Name (anything)' type="string" value={username} onChange={(e) => setUsername(e.target.value)} /><br />
            <input placeholder='Password (BIP39)' type="string" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
}

export default Login
