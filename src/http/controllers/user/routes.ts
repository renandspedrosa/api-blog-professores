import { Router } from 'express'
import { findUser } from './find-user'
import { signin } from './signin'
import { update } from './update'
import { validateLoginUser } from '@/http/middlewares/user/validation-login-user'

const router = Router()

router.get('/:id', findUser)
router.put('/:id', update)
router.post('/signin', validateLoginUser, signin)

export default router
