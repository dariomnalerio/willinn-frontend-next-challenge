# Willin Front-End Next Challenge

## Overview

This project features a web application made with Next.js that allows users to log-in, view a list of users, add, edit and delete users by consuming a REST API.

## Getting Started

1. Clone the repository

    ```bash
    git clone https://github.com/dariomnalerio/willinn-frontend-next-challenge.git
    cd willinn-frontend-next-challenge
    ```
2. Install dependencies

    ```bash
    npm install
    ```
3. Run the development server

    ```bash
    npm run dev
    ```

### Building the project
To build the project for production with docker:
  
  ```bash
    docker compose up --build
  ```

## Configuration

The project uses `.env` and `.env.local` files to store environment variables. Create them in the root of the project and add the following variables:

```bash
NEXT_PUBLIC_API_URL="URL_TO_API"
NODE_ENV="production" or "development"
```

## Project Architecture
The project uses a feature-based approach. Each feature contains its own components, pages, hooks, and services. Global parts of the project are stored in its respective folder in the `src` directory.

1. **Components**: Reusable components. In the `src/components` directory it also contains reusable primitives such as `Button`, `Input`, and so on, as well as icons that are used throughout the app.
2. **Hooks**: Custom hooks, such as `useQueryString`
3. **Types**: Typescript types and interfaces
4. **Utils**: Utility functions
5. **Stores**: Global state management using useContext, useState and useReducer
6. **Validators**: Validation functions for forms
7. **Actions**: Next.js server actions to log-in and fetch or mutate data

## Middleware

The project includes middleware that checks for the existence of a token cookie. If the token cookie is not present, the middleware will redirect the user to the login view, ensuring that protected routes are only accessible to authenticated users.
