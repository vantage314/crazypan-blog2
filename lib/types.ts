export interface Post {
  title: string
  slug: string
  description: string
  content?: string
  tags: string[]
  date: string
  views: number
  likes: number
  category?: string
}

export interface Comment {
  id: number
  name: string
  content: string
  time: string
  avatar?: string
}

export interface User {
  username: string
  password: string
}
