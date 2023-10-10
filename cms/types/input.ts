export interface QueryInputType {
  users: {
    name: string
    nickName: string
    image: string
  }[]
  tags: {
    id: number
    name: string
  }[]
}
