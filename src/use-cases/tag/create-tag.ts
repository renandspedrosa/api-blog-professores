import { ITagRepository } from '@/repositories/tag.repository.interface'

export class CreateTagUseCase {
  constructor(private tagRepository: ITagRepository) {}

  async handler(name: string): Promise<void> {
    await this.tagRepository.create(name)
  }
}
