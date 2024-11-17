import { IComment } from '@/entities/models/comment.interface'
import { ICommentRepository } from '@/repositories/comment.repository.interface'

export class GetCommentByPostIdUseCase {
  constructor(private commentRepository: ICommentRepository) {}

  async handler(
    postId: string,
    page: number,
    limit: number,
  ): Promise<IComment[] | null> {
    const comments = await this.commentRepository.getCommentsByPostId(
      postId,
      page,
      limit,
    )

    if (!comments) throw new Error('Comentários não encontrados')

    return comments
  }
}
