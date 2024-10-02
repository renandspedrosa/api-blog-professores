import { PostRepository } from '@/repositories/typeorm/post.repository'
import { FindPostByTermUseCase } from '@/use-cases/post/find-post-by-term'

export function makeFindPostByTermUseCase() {
  const postRepository = new PostRepository()
  const findPostByTermUseCase = new FindPostByTermUseCase(postRepository)
  return findPostByTermUseCase
}
