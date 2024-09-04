import { Router } from 'express';
import { create } from './create';
import { findUser } from './find-user';
import { validateCreateUser } from '@/http/middlewares/user/validation-create-user';

const router = Router();

router.post('/',validateCreateUser, create);
router.get('/:id', findUser);

export default router;