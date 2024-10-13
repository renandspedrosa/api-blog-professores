import request from 'supertest'
import app from '@/app' // your Express app
import { generateJwt } from '@/http/middlewares/jwt-validate'
import { appDataSource } from '@/lib/typeorm/typeorm'

let token: string
let userId: number
let postId: string
let commentId: string

describe('Comment Controller', () => {
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
      name: 'Thiago Araujo',
      email: `thiago.araujo_${Date.now()}@example.com`,
      password: '12345678',
    }

    const teacherResponse = await request(app)
      .post('/teacher')
      .send(teacherData)
    expect(teacherResponse.status).toBe(201)

    userId = teacherResponse.body.teachers.user_id

    const payload = { id: userId, email: teacherData.email }
    token = generateJwt(payload)

    const postData = {
      title: 'loren ipsum',
      content:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      tags: [
        {
          name: 'Novidades',
        },
      ],
    }

    const postResponse = await request(app)
      .post('/posts')
      .send(postData)
      .set('Authorization', `Bearer ${token}`)

    postId = postResponse.body.id
  })

  it('POST /comments/:post_id - should create a new comment', async () => {
    const post_id = postId

    const commentData = {
      content: 'This is a test comment.',
    }
    const response = await request(app)
      .post(`/comments/${post_id}`)
      .send(commentData)
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('id')
    commentId = response.body.id
    expect(response.body.content).toBe(commentData.content)
  })

  it('GET /comments/:id - should return a comment by ID', async () => {
    const post_id = postId

    const commentData = {
      content: 'This is a test comment to find.',
    }
    const createResponse = await request(app)
      .post(`/comments/${post_id}`)
      .send(commentData)
      .set('Authorization', `Bearer ${token}`)

    expect(createResponse.status).toBe(201)

    const commentId = createResponse.body.id

    const findResponse = await request(app)
      .get(`/comments/${commentId}`)
      .set('Authorization', `Bearer ${token}`)

    expect(findResponse.status).toBe(200)
    expect(findResponse.body).toHaveProperty('id', commentId)
    expect(findResponse.body).toHaveProperty('content', commentData.content)
  })

  it('PUT /comments/:id - should update a comment by ID', async () => {
    const updatedData = {
      content: 'Updated test comment.',
      post_id: postId,
    }
    const updateResponse = await request(app)
      .put(`/comments/${commentId}`)
      .send(updatedData)
      .set('Authorization', `Bearer ${token}`)

    expect(updateResponse.status).toBe(201)
    expect(updateResponse.body).toHaveProperty('id', commentId)
    expect(updateResponse.body).toHaveProperty('content', updatedData.content)
  })

  it('DELETE /comments/:id - should delete a comment', async () => {
    const deleteResponse = await request(app)
      .delete(`/comments/${commentId}`)
      .set('Authorization', `Bearer ${token}`)

    expect(deleteResponse.status).toBe(204)
  })
})
