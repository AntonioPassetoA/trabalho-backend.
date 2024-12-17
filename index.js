const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const app = express();

// Configuração do Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Usuários',
      version: '1.0.0',
      description: 'Uma API RESTful para gerenciar usuários, autenticação e CRUD',
    },
  },
  apis: ['./routes/*.js'], // Arquivos onde o Swagger vai gerar a documentação
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Rota para exibir a documentação Swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
