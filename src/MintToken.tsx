import React, { useState } from 'react'
import Utils from './utils'
import { Modal, ModalContent, Close } from './Modal'
import styled from 'styled-components'
import type { Computer } from 'bitcoin-computer'
import PropTypes from 'prop-types'

const Button = styled.button`
  color: black;
  font-size: 20px;
  padding: 20px 60px;
  cursor: pointer;
`


const Input = styled.input`
  width: 590px;
`

export interface IMintTokenProps {
  computer: typeof Computer
}

const MintToken: React.FC<IMintTokenProps> = ({ computer }) => {
  const [supply, setSupply] = useState(0)
  const [name, setName] = useState('')
  const [isVisible, setVisible] = useState(false)
 
  const mintToken = async (e: React.SyntheticEvent) => {
    try {
      e.preventDefault()
      const publicKey = computer.db.wallet.getPublicKey().toString()
      const TokenSc = await Utils.importFromPublic('/token-sc.js')
      const token = await computer.new(TokenSc, [publicKey, supply, name])
      setVisible(false)
      console.log(
        `Minted ${token.name} with supply ${supply} and id ${token._id}`
      )
    } catch (err: any) {
      if (err.message.startsWith('Insufficient balance in address'))
        alert(
          `You need testnet coins to mint a token. To get free testnet coins open the your wallet. If you have just made a deposit you might have to reload the browser.`
        )
    }
  }

  const clicked = () => {
    setVisible(true)
    if (computer.db.wallet.getBalance() === 0){
      alert('Wallet has zero balance, please fund the wallet first.')
    }
  }

  return (
    <>
    <Button onClick={() => clicked()}>Mint</Button>
    {isVisible && (
        <Modal>
          <ModalContent>
            <Close onClick={() => setVisible(false)}>&times;</Close>
            <h1>Mint</h1>
            <form onSubmit={mintToken}>
              <b>Supply</b>
              <br />
              <Input
                type="number"
                value={supply}
                onChange={(e) => setSupply(parseInt(e.target.value))}
              />
              <br />
              <br />
              <b>Name</b>
              <br />
              <Input
                type="string"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <br />
              <br />
              <button type="submit">Mint</button>
            </form>
          </ModalContent>
        </Modal>
      )}
    </>
  )
}

MintToken.propTypes = {
  computer: PropTypes.object,
}

export default MintToken
