import { Router } from 'express';
import { create } from './create';
import { validateCreateSubject } from '@/http/middlewares/subject/validation-create-subject';

const router = Router();

router.post('/',validateCreateSubject, create);

export default router;