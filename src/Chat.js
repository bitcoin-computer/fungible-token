import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import ChatSc from './chat-sc'
import './App.css'

function Chat({ computer }) {
  const [message, setMessage] = useState('')
  const history = useHistory()

  const send = (e) => {
    e.preventDefault()
    console.log('sending message', message)
  }

  return <div>
    <h1>Chat</h1>
    <textarea rows="12" cols="60"></textarea>
    <form onSubmit={send}>
      <input type="string" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button type="submit">Send</button>
    </form>
  </div>
}

export default Chat
