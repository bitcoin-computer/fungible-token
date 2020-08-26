import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './App.css'

function Chat({ computer }) {
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState({ messages: [] })
  const [refresh, setRefresh] = useState(null)

  const { id } = useParams()

  useEffect(() => {
    const refreshChat = async () => {
      if(computer) {
        const rev = await computer.getLatestRev(id)
        setChat(await computer.sync(rev))
      }
    }
    refreshChat()

    setTimeout(() => setRefresh(refresh + 1), 5000)
  }, [id, computer, refresh])

  const send = async (e) => {
    e.preventDefault()
    await chat.post(message)
    setMessage('')
  }

  return <div>
    <h1>Chat</h1>
    <textarea rows="12" cols="60" value={chat.messages.join('\n')}></textarea>
    <form onSubmit={send}>
      <input type="string" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button type="submit">Send</button>
    </form>
  </div>
}

export default Chat
