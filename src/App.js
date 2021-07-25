import React, { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Computer } from 'bitcoin-computer'
import Wallet from './Wallet'
import Login from './Login'
import MintToken from './MintToken'
import Card from './Card'
import useInterval from './useInterval'
import styled from 'styled-components'

const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 5px;

  & > button {
    margin: 5px;
  }
`

const App: React.FC = () => {
  const [computer, setComputer] = useState(null)
  const [objects, setObjects] = useState([])
  const [chain, setChain] = useState('BSV')

  useInterval(() => {
    // BIP_39_KEY & CHAIN is set on login and we fetch it from local storage
    const password = window.localStorage.getItem('BIP_39_KEY')
    setChain(window.localStorage.getItem('CHAIN'))

    const isLoggedIn = password && chain
    // if you are currently logging in
    if (isLoggedIn && !computer) {
      setComputer(new Computer({ chain, network: 'testnet', seed: password }))
      console.log('Bitcoin Computer created on ' + chain)
      // if you are currently logging out
    } else if (!isLoggedIn && computer) {
      console.log('You have been logged out')
      setComputer(null)
    }
  }, 3000)

  useInterval(() => {
    const refresh = async () => {
      if (computer) {
        const revs = await computer.getRevs(
          computer.db.wallet.getPublicKey().toString()
        )
        setObjects(
          await Promise.all(revs.map(async (rev) => computer.sync(rev)))
        )
      }
    }
    refresh()
  }, 3000)

  const groupByRoot = (list) =>
    list.reduce(
      (acc, obj) => ({
        ...acc,
        [obj['_rootId']]: (acc[obj['_rootId']] || []).concat(obj),
      }),
      {}
    )

  return (
    <Router>
      <Header>
        <MintToken computer={computer}></MintToken>
        <Wallet computer={computer} chain={chain}></Wallet>
        <Login></Login>
      </Header>
      <Flex>
        {Object.values(groupByRoot(objects)).map((tokens) => (
          <Card key={tokens[0]._id} tokens={tokens}></Card>
        )) || 'hi'}
      </Flex>
    </Router>
  )
}

export default App
