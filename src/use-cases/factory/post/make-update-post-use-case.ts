import { PostRepository } from '@/repositories/typeorm/post.repository'
import { UpdatePostUseCase } from '@/use-cases/post/update-post'

export async function makeUpdatePostUseCase() {
  const postRepository = new PostRepository()
  const updatePostUseCase = new UpdatePostUseCase(postRepository)
  return updatePostUseCase
}
