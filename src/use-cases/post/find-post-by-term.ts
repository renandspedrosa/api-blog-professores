import { IPost } from '@/entities/models/post.interface'
import { IPostRepository } from '@/repositories/post.repository.interface'

export class FindPostByTermUseCase {
  constructor(private postRepository: IPostRepository) {}

  async handler(text: string, page: number, limit: number): Promise<IPost[]> {
    return this.postRepository.findPostByTextSearch(text, page, limit)
  }
}
