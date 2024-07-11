# NODE.JS Assignment2 (Todo App With Users) (API ONLY)

## Steps to locally setup

-   Install Node.js version 18 or above on your system, here is the link: [Node.js](https://nodejs.org/en)

```sh
    git clone https://github.com/Ganesh896/LF-Node-TodoAPP
    cd server

    # switch branch to todo-user
    git chekout assignment3

    npm install

    # Add in .env file
    PORT=3000
    JWT_SECRET='secret'

    # Finally run
    npm run start
```

# API routes/paths

### login adim
-   http://localhost:3000/users/login (POST request)

```sh
    {
        "email" : "admin@gmail.com",
        "password" : "admin123"
    }
```

# THESE ROUTES CAN ACCESS ONLY BY ADMIN

### create user
-   http://localhost:3000/users (POST request)

```sh
    {
        "name": "User1",
        "email" : "user1@gmail.com",
        "password" : "user1"
    }
```

### get all users
-   http://localhost:3000/users (GET request)

### get user by Id
-   http://localhost:3000/users/id (GET request)

### update user by Id
-   http://localhost:3000/users/id (PUT request)
```sh
    {
        "name": "User1",
        "email" : "user1@gmail.com",
    }
```

### delete user by Id
-   http://localhost:3000/users/id (DELETE request)

### login user
-   http://localhost:3000/users/login (POST request)

```sh
    {
        "email" : "user1@gmail.com",
        "password" : "user1"
    }
```

## To access these routes set accessToken in Authorization->Bearer Token->Token

### To fetch all todos
-   http://localhost:3000/todos (GET request)

### To fetch todo by id
-   http://localhost:3000/todos/id (GET request)

### To add todo
-   http://localhost:3000/todos (POST request)

```sh
    {
        "title" : "title name",
        "description" : "description text"
    }
```

### To update todo
-   http://localhost:3000/todos/id (PUT request)

```sh
    {
        "title" : "new title name",
        "description" : "new description text"
    }
```

### To delete todo by id
-   http://localhost:3000/todos/id (DELETE request)

### To mark todo as completed by id
-   http://localhost:3000/completed/id (PUT request)

### To see completed todos
-   http://localhost:3000/completed (GET request)
