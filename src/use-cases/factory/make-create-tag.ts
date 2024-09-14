import { TagRepository } from '@/repositories/typeorm/tag.repository'
import { CreateTagUseCase } from '../tag/create-tag'

export function makeCreateTagUseCase() {
  const tagRepository = new TagRepository()
  return new CreateTagUseCase(tagRepository)
}
