import request from 'supertest'
import app from '@/app' // your Express app
import { generateJwt } from '@/http/middlewares/jwt-validate'
import { appDataSource } from '@/lib/typeorm/typeorm'

let token: string

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

    const payload = { id: 1, email: 'cc@gmail.com' }
    token = generateJwt(payload)
  })

  it('POST /comments/:post_id - should create a new comment', async () => {
    console.log(token)

    const post_id = '62a87cad-ffbd-498d-9ff9-f4acea442334'

    const commentData = {
      content: 'This is a test comment.',
      user_id: '1',
    }
    const response = await request(app)
      .post(`/comments/${post_id}`)
      .send(commentData)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('id')
    expect(response.body.content).toBe(commentData.content)
  })

  it('DELETE /comments/:id - should delete a comment', async () => {
    // Crie um comment primeiro para garantir que há algo para deletar
    const post_id = '62a87cad-ffbd-498d-9ff9-f4acea442334'

    const commentData = {
      content: 'This is a test comment to delete.',
      user_id: '1',
    }
    const createResponse = await request(app)
      .post(`/comments/${post_id}`)
      .send(commentData)
      .set('Authorization', `Bearer ${token}`)

    expect(createResponse.status).toBe(201)

    const commentId = createResponse.body.id

    // Agora delete o comment
    const deleteResponse = await request(app)
      .delete(`/comments/${commentId}`)
      .set('Authorization', `Bearer ${token}`)

    expect(deleteResponse.status).toBe(204)

    // Verifique se o comment foi realmente deletado
    const findResponse = await request(app)
      .get(`/comments/${post_id}/${commentId}`)
      .set('Authorization', `Bearer ${token}`)

    expect(findResponse.status).toBe(404)
  })

  it('GET /comments - should return a list of comments', async () => {
    const response = await request(app)
      .get('/comments')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(200)
  })

  it('GET /comments/:id - should return a comment by ID', async () => {
    // Primeiro, crie um post para associar o comment
    const post_id = '62a87cad-ffbd-498d-9ff9-f4acea442334'

    // Crie um novo comment para buscar em seguida
    const commentData = {
      content: 'This is a test comment to find.',
      user_id: '1',
    }
    const createResponse = await request(app)
      .post(`/comments/${post_id}`)
      .send(commentData)
      .set('Authorization', `Bearer ${token}`)

    expect(createResponse.status).toBe(201)

    const commentId = createResponse.body.id

    // Buscar o comment pelo ID
    const findResponse = await request(app)
      .get(`/comments/${commentId}`)
      .set('Authorization', `Bearer ${token}`)

    expect(findResponse.status).toBe(200)
    expect(findResponse.body).toHaveProperty('id', commentId)
    expect(findResponse.body).toHaveProperty('content', commentData.content)
  })

  it('GET /comments/:id - should return 404 if comment is not found', async () => {
    const post_id = '62a87cad-ffbd-498d-9ff9-f4acea442334'
    const invalidId = '251c5ff9-6e9d-4536-8863-e3ecb676934e'
    const response = await request(app)
      .get(`/comments/${post_id}/${invalidId}`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(404)
  })

  it('PUT /comments/:id - should update a comment by ID', async () => {
    // Primeiro, crie um post para associar o comment
    const post_id = '62a87cad-ffbd-498d-9ff9-f4acea442334'
    // Primeiro, crie um novo comment para ser atualizado em seguida
    const commentData = {
      content: 'This is a test comment to update.',
      user_id: '1',
    }
    const createResponse = await request(app)
      .post(`/comments/${post_id}`)
      .send(commentData)
      .set('Authorization', `Bearer ${token}`)

    expect(createResponse.status).toBe(201)

    const commentId = createResponse.body.id

    // Atualizar o comment com novo conteúdo
    const updatedData = {
      content: 'Updated test comment.',
      user_id: commentData.user_id,
      post_id,
    }
    const updateResponse = await request(app)
      .put(`/comments/${commentId}`)
      .send(updatedData)
      .set('Authorization', `Bearer ${token}`)

    expect(updateResponse.status).toBe(201)
    expect(updateResponse.body).toHaveProperty('id', commentId)
    expect(updateResponse.body).toHaveProperty('content', updatedData.content)
  })
})
