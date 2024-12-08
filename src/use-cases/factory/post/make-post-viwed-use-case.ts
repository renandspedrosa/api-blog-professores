import { PostViewedRepository } from '@/repositories/typeorm/post-viewed.repository'
import { PostViewedExistUseCase } from '@/use-cases/post/post-viewd-exist'

export function makePostViewedUseCase() {
  const postViewedRepository = new PostViewedRepository()
  return new PostViewedExistUseCase(postViewedRepository)
}
