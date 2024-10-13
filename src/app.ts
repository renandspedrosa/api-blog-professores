import 'reflect-metadata'
import '@/lib/typeorm/typeorm'
import express from 'express'
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

const app = express()

app.use(express.json())

app.use('/teacher', teacherRouter)
app.use('/user', userRouter)
app.use('/posts', validateJwt, postRouter)
app.use('/comments', validateJwt, commentsRouter)
app.use('/subject', validateJwt, subjectRouter)
app.use('/tag', validateJwt, tagRouter)
app.use('/student', studentRoute)

app.use(errorMiddleware)

setupSwagger(app)

export default app
