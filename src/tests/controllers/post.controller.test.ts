import request from 'supertest'
import app from '@/app'
import { generateJwt } from '@/http/middlewares/jwt-validate'
import { appDataSource } from '@/lib/typeorm/typeorm'

let token: string
let userId: number
let postId: string
let teacherId: number

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
    teacherId = teacherResponse.body.teachers.id

    const payload = { id: userId, email: teacherData.email }
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
    postId = response.body.id
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
      .get(`/posts/${postId}`)
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

  it('GET /posts/search - should find posts by search term', async () => {
    const searchTerm = 'lore'

    const searchResponse = await request(app)
      .get(`/posts/search?page=1&limit=10&term=${searchTerm}`)
      .set('Authorization', `Bearer ${token}`)
      .set('Authorization', `Bearer ${token}`)
    expect(searchResponse.status).toBe(200)
    expect(searchResponse.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: postId,
          title: 'loren ipsum',
          content:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        }),
      ]),
    )
  })

  it('GET /posts/teacher/:teacherId - should find posts by teacher ID', async () => {
    const findTeacherResponse = await request(app)
      .get(`/posts/teacher/${teacherId}`)
      .set('Authorization', `Bearer ${token}`)
    expect(findTeacherResponse.status).toBe(200)
    expect(findTeacherResponse.body).toEqual(
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

  it('GET /posts/:id/comments - should find comments by post ID', async () => {
    const commentData = {
      content: 'comentario teste',
      user_id: userId,
    }
    await request(app)
      .post(`/comments/${postId}`)
      .send(commentData)
      .set('Authorization', `Bearer ${token}`)

    const commentsResponse = await request(app)
      .get(`/posts/${postId}/comments?page=1&limit=10`)
      .set('Authorization', `Bearer ${token}`)
    expect(commentsResponse.status).toBe(200)
    expect(commentsResponse.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          post_id: expect.any(String),
          content: expect.any(String),
          user_id: expect.any(Number),
        }),
      ]),
    )
  })

  it('POST /posts/:id/viewed - should create a post viewed', async () => {
    const studentData = {
      name: 'student teste',
      email: `studentteste${Date.now()}@example.com`,
      password: 'password123',
    }

    const studentResponse = await request(app)
      .post('/student')
      .send(studentData)

    expect(studentResponse.status).toBe(201)
    expect(studentResponse.body).toHaveProperty('students')

    const payloadStudent = {
      id: studentResponse.body.students.user_id,
      email: studentResponse.body.email,
    }

    const tokenStudent = generateJwt(payloadStudent)

    const viewedResponse = await request(app)
      .post(`/posts/${postId}/viewed`)
      .set('Authorization', `Bearer ${tokenStudent}`)

    expect(viewedResponse.status).toBe(201)
    expect(viewedResponse.body).toEqual(
      expect.objectContaining({
        created_at: expect.any(String),
        id: expect.any(Number),
        post_id: expect.any(String),
        student_id: expect.any(Number),
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
      .put(`/posts/${postId}`)
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
      .delete(`/posts/${postId}`)
      .set('Authorization', `Bearer ${token}`)

    expect(deleteResponse.status).toBe(204)
  })
})
