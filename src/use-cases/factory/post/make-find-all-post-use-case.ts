import { PostRepository } from '@/repositories/typeorm/post.repository'
import { FindAllPostUseCase } from '@/use-cases/post/find-all-post'

export function makeFindAllPostUseCase() {
  const postRepository = new PostRepository()
  return new FindAllPostUseCase(postRepository)
}
