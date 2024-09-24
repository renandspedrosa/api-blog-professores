import { Router } from 'express'
import { create } from './create'
import { update } from './update'
import { validateCreateTag } from '@/http/middlewares/tag/validation-create-tag'

const router = Router()

router.post('/', validateCreateTag, create)
router.put('/:id', validateCreateTag, update)

export default router
