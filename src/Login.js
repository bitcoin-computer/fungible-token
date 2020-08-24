import React, { useState, useEffect } from 'react'
const KEY_NAME = 'create_bitcoin_app_key'

function Login() {
  const [password, setPassword] = useState('')
  const [refresh, setRefresh] = useState(0)
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    const password = window.localStorage.getItem(KEY_NAME)
    setLoggedIn(password !== null)

    setTimeout(() => setRefresh(refresh + 1), 5000)
  }, [refresh])

  const login = (e) => {
    e.preventDefault()
    window.localStorage.setItem(KEY_NAME, password)
  }

  return loggedIn
    ? <div>
        <button onClick={() => window.localStorage.removeItem(KEY_NAME)}>
          Logout
        </button><br />
      </div>
    : <form onSubmit={login}>
        Password
        <br />
        <input type="string" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
}

export default Login
