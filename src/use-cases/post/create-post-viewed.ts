import { PostViewed } from '@/entities/post-viewed.entity'
import { IPostViewedRepository } from '@/repositories/post-viewed.repository.interface'

export class CreatePostViewedUseCase {
  constructor(private postViewedRepository: IPostViewedRepository) {}

  handler(postViewed: PostViewed) {
    return this.postViewedRepository.create(postViewed)
  }
}
