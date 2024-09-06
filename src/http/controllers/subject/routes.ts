import { Router } from 'express';
import { create } from './create';
import { validateCreateSubject } from '@/http/middlewares/subject/validation-create-subject';
import { findAllSubject } from './find-all-subject';
import { findSubject } from './find-subject';
import { update } from './update';
import { deleteSubject } from './delete';

const router = Router();

router.post('/',validateCreateSubject, create);
router.get('/', findAllSubject);
router.get('/:id', findSubject);
router.put('/:id', update);
router.delete('/:id', deleteSubject);

export default router;