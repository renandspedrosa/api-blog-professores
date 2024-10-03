import { ISubjectRepository } from '@/repositories/subject.repository.interface'
import { ISubject } from '@/entities/models/subject.interface'
import { CreateSubjectUseCase } from '@/use-cases/subject/create-subject'
import { FindAllSubjectUseCase } from '@/use-cases/subject/find-all-subject'
import { FindSubjectUseCase } from '@/use-cases/subject/find-subject'
import { DeleteSubjectUseCase } from '@/use-cases/subject/delete-subject'
import { UpdateSubjectUseCase } from '@/use-cases/subject/update-subject'

// Mock do repositório
const mockSubjectRepository: jest.Mocked<ISubjectRepository> = {
  create: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
}

const mockSubjects: ISubject[] = [
  { id: '1e5eaf1c-5c9c-4efb-9f80-5c10e99e76f4', name: 'Subject 1' },
  { id: 'b8c5d3c5-6d5f-4f88-a1b3-4b6d90a8c7f0', name: 'Subject 2' },
]

describe('Use Cases for the Subject', () => {
  let createSubjectUseCase: CreateSubjectUseCase
  let findAllSubjectUseCase: FindAllSubjectUseCase
  let findSubjectUseCase: FindSubjectUseCase
  let updateSubjectUseCase: UpdateSubjectUseCase
  let deleteSubjectUseCase: DeleteSubjectUseCase

  beforeEach(() => {
    createSubjectUseCase = new CreateSubjectUseCase(mockSubjectRepository)
    findAllSubjectUseCase = new FindAllSubjectUseCase(mockSubjectRepository)
    findSubjectUseCase = new FindSubjectUseCase(mockSubjectRepository)
    updateSubjectUseCase = new UpdateSubjectUseCase(mockSubjectRepository)
    deleteSubjectUseCase = new DeleteSubjectUseCase(mockSubjectRepository)
  })

  it('It should create a new subject using the repository', async () => {
    const newSubject: ISubject = {
      id: '1e5eaf1c-5c9c-4efb-9f80-5c10e99e76f4',
      name: 'Test Subject',
    }
    mockSubjectRepository.create.mockResolvedValue(newSubject)

    const result = await createSubjectUseCase.handler(newSubject)

    expect(mockSubjectRepository.create).toHaveBeenCalledWith(newSubject)
    expect(result).toBe(newSubject)
  })

  it('It should find all subjects with pagination', async () => {
    const page = 1
    const limit = 10
    mockSubjectRepository.findAll.mockResolvedValue(mockSubjects)

    const result = await findAllSubjectUseCase.handler(page, limit)

    expect(mockSubjectRepository.findAll).toHaveBeenCalledWith(page, limit)
    expect(result).toEqual(mockSubjects)
  })

  it('It should find a subject by its ID.', async () => {
    const subjectId = '1e5eaf1c-5c9c-4efb-9f80-5c10e99e76f4'
    mockSubjectRepository.findById.mockResolvedValue(mockSubjects[0])

    const result = await findSubjectUseCase.handler(subjectId)

    expect(mockSubjectRepository.findById).toHaveBeenCalledWith(subjectId)
    expect(result).toEqual(mockSubjects[0])
  })

  it('It should update a subject by its ID', async () => {
    const subjectId = '1e5eaf1c-5c9c-4efb-9f80-5c10e99e76f4'
    const updatedSubject: ISubject = {
      id: subjectId,
      name: 'Updated Subject',
    }
    mockSubjectRepository.update.mockResolvedValue(updatedSubject)

    const result = await updateSubjectUseCase.handler(updatedSubject)

    expect(mockSubjectRepository.update).toHaveBeenCalledWith(updatedSubject)
    expect(result).toBe(updatedSubject)
  })

  it('It should delete a subject by its ID', async () => {
    const subjectId = '1e5eaf1c-5c9c-4efb-9f80-5c10e99e76f4'
    mockSubjectRepository.delete.mockResolvedValue(undefined) // Simulando que o delete não retorna nada

    await deleteSubjectUseCase.handler(subjectId)

    expect(mockSubjectRepository.delete).toHaveBeenCalledWith(subjectId)
  })
})
