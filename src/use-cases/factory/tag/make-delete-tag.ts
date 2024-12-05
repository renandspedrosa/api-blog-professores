import { TagRepository } from '@/repositories/typeorm/tag.repository'
import { DeleteTagUseCase } from '@/use-cases/tag/delete-tag'

export function makeDeleteTagUseCase() {
  const tagRepository = new TagRepository()
  return new DeleteTagUseCase(tagRepository)
}
