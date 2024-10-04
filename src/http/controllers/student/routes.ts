import { Router } from 'express'
import { validateCreateStudent } from '@/http/middlewares/student/validation-create-student'
import { getAllStudents } from '@/http/controllers/student/get-all-students'
import { create } from '@/http/controllers/student/create'
import { update } from '@/http/controllers/student/update'
import { deleteStudent } from './delete'
import { validationFindAll } from '@/http/middlewares/utils/validation-find-all'
import { isNotStudent } from '@/http/middlewares/student/is-not-student'

const router = Router()

router.get('/', validationFindAll, getAllStudents)
router.post('/', isNotStudent, validateCreateStudent, create)
router.put('/:id', update)
router.delete('/:id', deleteStudent)

export default router
