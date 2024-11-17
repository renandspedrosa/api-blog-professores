import request from 'supertest'
import app from '@/app' // your Express app
import { generateJwt } from '@/http/middlewares/jwt-validate'
import { appDataSource } from '@/lib/typeorm/typeorm'
import { validateCreateTag } from '@/http/middlewares/tag/validation-create-tag'
import { Request, Response, NextFunction } from 'express'

let token: string
let userId: number

describe('Tag Controller', () => {
  afterAll(async () => {
    if (appDataSource.isInitialized) {
      await appDataSource.destroy()
    }
  })

  beforeAll(async () => {
    if (!appDataSource.isInitialized) {
      await appDataSource.initialize()
    }

    const teacherData = {
      name: 'teacher teste',
      email: `teacherteste${Date.now()}@example.com`,
      password: 'password123',
    }

    const teacherResponse = await request(app)
      .post('/teacher')
      .send(teacherData)
    expect(teacherResponse.status).toBe(201)

    userId = teacherResponse.body.teachers.user_id

    const payload = { id: userId, email: teacherData.email }
    token = generateJwt(payload)
  })

  it('POST /tag - should create a new tag', async () => {
    const tagData = { name: `Tag teste ${Date.now()}` }
    const response = await request(app)
      .post('/tag')
      .send(tagData)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('status')
    expect(response.body).toHaveProperty('created_at')
    expect(response.body).toHaveProperty('updated_at')
    expect(response.body.name).toBe(tagData.name)
  })

  it('PUT /tag/:id - should update a tag by ID', async () => {
    // Primeiro, crie uma nova tag para ser atualizada em seguida
    const tagData = { name: `Tag teste atualizada ${Date.now()}` }
    const createResponse = await request(app)
      .post('/tag')
      .send(tagData)
      .set('Authorization', `Bearer ${token}`)

    expect(createResponse.status).toBe(201)

    const tagId = createResponse.body.id

    // Atualizar a tag com novo nome
    const updatedData = { name: 'News' }
    const updateResponse = await request(app)
      .put(`/tag/${tagId}`)
      .send(updatedData)
      .set('Authorization', `Bearer ${token}`)

    expect(updateResponse.status).toBe(201)
    expect(updateResponse.body).toHaveProperty('id', tagId)
    expect(updateResponse.body).toHaveProperty('name', updatedData.name)
  })
})

describe('validateCreateTag Middleware', () => {
  let mockRequest: Partial<Request>
  let mockResponse: Partial<Response>
  let mockNext: NextFunction

  beforeEach(() => {
    mockRequest = {}
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }
    mockNext = jest.fn()
  })

  it('should return 400 when validation fails', () => {
    mockRequest.body = {} // Invalid body to trigger ZodError

    validateCreateTag(
      mockRequest as Request,
      mockResponse as Response,
      mockNext,
    )

    expect(mockResponse.status).toHaveBeenCalledWith(400)
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Validação falhou',
        errors: expect.any(Object), // Verify that errors are returned
      }),
    )
  })
})
