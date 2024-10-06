import { Router } from 'express'
import { getAllTeachers } from '@/http/controllers/teacher/get-all-teachers'
import { create } from '@/http/controllers/teacher/create'
import { update } from '@/http/controllers/teacher/update'
import { deleteTeacher } from './delete'
import { validationFindAll } from '@/http/middlewares/utils/validation-find-all'
import { validateCreateUserWithUniqueEmail } from '@/http/middlewares/user/validation-unique-email'
import { validateCreateUser } from '@/http/middlewares/user/validation-create-user'

const router = Router()

router.get('/', validationFindAll, getAllTeachers)
router.post('/', validateCreateUserWithUniqueEmail, validateCreateUser, create)
router.put('/:id', update)
router.delete('/:id', deleteTeacher)

export default router
