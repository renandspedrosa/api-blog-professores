import { ITeacher } from '@/entities/models/teacher.interface'
import { IUser } from '@/entities/models/user.interface'
import { Repository } from 'typeorm'
import { appDataSource } from '@/lib/typeorm/typeorm'
import { User } from '@/entities/user.entity'
import { IUserRepository } from '@/repositories/user.repository.interface'
import { IStudent } from '@/entities/models/student.interface'

export class UserRepository implements IUserRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = appDataSource.getRepository(User)
  }

  async findByEmail(email: string): Promise<IUser | undefined> {
    const user = await this.repository.findOne({
      where: { email },
    })
    return user ?? undefined
  }

  async findById(id: number): Promise<IUser | undefined> {
    const user = await this.repository.findOne({
      where: { id },
    })
    return user ?? undefined
  }

  async create(user: IUser): Promise<IUser> {
    return this.repository.save(user)
  }

  async update(userData: IUser): Promise<IUser> {
    const user = this.repository.create(userData)
    return this.repository.save(user)
  }

  async findWithTeacher(
    userId: number,
  ): Promise<(IUser & ITeacher) | IUser | undefined> {
    const userWithTeacher = await this.repository
      .createQueryBuilder('user')
      .leftJoinAndSelect(
        'user.teachers',
        'teacher',
        'teacher.status = :status',
        {
          status: 1,
        },
      )
      .where('user.id = :userId', { userId })
      .getOne()

    if (!userWithTeacher) {
      return undefined
    }
    return userWithTeacher
  }

  async findWithStudent(
    userId: number,
  ): Promise<(IUser & IStudent) | IUser | undefined> {
    const userWithStudent = await this.repository
      .createQueryBuilder('user')
      .leftJoinAndSelect(
        'user.students',
        'student',
        'student.status = :status',
        {
          status: 1,
        },
      )
      .where('user.id = :userId', { userId })
      .getOne()

    if (!userWithStudent) {
      return undefined
    }
    return userWithStudent
  }

  async updatePassword(user_id: number, password: string): Promise<void> {
    await this.repository.update(user_id, { password })
  }
}
