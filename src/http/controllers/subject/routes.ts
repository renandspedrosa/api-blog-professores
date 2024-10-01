import { Router } from 'express'
import { create } from './create'
import { validateCreateSubject } from '@/http/middlewares/subject/validation-create-subject'
import { findAllSubject } from './find-all-subject'
import { findSubject } from './find-subject'
import { update } from './update'
import { deleteSubject } from './delete'
import { validationFindAll } from '@/http/middlewares/utils/validation-find-all'
import { validationFindSubject } from '@/http/middlewares/subject/validation-find-subject'

const router = Router()

router.post('/', validateCreateSubject, create)
router.get('/', validationFindAll, findAllSubject)
router.get('/:id', validationFindSubject, findSubject)
router.put('/:id', validationFindSubject, validateCreateSubject, update)
router.delete('/:id', validationFindSubject, deleteSubject)

export default router
