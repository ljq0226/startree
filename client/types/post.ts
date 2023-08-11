export interface PostType {
  id: number
  createdAt?: Date
  content: string
  user?: {
    name: string
    nickName: string
    image: string
  }

}
