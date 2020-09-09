import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Utils from './utils'

function MintToken({ computer }) {
  const [supply, setSupply] = useState(0)
  const [name, setName] = useState('')
  const history = useHistory()

  const mintToken = async (e) => {
    try {
      e.preventDefault()
      const publicKey = computer.db.wallet.getPublicKey().toString()
      const TokenSc= await Utils.importFromPublic('/token-sc.js')
      const token = await computer.new(TokenSc, [publicKey, supply, name])
      console.log('Created token with id', token._id)
    } catch (err) {
      if(err.message.startsWith('Insufficient balance in address'))
        alert('You have to fund your wallet https://faucet.bitcoincloud.net/')
    }

  }
  return <form onSubmit={mintToken}>
    <small>Token Supply</small><br />
    <input type="string" value={supply} onChange={(e) => setSupply(e.target.value)} />
    <small>Token Name</small><br />
    <input type="string" value={name} onChange={(e) => setName(e.target.value)} />
    <button type="submit">Mint Token</button>
  </form>}

export default MintToken
