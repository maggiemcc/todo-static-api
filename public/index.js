(function (window) {
// Display all todos
function showAllTodos(todo) {
  let ul = document.querySelector("#incomplete-tasks");

  let todoLayout = `
  <li class="todo-task" data-id="${todo.id}">
   <label class="id-number">${todo.id}:</label>
   <label class="task-name">${todo.task}</label>

 <div id="icons">
   <button id="edit">Edit</button>
   <button id="delete">Delete</button>
 </div>
 </li>
`;

  ul.innerHTML += todoLayout;
}
fetch("/todos", {
  method: "GET",
  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
})
  .then((res) => res.json())
  .then((data) => {
    data.forEach((todo) => showAllTodos(todo));
  });

// Create/Add new todo
const newTaskInput = document.querySelector("#new-task");

const createTask = document.querySelector("#add-task");

createTask.addEventListener("click", (event) => {
  event.preventDefault();
  console.log('new task created')
  
  fetch("/todos/add", {
    method: "POST",
    body: JSON.stringify({ task: newTaskInput.value }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      showAllTodos(data);
    })
    .then(() => location.reload());
});

// Delete todos
const tasks = document.querySelector("#incomplete-tasks");
tasks.addEventListener("click", (event) => {
  let deleteBtnPressed = event.target.id == "delete";
  let id = event.target.parentElement.parentElement.dataset.id;

  if (deleteBtnPressed) {
    fetch(`/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then(() => location.reload())
      .catch((error) => {
        console.log(error);
      });
  }
});

// Edit todos (works as far as displaying task in input field)
const editTaskInput = document.querySelector("#edit-task");
const updateTask = document.querySelector("#update-task");


tasks.addEventListener("click", (event) => {
  event.preventDefault();

  let editBtnPressed = event.target.id == "edit";
  let id = event.target.parentElement.parentElement.dataset.id;

  if (editBtnPressed) {
    console.log(`Editing task ${id}`);

    const taskLiElement = event.target.parentElement.parentElement;

    let taskTitle = taskLiElement.querySelector(".task-name").textContent;
    editTaskInput.value = taskTitle;


    updateTask.addEventListener("click", () => {
      event.preventDefault();

      console.log("post updated");

      fetch(`/todos/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          task: taskTitle.value,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => res.json())
        .catch((error) => {
          console.log(error);
        })
        .then(() => location.reload());
    });
  }
});
})(window);