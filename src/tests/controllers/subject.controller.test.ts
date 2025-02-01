import request from 'supertest'
import app from '@/app'
import { generateJwt } from '@/http/middlewares/jwt-validate'
import { appDataSource } from '@/lib/typeorm/typeorm'

let token: string
let userId: number

describe('Subject Controller', () => {
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

  it('POST /subject - should create a new subject', async () => {
    const subjectData = { name: 'Mathematics' }
    const response = await request(app)
      .post('/subject')
      .send(subjectData)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('id')
    expect(response.body.name).toBe(subjectData.name)
  })

  it('DELETE /subject/:id - should delete a subject', async () => {
    // Crie um subject primeiro para garantir que há algo para deletar
    const subjectData = { name: 'History' }
    const createResponse = await request(app)
      .post('/subject')
      .send(subjectData)
      .set('Authorization', `Bearer ${token}`)

    expect(createResponse.status).toBe(201)

    const subjectId = createResponse.body.id

    // Agora delete o subject
    const deleteResponse = await request(app)
      .delete(`/subject/${subjectId}`)
      .set('Authorization', `Bearer ${token}`)

    expect(deleteResponse.status).toBe(204)

    // Verifique se o subject foi realmente deletado
    const findResponse = await request(app)
      .get(`/subject/${subjectId}`)
      .set('Authorization', `Bearer ${token}`)

    expect(findResponse.status).toBe(404)
  })

  it('GET /subject - should return a list of subjects', async () => {
    const response = await request(app)
      .get('/subject')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(200)
  })

  it('GET /subject/:id - should return a subject by ID', async () => {
    // Crie um novo subject para buscar em seguida
    const subjectData = { name: 'History' }
    const createResponse = await request(app)
      .post('/subject')
      .send(subjectData)
      .set('Authorization', `Bearer ${token}`)

    expect(createResponse.status).toBe(201)

    const subjectId = createResponse.body.id

    // Buscar o subject pelo ID
    const findResponse = await request(app)
      .get(`/subject/${subjectId}`)
      .set('Authorization', `Bearer ${token}`)

    expect(findResponse.status).toBe(200)
    expect(findResponse.body).toHaveProperty('id', subjectId)
    expect(findResponse.body).toHaveProperty('name', subjectData.name)
  })

  it('GET /subject/:id - should return 404 if subject is not found', async () => {
    const invalidId = '251c5ff9-6e9d-4536-8863-e3ecb676934e'
    const response = await request(app)
      .get(`/subject/${invalidId}`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(404)
  })

  it('PUT /subject/:id - should update a subject by ID', async () => {
    // Primeiro, crie um novo subject para ser atualizado em seguida
    const subjectData = { name: 'History' }
    const createResponse = await request(app)
      .post('/subject')
      .send(subjectData)
      .set('Authorization', `Bearer ${token}`)

    expect(createResponse.status).toBe(201)

    const subjectId = createResponse.body.id

    // Atualizar o subject com novo nome
    const updatedData = { name: 'Updated History' }
    const updateResponse = await request(app)
      .put(`/subject/${subjectId}`)
      .send(updatedData)
      .set('Authorization', `Bearer ${token}`)

    expect(updateResponse.status).toBe(200)
    expect(updateResponse.body).toHaveProperty('id', subjectId)
    expect(updateResponse.body).toHaveProperty('name', updatedData.name)
  })
})
