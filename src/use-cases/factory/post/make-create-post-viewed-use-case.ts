import { PostViewedRepository } from '@/repositories/typeorm/post-viewed.repository'
import { CreatePostViewedUseCase } from '@/use-cases/post/create-post-viewed'

export function makeCreatePostViewedUseCase() {
  const postViewedRepository = new PostViewedRepository()
  const createPostViewedUseCase = new CreatePostViewedUseCase(
    postViewedRepository,
  )
  return createPostViewedUseCase
}
