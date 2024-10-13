import { IComment } from '@/entities/models/comment.interface'
import { ICommentRepository } from '@/repositories/comment.repository.interface'
import { CreateCommentUseCase } from '@/use-cases/comment/create-comment'
import { DeleteCommentUseCase } from '@/use-cases/comment/delete-comment'
import { GetCommentByPostIdUseCase } from '@/use-cases/comment/get-comment-by-post-id'
import { UpdateCommentUseCase } from '@/use-cases/comment/update-comment'
import { GetCommentByIdUseCase } from '@/use-cases/comment/get-comment-by-id'

const mockCommentRepository: jest.Mocked<ICommentRepository> = {
  create: jest.fn(),
  getAllComments: jest.fn(),
  getCommentsByPostId: jest.fn(),
  getById: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
}

const mockComments: IComment[] = [
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
    content: 'Comment 1',
    post_id: '4e106c23-98cd-456a-955d-adc35295d5d4',
    user_id: 1,
    status: 1,
    created_at: new Date(),
    updated_at: null,
  },
  {
    id: '223e4567-e89b-12d3-a456-426614174001',
    content: 'Comment 2',
    post_id: '4e106c23-98cd-456a-955d-adc35295d5d4',
    user_id: 1,
    status: 1,
    created_at: new Date(),
    updated_at: null,
  },
]

describe('Use Cases for the Comment', () => {
  let createCommentUseCase: CreateCommentUseCase
  let deleteUseCase: DeleteCommentUseCase
  let getCommentByPostIdUseCase: GetCommentByPostIdUseCase
  let getCommentByIdUseCase: GetCommentByIdUseCase
  let updateUseCase: UpdateCommentUseCase

  beforeEach(() => {
    createCommentUseCase = new CreateCommentUseCase(mockCommentRepository)
    deleteUseCase = new DeleteCommentUseCase(mockCommentRepository)
    getCommentByPostIdUseCase = new GetCommentByPostIdUseCase(
      mockCommentRepository,
    )
    getCommentByIdUseCase = new GetCommentByIdUseCase(mockCommentRepository)
    updateUseCase = new UpdateCommentUseCase(mockCommentRepository)
  })

  it('should create a new comment using the repository', async () => {
    const newComment: IComment = {
      id: '323e4567-e89b-12d3-a456-426614174002',
      content: 'Comment 3',
      post_id: '4e106c23-98cd-456a-955d-adc35295d5d4',
      user_id: 2,
      status: 1,
      created_at: new Date(),
      updated_at: null,
    }
    mockCommentRepository.create.mockResolvedValue(newComment)

    const result = await createCommentUseCase.handler(newComment)

    expect(mockCommentRepository.create).toHaveBeenCalledWith(newComment)
    expect(result).toBe(newComment)
  })

  it('should delete a comment by its ID', async () => {
    const commentId = '123e4567-e89b-12d3-a456-426614174000'
    mockCommentRepository.delete.mockResolvedValue(undefined)

    await deleteUseCase.handler(commentId)

    expect(mockCommentRepository.delete).toHaveBeenCalledWith(commentId)
  })

  it('should find comments by post ID', async () => {
    const postId = '4e106c23-98cd-456a-955d-adc35295d5d4'
    const page = 1
    const limit = 10
    mockCommentRepository.getCommentsByPostId.mockResolvedValue(mockComments)

    const result = await getCommentByPostIdUseCase.handler(postId, page, limit)

    expect(mockCommentRepository.getCommentsByPostId).toHaveBeenCalledWith(
      postId,
      page,
      limit,
    )
    expect(result).toEqual(mockComments)
  })

  it('should find a comment by its ID', async () => {
    const commentId = '123e4567-e89b-12d3-a456-426614174000'
    mockCommentRepository.getById.mockResolvedValue(mockComments[0])

    const result = await getCommentByIdUseCase.handler(commentId)

    expect(mockCommentRepository.getById).toHaveBeenCalledWith(commentId)
    expect(result).toEqual(mockComments[0])
  })

  it('should update a comment by its ID', async () => {
    const commentId = '223e4567-e89b-12d3-a456-426614174001'
    const updatedComment: IComment = {
      id: commentId,
      content: 'Comment 2 Updated',
      post_id: '4e106c23-98cd-456a-955d-adc35295d5d4',
      user_id: 1,
      status: 1,
      created_at: new Date(),
      updated_at: new Date(),
    }
    mockCommentRepository.update.mockResolvedValue(updatedComment)

    const result = await updateUseCase.handler(updatedComment)

    expect(mockCommentRepository.update).toHaveBeenCalledWith(updatedComment)
    expect(result).toBe(updatedComment)
  })
})
