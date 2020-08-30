import React, { useState } from 'react'
import useInterval from './useInterval'

const KEY_NAME = 'create_bitcoin_app_key'
const USER_NAME = 'create_bitcoin_app_user'

function Login() {
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)

  useInterval(() => {
    setLoggedIn(!!window.localStorage.getItem(KEY_NAME))
  }, 3000)

  const login = (e) => {
    e.preventDefault()
    window.localStorage.setItem(KEY_NAME, password)
    window.localStorage.setItem(USER_NAME, username)
  }

  return loggedIn
    ? <><button onClick={() => window.localStorage.removeItem(KEY_NAME)}>
        Logout
      </button><br /></>
    : <div className='login-screen'>
        <div>
          <h1>Bitcoin Computer Chat</h1><br />
          <form onSubmit={login}>
            <input placeholder='User Name' type="string" value={username} onChange={(e) => setUsername(e.target.value)} /><br />
            <input placeholder='Password' type="string" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
}

export default Login
