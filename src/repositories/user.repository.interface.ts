import { ITeacher } from '@/entities/models/teacher.interface'
import { IStudent } from '@/entities/models/student.interface'
import { IUser } from '@/entities/models/user.interface'

export interface IUserRepository {
  findWithTeacher(
    userId: number,
  ): Promise<(IUser & ITeacher) | IUser | undefined>
  findByEmail(email: string): Promise<IUser | undefined>
  findById(id: number): Promise<IUser | undefined>
  create(user: IUser): Promise<IUser>
  update(user: IUser): Promise<IUser>
  findWithStudent(
    userId: number,
  ): Promise<(IUser & IStudent) | IUser | undefined>
  updatePassword(user_id: number, password: string): Promise<void>
}
