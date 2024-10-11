import { IUser } from '@/entities/models/user.interface'
import { IUserRepository } from '@/repositories/user.repository.interface'
import { CreateUserUseCase } from '@/use-cases/user/create-user'
import { FindUserByEmailUseCase } from '@/use-cases/user/find-user-by-email'

const mockUserRepository: jest.Mocked<IUserRepository> = {
  create: jest.fn(),
  findByEmail: jest.fn(),
  findById: jest.fn(),
  findWithTeacher: jest.fn(),
  findWithStudent: jest.fn(),
  update: jest.fn(),
}

const mockUser: IUser[] = [
  { id: 1, name: 'User 1', email: 'user1@example', password: '123456' },
  { id: 2, name: 'User 2', email: 'user2@example', password: '123456' },
]

describe('Use Cases for the User', () => {
  let createUserUseCase: CreateUserUseCase
  let findByEmail: FindUserByEmailUseCase

  beforeEach(() => {
    createUserUseCase = new CreateUserUseCase(mockUserRepository)
    findByEmail = new FindUserByEmailUseCase(mockUserRepository)
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
})
