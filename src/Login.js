import React, { useState, useEffect } from 'react'

function Login({}) {
  const [password, setPassword] = useState('')
  const [refresh, setRefresh] = useState(0)
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    setLoggedIn(window.localStorage.getItem('cba_key') !== null)
  }, [refresh])

  useEffect(() => {
    setTimeout(() => setRefresh(refresh + 1), 5000)
  }, [refresh])

  const login = (e) => {
    e.preventDefault()
    window.localStorage.setItem('cba_key', password)
    console.log('logging in with pdw', password)
  }

  return loggedIn
    ? <button onClick={() => window.localStorage.removeItem('cba_key')}>
        Logout
      </button>
    : <form onSubmit={login}>
        Password
        <br />
        <input type="string" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
}

export default Login
