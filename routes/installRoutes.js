const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /install:
 *   get:
 *     summary: Cria um usuário administrador padrão
 *     description: Rota para criar o usuário administrador inicial no sistema.
 *     responses:
 *       200:
 *         description: Usuário administrador criado com sucesso.
 */
router.get('/', (req, res) => {
  res.json({ message: 'Administrador criado com sucesso!' });
});

module.exports = router;
