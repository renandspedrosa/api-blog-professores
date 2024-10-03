import { IPostRepository } from '@/repositories/post.repository.interface'

export class FindAllPostUseCase {
  constructor(private postRepository: IPostRepository) {}

  async handler(page: number, limit: number, tagId?: number) {
    const posts = tagId
      ? await this.postRepository.findAll(page, limit, tagId)
      : await this.postRepository.findAll(page, limit)
    if (!posts) {
      throw new Error('Post not found')
    }
    return posts
  }
}
