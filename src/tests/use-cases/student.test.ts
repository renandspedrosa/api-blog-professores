import { Student } from '@/entities/student.entity'
import { IStudentRepository } from '@/repositories/student.repository.interface'
import { CreateStudentUseCase } from '@/use-cases/student/create-student'
import { DeleteStudentUseCase } from '@/use-cases/student/delete-student'
import { GetAllStudentsUseCase } from '@/use-cases/student/get-all-students'
import { FindStudentByIdUseCase } from '@/use-cases/student/find-student-by-id'

const mockStudentRepository: jest.Mocked<IStudentRepository> = {
  create: jest.fn(),
  delete: jest.fn(),
  getAllStudents: jest.fn(),
  getById: jest.fn(),
}

const mockStudents: Student[] = [
  {
    id: 1,
    user_id: 1,
    status: 1,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 2,
    user_id: 2,
    status: 1,
    created_at: new Date(),
    updated_at: new Date(),
  },
]

describe('Use Cases for the Student', () => {
  let createStudentUseCase: CreateStudentUseCase
  let deleteStudentUseCase: DeleteStudentUseCase
  let getAllStudentUseCase: GetAllStudentsUseCase
  let findStudentByIdUseCase: FindStudentByIdUseCase

  beforeEach(() => {
    createStudentUseCase = new CreateStudentUseCase(mockStudentRepository)
    deleteStudentUseCase = new DeleteStudentUseCase(mockStudentRepository)
    getAllStudentUseCase = new GetAllStudentsUseCase(mockStudentRepository)
    findStudentByIdUseCase = new FindStudentByIdUseCase(mockStudentRepository)
  })

  it('It should create a new student using the repository', async () => {
    const newStudent: Student = {
      user_id: 2,
    }

    mockStudentRepository.create.mockResolvedValue({
      id: 1,
      ...newStudent,
      status: 1,
      created_at: new Date(),
      updated_at: new Date(),
    })

    const result = await createStudentUseCase.handler(newStudent)

    expect(mockStudentRepository.create).toHaveBeenCalledWith(newStudent)
    expect(result).toStrictEqual({
      id: expect.any(Number),
      ...newStudent,
      status: 1,
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    })
  })

  it('should delete a teacher using the repository', async () => {
    const studenId = 1

    await deleteStudentUseCase.handler(studenId)

    expect(mockStudentRepository.delete).toHaveBeenCalledWith(studenId)
  })

  it('It should return a list of teachers', async () => {
    const page = 1
    const limit = 10

    mockStudentRepository.getAllStudents.mockResolvedValue(mockStudents)

    const result = await getAllStudentUseCase.handler(page, limit)

    expect(mockStudentRepository.getAllStudents).toHaveBeenCalledWith(
      page,
      limit,
    )
    expect(result).toStrictEqual(mockStudents)
  })

  it('It should return the teacher if found by the given ID', async () => {
    const studentId = 1

    const mockStudent =
      mockStudents.find((student) => student.id === studentId) || null

    mockStudentRepository.getById.mockResolvedValue(mockStudent)

    const result = await findStudentByIdUseCase.handler(studentId)

    expect(mockStudentRepository.getById).toHaveBeenCalledWith(studentId)
    expect(result).toBe(mockStudent)
  })
})
