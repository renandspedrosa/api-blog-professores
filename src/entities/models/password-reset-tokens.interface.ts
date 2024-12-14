import { IUser } from './user.interface'

export interface IPasswordResetToken {
  id?: number
  user_id: number
  user?: IUser
  token: string
  expires_at: Date
  created_at?: Date
}
