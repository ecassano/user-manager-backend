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

Crie um arquivo `.env` na raiz com base no `.env.example` ou diretamente com o seguinte conteúdo:

```env
PORT=3333

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=user_manager

JWT_SECRET=secret
JWT_EXPIRATION=3600

```

---

## 🧪 Instalação

```bash
pnpm install
```

---

## 🐳 Docker

### 📥 Instalação

Caso ainda não tenha o Docker instalado, baixe através do site oficial:

👉 [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)

---

### ▶️ Subir containers

Com o Docker instalado e rodando, utilize o seguinte comando para iniciar os serviços:

```bash
docker-compose up -d
```

### Rodar migrations

```bash
pnpm run migration:run
```

> As migrations serão geradas automaticamente na pasta `src/migrations`.

---

## ▶️ Rodar a aplicação

```bash
pnpm start:dev
```

A API estará disponível por padrão em: `http://localhost:3333`

---

### Criar usuário

### 👥 Níveis de Acesso

Ao criar um novo usuário, a aplicação atribui permissões automaticamente com base no domínio do e-mail:

- E-mails terminando com @conectar.com.br → Administrador

- Todos os outros e-mails → Usuário padrão

## ✅ To-do
* [ ] Criar testes automatizados
* [ ] Documentação Swagger

---

## 📝 Licença

Este projeto está sob a licença MIT.
