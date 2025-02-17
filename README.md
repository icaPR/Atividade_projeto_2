# 🎟️ API de Gerenciamento de Ingressos

## 📌 Sobre

Esta API permite o gerenciamento de usuários, a criação e venda de ingressos e a consulta de compras realizadas. Além disso, o sistema conta com uma interface web utilizando Handlebars para login e exibição do histórico de compras.

## 🚀 Tecnologias Utilizadas

- Node.js
- Express.js
- Sequelize (ORM)
- MySQL/PostgreSQL (Banco de Dados)
- Handlebars (Template Engine)
- Autenticação JWT (JSON Web Token)

---

## 📌 Endpoints da API

### 📌 Cadastro de Usuário

- **POST** `/auth/register`
  - **Body:**
    ```json
    {
      "name": "John",
      "email": "john@example.com",
      "password": "123456"
    }
    ```

### 📌 Login de Usuário

- **POST** `/auth/login`
  - **Body:**
    ```json
    {
      "email": "john@example.com",
      "password": "123456"
    }
    ```
  - **Resposta:**
    ```json
    {
      "token": "seu_token_jwt"
    }
    ```

### 📌 Criação de Ingresso (Admin)

- **POST** `/tickets`
  - **Headers:** `{ Authorization: 'Bearer <token>' }`
  - **Body:**
    ```json
    {
      "name": "VIP",
      "price": 100,
      "quantity": 50
    }
    ```

### 📌 Compra de Ingressos

- **POST** `/purchases`
  - **Headers:** `{ Authorization: 'Bearer <token>' }`
  - **Body:**
    ```json
    {
      "ticketTypeId": 1,
      "quantity": 2
    }
    ```

### 📌 Listar Compras do Usuário

- **GET** `/purchases`
  - **Headers:** `{ Authorization: 'Bearer <token>' }`

### 📌 Detalhes de um Ingresso

- **GET** `/purchases/:ticketId`
  - **Headers:** `{ Authorization: 'Bearer <token>' }`

---

## 🌐 Funcionalidades da Interface Web

### 📌 Login

- Página de login permitindo autenticação via token.

### 📌 Histórico de Compras

- Exibe a lista de ingressos adquiridos pelo usuário autenticado.

### 📌 Visualização Individual de um Ingresso

- O usuário pode visualizar os detalhes de um ingresso adquirido.

---

## 📜 Licença

Este projeto é de código aberto e pode ser utilizado livremente.
