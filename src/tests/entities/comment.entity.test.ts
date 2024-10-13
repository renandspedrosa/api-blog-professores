import { Comment } from '@/entities/comment.entity'
import { Post } from '@/entities/post.entity'

describe('Entity Comment', () => {
  it('should create a new comment object and define its values', async () => {
    const newComment = new Comment()
    newComment.id = '123e4567-e89b-12d3-a456-426614174000'
    newComment.content = 'This is a test comment.'
    newComment.status = 1
    newComment.created_at = new Date()
    newComment.updated_at = new Date()
    newComment.post_id = '7e5eaf1c-2b9c-4efb-9f80-1c10e99e76f5'
    newComment.post = new Post()
    newComment.user_id = 1

    expect(newComment).toBeInstanceOf(Comment)
    expect(newComment.id).toBe('123e4567-e89b-12d3-a456-426614174000')
    expect(newComment.content).toBe('This is a test comment.')
    expect(newComment.status).toBe(1)
    expect(newComment.created_at).toBeInstanceOf(Date)
    expect(newComment.updated_at).toBeInstanceOf(Date)
    expect(newComment.post_id).toBe('7e5eaf1c-2b9c-4efb-9f80-1c10e99e76f5')
    expect(newComment.post).toBeInstanceOf(Post)
    expect(newComment.user_id).toBe(1)
  })
})
