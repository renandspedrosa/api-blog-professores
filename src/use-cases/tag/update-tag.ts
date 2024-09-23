import { ITag } from '@/entities/models/tags.interface'
import { ITagRepository } from '@/repositories/tag.repository.interface'

export class UpdateTagUseCase {
  constructor(private tagRepository: ITagRepository) {}

  async handler(tag: ITag): Promise<ITag> {
    return await this.tagRepository.update(tag)
  }
}
