export interface IUser {
  name: string
}

export interface IComment {
  id?: string
  post_id: string
  content: string
  status?: number
  updated_at?: Date | null
  created_at?: Date
  user_id: number
  user?: IUser
}
