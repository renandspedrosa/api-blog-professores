import { TagRepository } from '@/repositories/typeorm/tag.repository'
import { FindAllTagUseCase } from '@/use-cases/tag/find-all-tag'

export function makeFindAllTagUseCase() {
  const tagRepository = new TagRepository()
  return new FindAllTagUseCase(tagRepository)
}
