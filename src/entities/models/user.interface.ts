import { ITeacher } from './teacher.interface'

export interface IUser {
  id?: number
  email: string
  password: string
  name: string
  teachers?: ITeacher[]
}
