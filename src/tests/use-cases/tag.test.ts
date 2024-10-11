import { ITag } from '@/entities/models/tags.interface'
import { ITagRepository } from '@/repositories/tag.repository.interface'
import { CreateTagUseCase } from '@/use-cases/tag/create-tag'
import { UpdateTagUseCase } from '@/use-cases/tag/update-tag'

const mockTagRepository: jest.Mocked<ITagRepository> = {
  create: jest.fn(),
  update: jest.fn(),
}

describe('Use Cases for the Tag', () => {
  let createTagUseCase: CreateTagUseCase
  let updateTagUseCase: UpdateTagUseCase

  beforeEach(() => {
    createTagUseCase = new CreateTagUseCase(mockTagRepository)
    updateTagUseCase = new UpdateTagUseCase(mockTagRepository)
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
      status: true,
    }
    mockTagRepository.update.mockResolvedValue(updatedTag)

    const result = await updateTagUseCase.handler(updatedTag)

    expect(mockTagRepository.update).toHaveBeenCalledWith(updatedTag)
    expect(result).toBe(updatedTag)
  })
})
