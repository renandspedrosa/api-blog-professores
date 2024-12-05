import { ITagRepository } from '@/repositories/tag.repository.interface'

export class FindAllTagUseCase {
  constructor(private tagRepository: ITagRepository) {}

  async handler(page: number, limit: number) {
    const tags = await this.tagRepository.findAll(page, limit)
    if (!tags) {
      throw new Error('Tags not found')
    }
    return tags
  }
}
