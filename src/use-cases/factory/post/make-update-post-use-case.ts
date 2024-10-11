import { PostRepository } from '@/repositories/typeorm/post.repository'
import { TagRepository } from '@/repositories/typeorm/tag.repository'
import { UpdatePostUseCase } from '@/use-cases/post/update-post'

export async function makeUpdatePostUseCase() {
  const postRepository = new PostRepository()
  const tagRepository = new TagRepository()
  const updatePostUseCase = new UpdatePostUseCase(postRepository, tagRepository)
  return updatePostUseCase
}
