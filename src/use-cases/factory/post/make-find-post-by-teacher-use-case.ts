import { PostRepository } from '@/repositories/typeorm/post.repository'
import { FindPostByTeacherUseCase } from '@/use-cases/post/find-post-by-teacher'

export function makeFindPostByTeacherUseCase() {
  const postRepository = new PostRepository()
  const findPostByTeacherUseCase = new FindPostByTeacherUseCase(postRepository)
  return findPostByTeacherUseCase
}
