import { Router } from 'express';
import { create } from './create';
import { validateCreateTeacher } from '@/http/middlewares/teacher/validation-create-teacher';

const router = Router();

router.post('/',validateCreateTeacher, create);

export default router;