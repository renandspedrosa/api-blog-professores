import { IUser } from '@/entities/models/user.interface'
import { User } from '@/entities/user.entity'
import { IUserRepository } from '@/repositories/user.repository.interface'
import { CreateUserUseCase } from '@/use-cases/user/create-user'
import { FindUserByEmailUseCase } from '@/use-cases/user/find-user-by-email'
import { FindUserByIdUseCase } from '@/use-cases/user/find-user-by-id'
import { FindWithStudentUseCase } from '@/use-cases/user/find-with-student'
import { FindWithTeacherUseCase } from '@/use-cases/user/find-with-teacher'
import { SigninUseCase } from '@/use-cases/user/signin'
import { UpdateUserUseCase } from '@/use-cases/user/update-user'

const mockUserRepository: jest.Mocked<IUserRepository> = {
  create: jest.fn(),
  findByEmail: jest.fn(),
  findById: jest.fn(),
  findWithTeacher: jest.fn(),
  findWithStudent: jest.fn(),
  update: jest.fn(),
  updatePassword: jest.fn(),
}

const mockUser: IUser[] = [
  { id: 1, name: 'User 1', email: 'user1@example', password: '123456' },
  { id: 2, name: 'User 2', email: 'user2@example', password: '123456' },
]

const mockUserWithTeacher: User = {
  id: 3,
  email: 'teste@teacher.com',
  password: '$2a$08$zZY1Ym1ceOSED2Hal3rCS.uRwz0aox2/ReQFrFdjzBvSGe62BChC6',
  name: 'Renan',
  teachers: [
    {
      id: 1,
      user_id: 3,
      status: 1,
      created_at: new Date('2024-10-11T22:16:39.134Z'),
      updated_at: new Date('2024-10-11T22:16:39.134Z'),
    },
  ],
}

const mockUserWithStudent: User = {
  id: 4,
  email: 'teste@student.com',
  password: '$2a$08$zZY1Ym1ceOSED2Hal3rCS.uRwz0aox2/ReQFrFdjzBvSGe62BChC6',
  name: 'Renan',
  students: [
    {
      id: 1,
      user_id: 4,
      status: 1,
      created_at: new Date('2024-10-11T22:16:39.134Z'),
      updated_at: new Date('2024-10-11T22:16:39.134Z'),
    },
  ],
}

describe('Use Cases for the User', () => {
  let createUserUseCase: CreateUserUseCase
  let findByEmail: FindUserByEmailUseCase
  let findById: FindUserByIdUseCase
  let findWithTeacherUseCase: FindWithTeacherUseCase
  let findWithStudentUseCase: FindWithStudentUseCase
  let updateUserUseCase: UpdateUserUseCase
  let signinUseCase: SigninUseCase

  beforeEach(() => {
    createUserUseCase = new CreateUserUseCase(mockUserRepository)
    findByEmail = new FindUserByEmailUseCase(mockUserRepository)
    findById = new FindUserByIdUseCase(mockUserRepository)
    findWithTeacherUseCase = new FindWithTeacherUseCase(mockUserRepository)
    findWithStudentUseCase = new FindWithStudentUseCase(mockUserRepository)
    updateUserUseCase = new UpdateUserUseCase(mockUserRepository)
    signinUseCase = new SigninUseCase(mockUserRepository)
  })

  it('It should create a new user using the repository', async () => {
    const newUser: IUser = {
      id: 1,
      name: 'Test user',
      email: 'exemple@example.com',
      password: '123456',
    }
    mockUserRepository.create.mockResolvedValue(newUser)

    const result = await createUserUseCase.handler(newUser)

    expect(mockUserRepository.create).toHaveBeenCalledWith(newUser)
    expect(result).toBe(newUser)
  })

  it('It should find a user by email', async () => {
    const email = 'user1@example'
    mockUserRepository.findByEmail.mockResolvedValue(mockUser[0])
    const result = await findByEmail.handler(email)

    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(email)
    expect(result).toEqual(mockUser[0])
  })

  it('It should find a user by id', async () => {
    const id = 1
    mockUserRepository.findById.mockResolvedValue(mockUser[0])
    const result = await findById.handler(id)

    expect(mockUserRepository.findById).toHaveBeenCalledWith(id)
    expect(result).toEqual(mockUser[0])
  })

  it('should find a user with associated teacher by user id', async () => {
    const userId = 3
    mockUserRepository.findWithTeacher.mockResolvedValue(mockUserWithTeacher)

    const result = await findWithTeacherUseCase.handler(userId)

    expect(mockUserRepository.findWithTeacher).toHaveBeenCalledWith(userId)
    expect(result).toEqual(mockUserWithTeacher)
  })

  it('should find a user with associated student by user id', async () => {
    const userId = 4
    mockUserRepository.findWithStudent.mockResolvedValue(mockUserWithStudent)

    const result = await findWithStudentUseCase.handler(userId)

    expect(mockUserRepository.findWithStudent).toHaveBeenCalledWith(userId)
    expect(result).toEqual(mockUserWithStudent)
  })

  it('It should update a user using the repository', async () => {
    const updatedUser: IUser = {
      id: 1,
      name: 'Updated user',
      email: 'updated@example.com',
      password: 'newpassword123',
    }

    mockUserRepository.update.mockResolvedValue(updatedUser)

    const result = await updateUserUseCase.handler(updatedUser)

    expect(mockUserRepository.update).toHaveBeenCalledWith(updatedUser)
    expect(result).toEqual(updatedUser)
  })

  it('should return user when valid email is provided', async () => {
    const email = mockUser[0].email
    const result = await signinUseCase.handler(email)
    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(email)
    expect(result).toEqual(mockUser[0])
  })

  it('should throw an error when an invalid email is provided', async () => {
    const email = 'invalid@example.com'

    mockUserRepository.findByEmail.mockResolvedValue(undefined)

    await expect(signinUseCase.handler(email)).rejects.toThrow(
      'Credenciais inválidas',
    )

    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(email)
  })
})
