import request from 'supertest'
import app from '@/app'
import { generateJwt } from '@/http/middlewares/jwt-validate'
import { appDataSource } from '@/lib/typeorm/typeorm'

let token: string
let userId: number
let idPost: string

describe('Post Controller', () => {
  afterAll(async () => {
    if (appDataSource.isInitialized) {
      await appDataSource.destroy()
    }
  })

  beforeAll(async () => {
    if (!appDataSource.isInitialized) {
      await appDataSource.initialize()
    }

    const userData = {
      name: 'user teste',
      email: `userteste${Date.now()}@example.com`,
      password: 'password123',
    }

    const userResponse = await request(app).post('/teacher').send(userData)
    expect(userResponse.status).toBe(201)

    userId = userResponse.body.teachers.user_id

    const payload = { id: userId, email: userData.email }
    token = generateJwt(payload)
  })

  it('POST /posts - should create a new post', async () => {
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
    const response = await request(app)
      .post('/posts')
      .send(postData)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('id')
    expect(response.body.title).toBe(postData.title)
    expect(response.body.content).toBe(postData.content)
    idPost = response.body.id
  })

  it('GET /posts - should return a list of post', async () => {
    const response = await request(app)
      .get('/posts')
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          title: expect.any(String),
          content: expect.any(String),
          teacher_id: expect.any(Number),
          tags: expect.any(Array),
        }),
      ]),
    )
  })

  it('GET /posts/:id - should return a post by ID', async () => {
    const findResponse = await request(app)
      .get(`/posts/${idPost}`)
      .set('Authorization', `Bearer ${token}`)

    expect(findResponse.status).toBe(200)
    expect(findResponse.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        title: expect.any(String),
        content: expect.any(String),
        teacher_id: expect.any(Number),
        tags: expect.any(Array),
      }),
    )
  })

  it('PUT /posts/:id - should update a post by ID', async () => {
    const updatedData = {
      title: 'Novo titulo',
      content: 'Novo conteudo',
      tags: [
        {
          name: 'Novo tag',
        },
      ],
    }
    const updateResponse = await request(app)
      .put(`/posts/${idPost}`)
      .send(updatedData)
      .set('Authorization', `Bearer ${token}`)

    expect(updateResponse.status).toBe(200)
    expect(updateResponse.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        title: expect.any(String),
        content: expect.any(String),
        teacher_id: expect.any(Number),
        tags: expect.any(Array),
      }),
    )
  })

  it('DELETE /posts/:id - should delete a post by ID', async () => {
    const deleteResponse = await request(app)
      .delete(`/posts/${idPost}`)
      .set('Authorization', `Bearer ${token}`)

    expect(deleteResponse.status).toBe(204)
  })
})
