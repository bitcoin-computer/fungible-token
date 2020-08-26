import React from 'react'
import { useHistory } from 'react-router-dom'
import ChatSc from './chat-sc'

function StartChat({ computer }) {
  const history = useHistory()

  const createChat = async (e) => {
    try {
      e.preventDefault()
      const chat = await computer.new(ChatSc, [])
      history.push(`/chat/${chat._id}`)
      console.log('created chat with id', chat._id)
    } catch (err) {
      console.log(err)
    }

  }
  return <div><button onClick={createChat}>Create Chat</button><br /><br /></div>
}

export default StartChat
