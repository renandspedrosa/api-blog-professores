import { IPostRepository } from '@/repositories/post.repository.interface'

export class FindPostUseCase {
  constructor(private postRepository: IPostRepository) {}

  async handler(id: string) {
    const post = await this.postRepository.findPostById(id)

    if (!post) throw new Error('Post not found')

    return post
  }
}
