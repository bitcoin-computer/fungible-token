import React, { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Computer from 'bitcoin-computer'
import Wallet from './Wallet'
import Login from './Login'
import MintToken from './MintToken'
import Card from './Card'
import useInterval from './useInterval'
import styled from 'styled-components'

const Flex = styled.div`
  display: flex;
`

const Footer = styled.div`
    display: flex;
   position: fixed;
   left: 0;
   bottom: 0;
   width: 100%;
   line-height: 39px;

   & > button {
      margin: 5px;
   }
`

function App() {
  const [computer, setComputer] = useState(null)
  const [objects, setObjects] = useState([])
  const [chain, setChain] = useState('BSV')

  useInterval(() => {
    // the BIP_39_KEY is set on login and we fetch it from local storage
    const password = window.localStorage.getItem('BIP_39_KEY')
    // the chain has also been stored in local storage on login, we need
    // to store the chain in the state because we pass it to Wallet
    setChain(window.localStorage.getItem('CHAIN'))

    const isLoggedIn = password && chain

    // if you are currently logging in
    if (isLoggedIn && !computer){
      setComputer(new Computer({ chain, network: 'testnet', seed: password }))
      console.log("Bitcoin Computer created on chain: " + chain)
    // if you are currently logging out
    } else if (!isLoggedIn && computer){
      console.log("You have been logged out")
      setComputer(null)
    }
  }, 3000)

  const groupByKey = (list, key) => list.reduce(
    (acc, obj) => ({
      ...acc,
      [obj[key]]: (acc[obj[key]] || []).concat(obj)
    }),
    {}
  )

  useInterval(() => {
    const refresh = async () => {
      if (computer) {
        const revs = await computer.getRevs(computer.db.wallet.getPublicKey().toString())
        setObjects(await Promise.all(revs.map(
          async rev => computer.sync(rev))
        ))
      }
    }
    refresh()
  }, 3000)

  return (
    <Router>
      <div className="App">
        <Flex>
          {Object.values(groupByKey(objects, '_rootId')).map(
            tokens => <Card tokens={tokens}></Card>
          )}
        </Flex>
      </div>

      <Footer>
        <MintToken computer={computer}></MintToken>
        <Wallet computer={computer} chain={chain}></Wallet>
        <Login ></Login>
      </Footer>
    </Router>
  )
}

export default App
