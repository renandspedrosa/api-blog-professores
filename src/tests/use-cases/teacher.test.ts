import { Teacher } from '@/entities/teacher.entity'
import { ITeacherRepository } from '@/repositories/teacher.repository.interface'
import { CreateTeacherUseCase } from '@/use-cases/teacher/create-teacher'

const mockTeacherRepository: jest.Mocked<ITeacherRepository> = {
  create: jest.fn(),
  getAllTeachers: jest.fn(),
  getById: jest.fn(),
  delete: jest.fn(),
}

const mockTeacher: Teacher = {
  id: 1,
  user_id: 1,
  status: 1,
  created_at: new Date(),
  updated_at: new Date(),
  subjects: [
    {
      id: '59463fc7-51c5-4a77-9ce6-c58f7777ac34',
      name: 'teste',
      status: 1,
      created_at: new Date(),
      updated_at: null,
    },
  ],
}

describe('Use Cases for the Teacher', () => {
  let createTeacherUseCase: CreateTeacherUseCase

  beforeEach(() => {
    createTeacherUseCase = new CreateTeacherUseCase(mockTeacherRepository)
  })

  it('It should create a new teacher using the repository', async () => {
    mockTeacherRepository.create.mockResolvedValue(mockTeacher)

    const newTeacher: Teacher = {
      user_id: 2,
      subjects: [
        {
          name: 'teste',
        },
      ],
    }

    const result = await createTeacherUseCase.handler(newTeacher)

    expect(mockTeacherRepository.create).toHaveBeenCalledWith(newTeacher)
    expect(result).toStrictEqual({
      ...newTeacher,
      id: expect.any(Number),
      user_id: expect.any(Number),
      status: 1,
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
      subjects: [
        {
          id: expect.any(String),
          name: expect.any(String),
          created_at: expect.any(Date),
          status: 1,
          updated_at: null,
        },
      ],
    })
  })
})
