import { Teacher } from '@/entities/teacher.entity'
import { ITeacherRepository } from '@/repositories/teacher.repository.interface'
import { CreateTeacherUseCase } from '@/use-cases/teacher/create-teacher'
import { DeleteTeacherUseCase } from '@/use-cases/teacher/delete-teacher'
import { GetAllTeachersUseCase } from '@/use-cases/teacher/get-all-teachers'
import { FindTeacherByIdUseCase } from '@/use-cases/teacher/find-teacher-by-id'

const mockTeacherRepository: jest.Mocked<ITeacherRepository> = {
  create: jest.fn(),
  delete: jest.fn(),
  getAllTeachers: jest.fn(),
  getById: jest.fn(),
}

const mockTeachers: Teacher[] = [
  {
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
  },
  {
    id: 2,
    user_id: 2,
    status: 1,
    created_at: new Date(),
    updated_at: new Date(),
    subjects: [],
  },
]

describe('Use Cases for the Teacher', () => {
  let createTeacherUseCase: CreateTeacherUseCase
  let deleteTeacherUseCase: DeleteTeacherUseCase
  let getAllTeachersUseCase: GetAllTeachersUseCase
  let findTeacherByIdUseCase: FindTeacherByIdUseCase

  beforeEach(() => {
    createTeacherUseCase = new CreateTeacherUseCase(mockTeacherRepository)
    deleteTeacherUseCase = new DeleteTeacherUseCase(mockTeacherRepository)
    getAllTeachersUseCase = new GetAllTeachersUseCase(mockTeacherRepository)
    findTeacherByIdUseCase = new FindTeacherByIdUseCase(mockTeacherRepository)
  })

  it('It should create a new teacher using the repository', async () => {
    const newTeacher: Teacher = {
      user_id: 2,
      subjects: [
        {
          name: 'teste',
        },
      ],
    }

    mockTeacherRepository.create.mockResolvedValue({
      id: 1,
      ...newTeacher,
      status: 1,
      created_at: new Date(),
      updated_at: new Date(),
    })

    const result = await createTeacherUseCase.handler(newTeacher)

    expect(mockTeacherRepository.create).toHaveBeenCalledWith(newTeacher)
    expect(result).toStrictEqual({
      id: expect.any(Number),
      ...newTeacher,
      status: 1,
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    })
  })

  it('should delete a teacher using the repository', async () => {
    const teacherId = 1

    await deleteTeacherUseCase.handler(teacherId)

    expect(mockTeacherRepository.delete).toHaveBeenCalledWith(teacherId)
  })

  it('It should return a list of teachers', async () => {
    const page = 1
    const limit = 10

    mockTeacherRepository.getAllTeachers.mockResolvedValue(mockTeachers)

    const result = await getAllTeachersUseCase.handler(page, limit)

    expect(mockTeacherRepository.getAllTeachers).toHaveBeenCalledWith(
      page,
      limit,
    )
    expect(result).toStrictEqual(mockTeachers)
  })

  it('It should return the teacher if found by the given ID', async () => {
    const teacherId = 1

    const mockTeacher =
      mockTeachers.find((teacher) => teacher.id === teacherId) || null

    mockTeacherRepository.getById.mockResolvedValue(mockTeacher)

    const result = await findTeacherByIdUseCase.handler(teacherId)

    expect(mockTeacherRepository.getById).toHaveBeenCalledWith(teacherId)
    expect(result).toBe(mockTeacher)
  })
})
