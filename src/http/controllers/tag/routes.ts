import { Router } from 'express';
import { create } from './create';
import { validateCreateTag } from '@/http/middlewares/tag/validation-create-tag';

const router = Router();

router.post('/',validateCreateTag, create);

export default router;