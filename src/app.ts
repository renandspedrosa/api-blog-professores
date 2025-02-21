import 'reflect-metadata'
import '@/lib/typeorm/typeorm'
import express from 'express'
import cors from 'cors'
import teacherRouter from '@/http/controllers/teacher/routes'
import userRouter from '@/http/controllers/user/routes'
import postRouter from '@/http/controllers/post/routes'
import commentsRouter from '@/http/controllers/comments/routes'
import subjectRouter from '@/http/controllers/subject/routes'
import tagRouter from '@/http/controllers/tag/routes'
import studentRoute from '@/http/controllers/student/routes'
import { validateJwt } from './http/middlewares/jwt-validate'
import errorMiddleware from './global/error-midleware'
import { setupSwagger } from './swagger'
import path from 'path'

const app = express()

app.use(cors({
    origin: '*', // Permite qualquer origem (não recomendado em produção)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
    credentials: true, // Permite cookies e headers de autenticação
  }))
  

app.use(express.json())

app.use('/teacher', teacherRouter)
app.use('/user', userRouter)
app.use('/posts', postRouter)
app.use('/comments', validateJwt, commentsRouter)
app.use('/subject', validateJwt, subjectRouter)
app.use('/tag', tagRouter)
app.use('/student', studentRoute)

app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

app.use(errorMiddleware)

setupSwagger(app)

export default app
