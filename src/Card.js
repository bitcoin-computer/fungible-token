import React from 'react'
import SendToken from './SendToken'

function Card({ tokens, computer }) {
  const [ first ] = tokens
  const balance = tokens.reduce((acc, token) => acc + parseInt(token.coins, 10), 0)

  return <div className="card" style={{ backgroundColor: `#${first._rootId.slice(0,6)}` }}>
      <div className="container">
        <p className="alignleft"><b>{first.name}</b></p>
        <p className="alignright">{balance}</p>
        <div style={{ clear: "both" }}></div>


      <SendToken tokens={tokens} computer={computer}></SendToken>
      </div>
    </div>
}

export default Card
