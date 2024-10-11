import { PostViewed } from '@/entities/post-viewed.entity'

describe('Entity PostViewed', () => {
  it('should create a new PostViewed object and define its values', async () => {
    const newPostViewed = new PostViewed()
    newPostViewed.id = 1
    newPostViewed.student_id = 123
    newPostViewed.post_id = '7e5eaf1c-2b9c-4efb-9f80-1c10e99e76f5'
    newPostViewed.created_at = new Date()

    expect(newPostViewed).toBeInstanceOf(PostViewed)
    expect(newPostViewed.id).toBe(1)
    expect(newPostViewed.student_id).toBe(123)
    expect(newPostViewed.post_id).toBe('7e5eaf1c-2b9c-4efb-9f80-1c10e99e76f5')
    expect(newPostViewed.created_at).toBeInstanceOf(Date)
  })
})
