import React from 'react'

function InviteUser({ chat }) {
  const inviteUser = async (e) => {
    try {
      e.preventDefault()
      const publicKey = prompt('Enter a public key')
      await chat.invite(publicKey)
    } catch (err) {
      console.log(err)
    }
  }
  return <div><button onClick={inviteUser}>Invite User</button></div>
}

export default InviteUser
