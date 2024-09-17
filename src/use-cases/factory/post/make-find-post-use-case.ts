import { PostRepository } from '@/repositories/typeorm/post.repository'
import { FindPostUseCase } from '@/use-cases/post/find-post'

export function makeFindPostUseCase() {
  const postRepository = new PostRepository()
  return new FindPostUseCase(postRepository)
}
