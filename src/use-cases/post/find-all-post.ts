import { IPostRepository } from '@/repositories/post.repository.interface'

export class FindAllPostUseCase {
  constructor(private postRepository: IPostRepository) {}

  async handler(
    page: number,
    limit: number,
    tagIds?: Array<number>,
    term?: string,
  ) {
    const posts = await this.postRepository.findAll(page, limit, tagIds, term)
    if (!posts) {
      throw new Error('Postagem não encontrada')
    }
    return posts
  }
}
