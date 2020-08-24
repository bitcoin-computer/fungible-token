import React, { useState } from 'react'
import ChatSc from './chat-sc'

function Chat({ computer }) {
  const [message, setMessage] = useState('')

  const send = (e) => {
    e.preventDefault()
    console.log('sending message', message)
  }

  const createChat = async (e) => {
    try {
      e.preventDefault()
      const chat = await computer.new(ChatSc, [])
      console.log('created chat with id', chat._id)
    } catch (err) {
      console.log(err)
    }
  }

  return <div>
    <button onClick={createChat}>Create Chat</button><br /><br />
    <textarea rows="12" cols="60"></textarea>
    <form onSubmit={send}>
      <input type="string" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button type="submit">Send</button>
    </form>
  </div>
}

export default Chat
