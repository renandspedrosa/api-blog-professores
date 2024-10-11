import { ITag } from '@/entities/models/tags.interface'
import { ITagRepository } from '@/repositories/tag.repository.interface'

export class CreateTagUseCase {
  constructor(private tagRepository: ITagRepository) {}

  async handler(tag: ITag): Promise<ITag> {
    return this.tagRepository.create(tag)
  }
}
