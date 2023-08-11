export interface PostType {
  userName: string
  id: number
  createdAt?: Date
  content: string
  User?: {
    name: string
    nickName: string
    image: string
  }
}
