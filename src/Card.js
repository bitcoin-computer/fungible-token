import React from 'react'
import SendToken from './SendToken'
import styled from 'styled-components'

const CardStyle = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  width: 190px;
  margin: 10px;

  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  }
`

const Container = styled.div`
  padding: 2px 16px 11px;
`

const AlignLeft = styled.p`
	float: left;
`

const AlignRight = styled.p`
	float: right;
`

function Card({ tokens, computer }) {
  const [ first ] = tokens
  const balance = tokens.reduce((acc, token) => acc + parseInt(token.coins, 10), 0)

  return <CardStyle style={{ backgroundColor: `#${first._rootId.slice(0,6)}` }}>
      <Container>
        <AlignLeft><b>{first.name}</b></AlignLeft>
        <AlignRight>{balance}</AlignRight>
        <div style={{ clear: "both" }}></div>
        <SendToken tokens={tokens} computer={computer}></SendToken>
      </Container>
    </CardStyle>
}

export default Card
