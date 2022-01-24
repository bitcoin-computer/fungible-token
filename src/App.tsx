import React, { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Computer } from 'bitcoin-computer-lib'
import Wallet from './Wallet'
import Login from './Login'
import MintToken from './MintToken'
import Card from './Card'
import useInterval from './useInterval'
import styled from 'styled-components'
import { TokenType } from './types'

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
  const [computer, setComputer] = useState<typeof Computer>(null)
  const [objects, setObjects] = useState<TokenType[]>([])
  const [chain, setChain] = useState('LTC')

  useInterval(() => {
    // BIP_39_KEY & CHAIN is set on login and we fetch it from local storage
    const password = window.localStorage.getItem('BIP_39_KEY')
    setChain(window.localStorage.getItem('CHAIN') || '')

    const isLoggedIn = password && chain
    // if you are currently logging in
    if (isLoggedIn && !computer) {
      setComputer(new Computer({ seed: password }))
      console.log('Bitcoin Computer created on ' + chain)
      // if you are currently logging out
    } else if (!isLoggedIn && computer) {
      console.log('You have been logged out')
      setComputer(null)
    }
  }, 3000)

  useInterval(() => {
    const refresh = async () => {
      if (computer !== null) {
        const revs = await computer.getRevs(
          computer.db.wallet.getPublicKey().toString()
        )
        setObjects(
          await Promise.all(revs.map(async (rev: string) => computer.sync(rev)))
        )
      }
    }
    refresh()
  }, 3000)

  // todo: refactor this function
  const groupByRoot = (list: TokenType[]) =>
    list.reduce(
      (acc, obj) => ({
        ...acc,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
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
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          <Card key={tokens[0]._id} tokens={tokens}></Card>
        ))}
      </Flex>
    </Router>
  )
}

export default App
