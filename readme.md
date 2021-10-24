# TODOS STATIC WEB SERVER
- npm intall
- npm install body-parser
- npm install express
- npm install node-fetch

- run on http://localhost:5000
    - get todos: http://localhost:5000/todos
    - get single todo: http://localhost:5000/todos/1

- Static folder: [public folder](https://github.com/maggiemcc/todo-static-api/blob/master/public)

* [Server File](https://github.com/maggiemcc/todo-static-api/blob/master/server.js)

## 1- GET TODOS:
- GET all todos: line 15
[Todos GET Route](https://github.com/maggiemcc/todo-static-api/blob/master/routes/todos.js)

- GET todos: on line 1
[Todos GET index.js](https://github.com/maggiemcc/todo-static-api/blob/master/public/index.js)
- Gets and displays every todo item in the original allTodos object array by creating using fetch, creating a layout,and then displayed using innerHTML.

   
## 2- POST TODOS:
- POST/Add new todos: line 41
[Todos POST Route](https://github.com/maggiemcc/todo-static-api/blob/master/routes/todos.js)

- POST todos: on line 29
[Todos POST index.js](https://github.com/maggiemcc/todo-static-api/blob/master/public/index.js)
- Created addEventListener for the "Add" button. Takes the value users type and then uses the fetch method: 'POST' to add the task to the list based on the public/routes/todos router.post().


## 3- PUT TODOS:
- PUT/update todos: line 55
[Todos Route](https://github.com/maggiemcc/todo-static-api/blob/master/routes/todos.js)

- PUT todos: on line 71
[Todos PUT index.js](https://github.com/maggiemcc/todo-static-api/blob/master/public/index.js)

- PUT only half works. My thought process was to have the task users wanted to edit display in the edit task input box and then after editing hit 'update todo' and it will replace the old task with the updated task.

## 4- DELETE TODOS:
- DELETE todos: on line 93
[Delete route/todos](https://github.com/maggiemcc/todo-static-api/blob/master/routes/todos.js)

- DELETE todos: on line 50
[Delete Todo index.js](https://github.com/maggiemcc/todo-static-api/blob/master/public/index.js)
 - created click eventlistener for delete button to deleted task with given id number and then reload page to show updated object array with removed task.