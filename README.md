# NODE.JS Assignment (Todo App) (API ONLY)
## Steps to locally setup

- Install Node.js version 18 or above on your system, here is the link:
[Node.js](https://nodejs.org/en)
```sh
    git clone https://github.com/Ganesh896/LF-Node-TodoAPP
    cd server
    npm install

    # Add in .env file
    PORT=3000

    # Finally run
    npm run start
```
# API routes/paths
### To fetch all todos
- http://localhost:3000/api/todos (GET request)
### To fetch todo by id
- http://localhost:3000/api/todos/id (GET request)
### To add todo
- http://localhost:3000/api/todos (POST request)
```sh
    {
        "title" : "title name",
        "description" : "description text"
    }
```
### To update todo
- http://localhost:3000/api/todos/id (PUT request)
```sh
    {
        "title" : "new title name",
        "description" : "new description text"
    }
```
### To delete todo by id
- http://localhost:3000/api/todos/id (DELETE request)
### To mark todo as completed by id
- http://localhost:3000/api/completedTodos/id (PUT request)

### To see completed todos
- http://localhost:3000/api/completedTodos (GET request)
