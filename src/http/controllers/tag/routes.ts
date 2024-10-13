import { Router } from 'express'
import { create } from './create'
import { update } from './update'
import { validateCreateTag } from '@/http/middlewares/tag/validation-create-tag'

const router = Router()

/**
 * @swagger
 * /tag:
 *   post:
 *     summary: Cria uma nova tag
 *     tags:
 *       - Tag
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome da tag
 *                 example: "Nova Tag"
 *     responses:
 *       201:
 *         description: Tag criada com sucesso
 */
router.post('/', validateCreateTag, create)

/**
 * @swagger
 * /tag/{id}:
 *   put:
 *     summary: Atualiza uma tag existente
 *     tags:
 *       - Tag
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da tag a ser atualizada
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: Novo nome da tag
 *                 example: "Tag Atualizada"
 *     responses:
 *       200:
 *         description: Tag atualizada com sucesso
 */

router.put('/:id', validateCreateTag, update)

export default router
