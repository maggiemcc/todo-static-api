# TODOS STATIC WEB SERVER
- npm intall
- npm install body-parser
- npm install express
- npm install node-fetch

run on http://localhost:5000
        - get todos: http://localhost:5000/todos
        - get single todo: http://localhost:5000/1



* Located in [fetching](https://github.com/maggiemcc/todo-static-api/blob/master/public/index.js)

## 1- GET TODOS:
- GET all todos: 
<!-- [Todos Route](https://github.com/maggiemcc/todo-static-api/blob/master/routes/todos.js) -->
- Gets and displays every todo item in the original allTodos object array by creating using fetch, creating a layout,and then displayed using innerHTML.
   

## 2- POST TODOS:
- POST/Add new todos: 
<!-- [Todos Route](https://github.com/maggiemcc/todo-static-api/blob/master/routes/todos.js) -->
- Created addEventListener for the "Add" button. Takes the value users type and then uses the fetch method: 'POST' to add the task to the list based on the public/routes/todos/ router.post.


## 3- PUT TODOS:
- PUT/update todos: 
<!-- [Todos Route](https://github.com/maggiemcc/todo-static-api/blob/master/routes/todos.js) -->
- Updates/edits a current todo task and changes it's values based on user input using

## 4- DELETE TODOS:
- DELETE todos: 
<!-- [Todos Route](https://github.com/maggiemcc/todo-static-api/blob/master/routes/todos.js) -->
 - Looks for task id given using array.find