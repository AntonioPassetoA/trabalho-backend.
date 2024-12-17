const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const usersFile = './data/users.json';

/**
 * Função para registrar um usuário
 */
exports.registerUser = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Nome de usuário e senha são obrigatórios.' });
  }

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ message: 'Erro ao processar a senha.' });

    const newUser = { username, password: hashedPassword };
    const users = JSON.parse(fs.readFileSync(usersFile, 'utf8'));
    users.push(newUser);
    fs.writeFileSync(usersFile, JSON.stringify(users));

    res.status(201).json({ message: 'Usuário registrado com sucesso.' });
  });
};

/**
 * Função de login e geração de token JWT
 */
exports.loginUser = (req, res) => {
  const { username, password } = req.body;
  const users = JSON.parse(fs.readFileSync(usersFile, 'utf8'));
  const user = users.find(u => u.username === username);

  if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });

  bcrypt.compare(password, user.password, (err, result) => {
    if (!result) return res.status(401).json({ message: 'Senha incorreta.' });

    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login bem-sucedido.', token });
  });
};

/**
 * Função para criar um novo administrador
 */
exports.createAdmin = (req, res) => {
  // Lógica para criar admin
};

/**
 * Função para excluir usuário
 */
exports.deleteUser = (req, res) => {
  // Lógica para excluir usuário
};
