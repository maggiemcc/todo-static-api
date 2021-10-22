# TODOS
* Located in [Todos Route](https://github.com/maggiemcc/todo-static-api/blob/master/public/routes/todos.js)

## 1- GET TODOS:
- GET all todos: at line 15 in [Todos Route](https://github.com/maggiemcc/todo-static-api/blob/master/public/routes/todos.js)
     * Gets and displays every todo item in the original allTodos object array.
        * EX: POSTMAN using "GET":
            - `https://localhost5000/todos`
   

## 2- POST TODOS:
- POST/Add new todos: at line 34 in [Todos Route](https://github.com/maggiemcc/todo-static-api/blob/master/public/routes/todos.js)
     * Creates a new task by taking user input for req.body and pushing it to the object array if the task doesn't already exist based on array.find.
        * EX: POSTMAN using "POST": in postman body, using raw, type a new task to be added:
            - `https://localhost5000/todos/`,
            {
                "id": 6,
                "task": "sleep",
                "category": "school",
                "complete": false
            }


## 3- PUT TODOS:
- PUT/update todos: at line 54 in [Todos Route](https://github.com/maggiemcc/todo-static-api/blob/master/public/routes/todos.js)
    * Updates/edits a current todo task and changes it's values based on user input using array.find to find the task and then use array.splice to remove the original and replace it with updated task values. Any changes will be displayed, otherwise it will take the prev value if left empty/unchanged.
        * EX: POSTMAN using "PUT": in postman body, using raw, type any values to be updated:
            - `https://localhost5000/todos/go to work`, {"task": "went to work"}

## 4- DELETE TODOS:
- DELETE todos: at line 81 in [Todos Route](https://github.com/maggiemcc/todo-static-api/blob/master/public/routes/todos.js)
    * Looks for task name given using array.find, if task is found the array.filter is used to remove the task from the main object array. Else, if task isn't found it will return an error message.
        * EX: POSTMAN using "DELETE":
            - `https://localhost5000/todos/go to work`