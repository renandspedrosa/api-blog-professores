import { IPostViewedRepository } from '@/repositories/post-viewed.repository.interface'

export class PostViewedExistUseCase {
  constructor(private postViewedRepository: IPostViewedRepository) {}

  async handler(post_id: string, student_id: number): Promise<boolean> {
    return this.postViewedRepository.postViewedExists(post_id, student_id)
  }
}
