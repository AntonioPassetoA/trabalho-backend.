// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

// Middleware para verificar JWT
exports.authenticateJWT = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(403).json({ message: 'Token não fornecido.' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token inválido.' });
    req.user = user;
    next();
  });
};

// Middleware para verificar se o usuário é admin
exports.adminOnly = (req, res, next) => {
  if (req.user.username !== 'admin') {
    return res.status(403).json({ message: 'Acesso restrito apenas a administradores.' });
  }
  next();
};
