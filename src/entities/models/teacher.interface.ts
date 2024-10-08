import { ISubject } from './subject.interface'

export interface ITeacher {
  id?: number
  user_id?: number
  status?: number
  created_at?: Date
  updated_at?: Date | null
  subjects?: ISubject[]
}
