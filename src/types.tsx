export type TokenType = {
  coins: string
  name: string
  send: (amount: number, to: string) => TokenType
  _id: string
  _rev: string
  _rootId: string
  _owners: string[]
  _amount: string[]
}
