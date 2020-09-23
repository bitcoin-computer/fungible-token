import React, { useState } from 'react'
import useInterval from './useInterval'
import styled from 'styled-components'

const LoginScreen = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;

  input {
    width: 400px;
    margin: 5px 0;
  }

  button {
    width: 100px;
    margin: 5px 0;
  }
`

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
      </button></>
    : <LoginScreen>
        <div id="">
          <div className="module center padding-left-24">
            <h2 className="margin-auto">Bitcoin Token Wallet</h2>
            <form onSubmit={login}>
            <select value={chain} onChange={(e) => { setChain(e.target.value) }} id="chain">
              <option value="BSV">BSV</option>
              <option value="BCH">BCH</option>
            </select><br />
            <input className="textbox" placeholder='User Name (anything)' type="string" value={username} onChange={(e) => setUsername(e.target.value)} /><br />
            <input className="textbox" placeholder='Password (BIP39 Generated Seed Phrase)' type="string" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
            <a target="_blank" rel="noopener noreferrer" href='https://iancoleman.io/bip39/'>Generate BIP39 Seed Phrase</a><br />
            <button type="submit" className="button">Login</button>
          </form>
          </div>
        </div>
    </LoginScreen>
}

export default Login
