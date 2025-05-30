# 📦 User Manager Backend

Este projeto é o backend de um sistema de gerenciamento de usuários. Ele utiliza **NestJS**, **TypeORM** e **PostgreSQL**.

---

## 🚀 Tecnologias

* [NestJS](https://nestjs.com/)
* [TypeORM](https://typeorm.io/)
* [PostgreSQL](https://www.postgresql.org/)
* [bcrypt](https://www.npmjs.com/package/bcrypt)

---

## 📁 Estrutura

* `src/`

  * `auth/`: Módulo de autenticação
  * `users/`: Módulo de usuários (entidade, controller, service)
  * `migrations/`: Migrations do banco de dados
  * `app.module.ts`: Módulo principal
  * `main.ts`: Arquivo principal para bootstrap do app
* `data-source.ts`: Arquivo de configuração do TypeORM para CLI

---

## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env` na raiz com base no `.env.example`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=user_manager
```

---

## 🧪 Instalação

```bash
pnpm install
```

---

## 🗃️ Migrations

### Gerar nova migration

```bash
pnpm run migration:generate src/migrations/NomeDaMigration -d data-source.ts
```

### Rodar migrations

```bash
pnpm run migration:run
```

### Reverter última migration

```bash
pnpm run migration:revert
```

> As migrations serão geradas automaticamente na pasta `src/migrations`.

---

## ▶️ Rodar a aplicação

```bash
pnpm start:dev
```

A API estará disponível por padrão em: `http://localhost:3000`

---

## 📫 Testar com Insomnia/Postman

### Criar usuário

**POST** `/users`

```json
{
  "username": "admin",
  "password": "admin123"
}
```

### Buscar todos os usuários

**GET** `/users`

---

## ✅ To-do

* [ ] Implementar autenticação JWT
* [ ] Criar testes automatizados
* [ ] Documentação Swagger

---

## 📝 Licença

Este projeto está sob a licença MIT.
