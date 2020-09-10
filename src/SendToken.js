import React, { useState } from 'react'

function SendToken({ computer, tokens }) {
  const [amountToSend, setAmountToSend] = useState(0)
  const [to, setTo] = useState('')

  const send = async (e) => {
    e.preventDefault()
    const tokenToSpend = tokens.find(token => {
      console.log('token.coins', token.coins, 'amountToSend', amountToSend, token.coins >= amountToSend)
      return parseInt(token.coins, 10) >= amountToSend
    })
    console.log('tokenToSpend', tokenToSpend)
    if (tokenToSpend) {
      await tokenToSpend.send(amountToSend, to)
      console.log('sent', amountToSend, 'from token with id', tokenToSpend._id)
    } else {
      alert('Insuficient funds')
    }
  }

  return <><h3>Send Token</h3>
    <form onSubmit={send}>
      Amount<br />
      <input type="number" value={amountToSend} onChange={(e) => setAmountToSend(e.target.value)} /><br />
            To<br />
      <input type="string" value={to} onChange={(e) => setTo(e.target.value)} /><br />

      <button type="submit">Send</button>
    </form></>
}

export default SendToken
