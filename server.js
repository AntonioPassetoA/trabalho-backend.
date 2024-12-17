// Importação de pacotes e arquivos
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { errorHandler } = require('./middleware/errorHandler'); // Middleware de erro
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Carregar variáveis de ambiente
dotenv.config();

// Configuração do servidor Express
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Documentação Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API RESTful Trabalho Back-end',
      description: 'Documentação da API desenvolvida em Node.js com Express',
      version: '1.0.0',
      contact: {
        name: 'Seu Nome',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor Local',
      },
    ],
  },
  apis: ['./routes/*.js'], // Caminho onde estão as rotas com Swagger
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rotas do projeto
const userRoutes = require('./routes/userRoutes');
const installRoutes = require('./routes/installRoutes');

// Definição das rotas
app.use('/users', userRoutes); // Rotas relacionadas a usuários
app.use('/install', installRoutes); // Rota para criação do admin inicial

// Middleware de tratamento de erros
app.use(errorHandler);

// Iniciar o servidor na porta definida
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Documentação disponível em http://localhost:${PORT}/docs`);
});
