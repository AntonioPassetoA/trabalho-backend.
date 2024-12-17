const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retorna todos os usuários
 *     description: Lista todos os usuários cadastrados no sistema.
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso.
 */
router.get('/', (req, res) => {
  res.json({ message: 'Lista de usuários' });
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     description: Rota para criar um usuário.
 *     parameters:
 *       - name: body
 *         in: body
 *         description: Dados do novo usuário
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             email:
 *               type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso.
 */
router.post('/', (req, res) => {
  const { name, email } = req.body;
  res.status(201).json({ message: 'Usuário criado', name, email });
});

module.exports = router;
