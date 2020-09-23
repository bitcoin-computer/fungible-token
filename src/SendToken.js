import React, { useState } from 'react'

function SendToken({ computer, tokens }) {
  const [amount, setAmount] = useState(0)
  const [to, setTo] = useState('')

  const send = async (e) => {
    e.preventDefault()

    const balance = tokens.reduce((acc, token) => acc + parseInt(token.coins, 10), 0)
    if(amount > balance) throw new Error('Insuficient Funds')

    tokens.sort((a, b) => (a.coins - b.coins))
    const newTokens = []
    let leftToSpend = amount
    for (const token of tokens) {
      const tokenCoins = parseInt(token.coins, 10)
      if (0 < leftToSpend && 0 < tokenCoins) {
        newTokens.push(await token.send(Math.min(leftToSpend, tokenCoins), to))
        leftToSpend -= tokenCoins
      }
    }

    console.log('Sent tokens\n', newTokens.map(token => `${token.coins} -> ${token._owners[0]}`).join('\n'))
  }

  return <>
    <form onSubmit={send}>
      Amount<br />
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} /><br />
            To<br />
      <input type="string" value={to} onChange={(e) => setTo(e.target.value)} /><br />

      <button type="submit">Send</button>
    </form></>
}

export default SendToken
