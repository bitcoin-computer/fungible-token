import React, { useState, useEffect } from 'react'
const KEY_NAME = 'create_bitcoin_app_key'

function Chat() {
  const [message, setMessage] = useState('')

  const send = (e) => {
    e.preventDefault()
    console.log('sending message', message)
  }

  return <div>
    <textarea rows="12" cols="60"></textarea>
    <form onSubmit={send}>
      <input type="string" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button type="submit">Send</button>
    </form>
  </div>
}

export default Chat
