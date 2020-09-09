import React from 'react'
import { Link } from 'react-router-dom'
import MintToken from './MintToken'

function SideBar({ tokens, computer }) {

  return <div className="sidebar">
    <MintToken computer={computer}></MintToken><br />

    <div className="branding">
      <small>This app runs on the</small><br />
      <small><a className="clear" href='http:/bitcoincomputer.io'>Bitcoin Computer</a></small><br />
      <small><a className="clear" href='https://github.com/bitcoin-computer/example-fungible-token'>Improve app on Github</a></small>
    </div>
  </div>
}

export default SideBar
