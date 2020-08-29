import React, { useState, useEffect } from 'react'
const KEY_NAME = 'create_bitcoin_app_key'

function Login() {
  const [password, setPassword] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    setInterval(() =>
      setLoggedIn(!!window.localStorage.getItem(KEY_NAME)),
      2000
    )
  }, [])

  const login = (e) => {
    e.preventDefault()
    window.localStorage.setItem(KEY_NAME, password)
  }

  return loggedIn
    ? <><button onClick={() => window.localStorage.removeItem(KEY_NAME)}>
        Logout
      </button><br /></>
    : <form onSubmit={login}>
        <input placeholder='Password' type="string" value={password} onChange={(e) => setPassword(e.target.value)} />
        &nbsp;<button type="submit">Login</button>
      </form>
}

export default Login
