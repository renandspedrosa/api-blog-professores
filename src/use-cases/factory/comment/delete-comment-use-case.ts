import { CommentRepository } from '@/repositories/typeorm/comment.repository'
import { DeleteCommentUseCase } from '@/use-cases/comment/delete-comment'

export function makeDeleteCommentUseCase() {
  const commentRepository = new CommentRepository()
  const deleteCommentUseCase = new DeleteCommentUseCase(commentRepository)
  return deleteCommentUseCase
}
