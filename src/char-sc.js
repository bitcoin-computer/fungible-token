class Chat {
  constructor() {
    this.messages = []
  }

  post(message) {
    this.messages.push(message)
  }

  invite(publicKey) {
    this._owners.push(publicKey)
  }
}
