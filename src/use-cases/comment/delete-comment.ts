import { ICommentRepository } from '@/repositories/comment.repository.interface'

export class DeleteCommentUseCase {
  constructor(private commentRepository: ICommentRepository) {}
  async handler(commentId: string): Promise<void> {
    return this.commentRepository.delete(commentId)
  }
}
