import { ITagRepository } from '@/repositories/tag.repository.interface'

export class DeleteTagUseCase {
  constructor(private tagRepository: ITagRepository) {}

  async handler(id: string): Promise<void> {
    return this.tagRepository.delete(id)
  }
}
