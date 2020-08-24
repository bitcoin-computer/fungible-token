class Chat {
  constructor() {
    this.messages = []
  }

  post(message) {
    this.messages.push(message)
  }

  invite(publicKey) {
    this.owners.push(publicKey)
  }
}
