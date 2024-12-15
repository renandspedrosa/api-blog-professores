import { IPost } from '@/entities/models/post.interface'
import { ITag } from '@/entities/models/tags.interface'
import { IPostRepository } from '@/repositories/post.repository.interface'
import { ITagRepository } from '@/repositories/tag.repository.interface'

export class UpdatePostUseCase {
  constructor(
    private postRepository: IPostRepository,
    private tagRepository: ITagRepository,
  ) {}

  async handler(post: Partial<IPost>): Promise<IPost | undefined> {
    if (!post.id) {
      throw new Error('Post ID is required')
    }
    const existingPost = await this.postRepository.findPostById(post.id)
    if (!existingPost) {
      throw new Error('Post not found')
    }

    existingPost.title = post.title ?? existingPost.title
    existingPost.content = post.content ?? existingPost.content
    existingPost.path_img = post.path_img ?? existingPost.path_img

    if (post.tags) {
      const tags = await this.handleTags(post.tags)
      existingPost.tags = tags
    }

    if (post.path_img) {
      existingPost.path_img = post.path_img
    }

    return this.postRepository.updatePost(existingPost as IPost)
  }

  private async handleTags(tagData: ITag[]): Promise<ITag[]> {
    const tags: ITag[] = []

    for (const tag of tagData) {
      let existingTag = await this.tagRepository.findByName(tag.name)
      if (!existingTag) {
        existingTag = await this.tagRepository.create(tag)
      }
      tags.push(existingTag)
    }

    return tags
  }
}
