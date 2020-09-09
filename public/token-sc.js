class Token {
  constructor(to, supply, name) {
    this.coins = supply
    this._owners = [to]
    this.name = name
  }

  send(amount, to) {
    if (this.coins < amount) throw new Error()
    this.coins -= amount
    return new Coin(amount, to)
  }
}
