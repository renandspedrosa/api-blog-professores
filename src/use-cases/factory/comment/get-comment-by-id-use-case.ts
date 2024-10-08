import { CommentRepository } from '@/repositories/typeorm/comment.repository'
import { GetCommentByIdUseCase } from '@/use-cases/comment/get-comment-by-id'

export function makeGetCommentByIdUseCase() {
  const commentRepository = new CommentRepository()
  const getCommentById = new GetCommentByIdUseCase(commentRepository)

  return getCommentById
}
