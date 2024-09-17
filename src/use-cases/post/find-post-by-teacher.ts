import { IPost } from '@/entities/models/post.interface'
import { IPostRepository } from '@/repositories/post.repository.interface'

export class FindPostByTeacherUseCase {
  constructor(private postRepository: IPostRepository) {}

  async handler(
    teacherId: number,
    page: number,
    limit: number,
  ): Promise<IPost[]> {
    return this.postRepository.findPostByIdTeacher(teacherId, page, limit)
  }
}
