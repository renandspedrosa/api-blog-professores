import { CommentRepository } from '@/repositories/typeorm/comment.repository'
import { GetCommentByPostIdUseCase } from '@/use-cases/comment/get-comment-by-post-id'

export async function makeGetCommentsByPostIdUseCase() {
  const commentRepository = new CommentRepository()
  const getCommentByPostId = new GetCommentByPostIdUseCase(commentRepository)
  return getCommentByPostId
}
