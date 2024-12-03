import { ITag } from '@/entities/models/tags.interface'
import { ITagRepository } from '@/repositories/tag.repository.interface'
import { CreateTagUseCase } from '@/use-cases/tag/create-tag'
import { DeleteTagUseCase } from '@/use-cases/tag/delete-tag'
import { FindAllTagUseCase } from '@/use-cases/tag/find-all-tag'
import { UpdateTagUseCase } from '@/use-cases/tag/update-tag'

const mockTagRepository: jest.Mocked<ITagRepository> = {
  create: jest.fn(),
  update: jest.fn(),
  findByName: jest.fn(),
  delete: jest.fn(),
  findAll: jest.fn(),
}

const mockTags: ITag[] = [
  {
    id: 1,
    name: 'Recado',
    created_at: new Date(),
    updated_at: new Date(),
    status: 1,
  },
  {
    id: 2,
    name: 'Novidade',
    created_at: new Date(),
    updated_at: new Date(),
    status: 1,
  },
]

describe('Use Cases for the Tag', () => {
  let createTagUseCase: CreateTagUseCase
  let updateTagUseCase: UpdateTagUseCase
  let deleteTagUseCase: DeleteTagUseCase
  let findAllTagUseCase: FindAllTagUseCase

  beforeEach(() => {
    createTagUseCase = new CreateTagUseCase(mockTagRepository)
    updateTagUseCase = new UpdateTagUseCase(mockTagRepository)
    deleteTagUseCase = new DeleteTagUseCase(mockTagRepository)
    findAllTagUseCase = new FindAllTagUseCase(mockTagRepository)
  })

  it('It should create a new tag using the repository', async () => {
    const newTag: ITag = { name: 'Recado' }

    mockTagRepository.create.mockResolvedValue(newTag)

    const result = await createTagUseCase.handler(newTag)

    expect(mockTagRepository.create).toHaveBeenCalledWith(newTag)
    expect(result).toBe(newTag)
  })

  it('It should update a tag using the repository', async () => {
    const updatedTag: ITag = {
      id: 1,
      name: 'Novidade Atualizada',
      created_at: new Date(),
      updated_at: new Date(),
      status: 1,
    }
    mockTagRepository.update.mockResolvedValue(updatedTag)

    const result = await updateTagUseCase.handler(updatedTag)

    expect(mockTagRepository.update).toHaveBeenCalledWith(updatedTag)
    expect(result).toBe(updatedTag)
  })

  it('It should find a tag by name using the repository', async () => {
    const tagName = 'Recado'
    const tag: ITag = {
      id: 1,
      name: tagName,
      created_at: new Date(),
      updated_at: new Date(),
      status: 1,
    }

    mockTagRepository.findByName.mockResolvedValue(tag)

    const result = await mockTagRepository.findByName(tagName)

    expect(mockTagRepository.findByName).toHaveBeenCalledWith(tagName)
    expect(result).toBe(tag)
  })

  it('It should find all tags using the repository', async () => {
    const page = 1
    const limit = 10
    mockTagRepository.findAll.mockResolvedValue(mockTags)

    const result = await findAllTagUseCase.handler(page, limit)

    expect(mockTagRepository.findAll).toHaveBeenCalled()
    expect(result).toBe(mockTags)
  })

  it('It should delete a tag using the repository', async () => {
    const tagId = '1'

    mockTagRepository.delete.mockResolvedValue()

    await deleteTagUseCase.handler(tagId)

    expect(mockTagRepository.delete).toHaveBeenCalledWith(tagId)
  })
})
