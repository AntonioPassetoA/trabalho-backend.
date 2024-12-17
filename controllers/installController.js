// controllers/installController.js
const fs = require('fs');
const bcrypt = require('bcrypt');
const usersFile = './data/users.json';

// Rota de instalação (criar admin por padrão)
exports.installAdmin = (req, res) => {
  const admin = { username: 'admin', password: 'admin123' };
  
  bcrypt.hash(admin.password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ message: 'Erro ao processar a senha.' });

    const newAdmin = { ...admin, password: hashedPassword };
    const users = [newAdmin];
    
    fs.writeFileSync(usersFile, JSON.stringify(users));
    res.status(200).json({ message: 'Administrador padrão criado com sucesso.' });
  });
};
