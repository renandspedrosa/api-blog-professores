import { TagRepository } from '@/repositories/typeorm/tag.repository'
import { UpdateTagUseCase } from '@/use-cases/tag/update-tag'

export function makeUpdateTagUseCase() {
  const tagRepository = new TagRepository()
  return new UpdateTagUseCase(tagRepository)
}
