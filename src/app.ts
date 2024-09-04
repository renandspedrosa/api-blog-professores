import 'reflect-metadata';
import '@/lib/typeorm/typeorm';
import express from 'express';
import teacherRouter from '@/http/controllers/teacher/routes';
import userRouter from '@/http/controllers/user/routes';
import postRouter from '@/http/controllers/post/routes';
import subjectRouter from '@/http/controllers/subject/routes';
// import { globalErrorHandler } from '@/utils/global-error-handler';

const app = express();

app.use(express.json()); 

app.use('/teacher', teacherRouter);
app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/subject', subjectRouter);

// app.use(globalErrorHandler);

export default app;