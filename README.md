# Meal management API

## 1. Getting started

Meal management application allows users to create, read, update, and delete meal addons.It also allow users to create categories for these addons.

### 1.1 View Documentation

Documentation - http://localhost:3000/documentation

### 1.2 Requirements

Before starting, make sure you have at least those components on your workstation:

- An up-to-date release of [NodeJS](https://nodejs.org/) and NPM
- A database (PostgreSQL).

### 1.3 Project configuration

Start by cloning this project on your workstation.

```sh
git clone https://github.com/emmabraboke/meal-management.git my-project
```

The next thing will be to install all the dependencies of the project.

```sh
cd ./my-project
npm install
```

Once the dependencies are installed, you can now configure your project by creating a new `.env` file containing your environment variables used for development.

```
cp .env.example .env
vi .env
```

For Objectionjs configuration: change everything according to your own database setup.
Set the `JWT_SECRET` and `JWT_EXPIRES_IN` to sign the JWT tokens.

### 1.4 Running the app

You are now ready to launch the NestJS application using the command below.

```sh
# Perform migrations in your database using KnexJS
$ npm run migration

# development
$ npm run start

# watch mode
$ npm run start:dev

```

You can now head to `http://localhost:3000/documentation` and see your API Swagger docs.

## 2. Project structure

This template was made with a well-defined directory structure.

```sh
src/
├── common/  # The common module contains pipes, guards, service and provider used in the whole application
├── config/ # config contains the all app configs
├── database # database contains the migrations, seeds and database setup
├── modules
│   ├── addon
│   │   ├── dto # contains the addons dto
│   │   ├── entities/
│   │   │   ├── addonCategory.entity.ts # Thee meal addon category model
│   │   │   ├── addon.entity.ts # The meal addon model
│   │   ├── addons.controller.ts
│   │   ├── addons.module.ts
│   │   ├── addons.service.ts
│   ├── brand
│   │   ├── dto # contains the brand dto
│   │   ├── entities/
│   │   │   ├── brand.entity.ts # The brand model
│   │   ├── brand.controller.ts
│   │   ├── brand.module.ts
│   │   ├── brand.service.ts
│   ├── user
│   │   ├── dto # contains the brand dto
│   │   ├── entities/
│   │   │   ├── user.entity.ts # The user model
│   │   ├── user.controller.ts
│   │   ├── user.module.ts
│   │   ├── user.service.ts
├── services/
│    ├── securityUtil.service.ts # This service contain methods used hashing and verifying password,creating and validating tokens
├── app.module.ts 
├── swagger.ts
└── main.ts
```

## 3. Some NPM commands

```sh
# development
$ npm run start

# watch mode
$ npm run start:dev

# Lint the project files using TSLint
$ npm run lint

# Format document
$ npm run format

# Run the migrations
$ npm run migration

# Revert the migrations
$ npm run migration:down
```

## 4. Technologies/Tools

- NestJS
- ObjectionJs
- KnexJs
- TypeScript
