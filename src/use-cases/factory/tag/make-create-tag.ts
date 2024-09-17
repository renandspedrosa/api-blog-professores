import { TagRepository } from '@/repositories/typeorm/tag.repository'
import { CreateTagUseCase } from '@/use-cases/tag/create-tag'

export function makeCreateTagUseCase() {
  const tagRepository = new TagRepository()
  return new CreateTagUseCase(tagRepository)
}
