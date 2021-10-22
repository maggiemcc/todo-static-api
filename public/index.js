// Display all todos
let layout = "";

function displaying(todo) {
  let ul = document.querySelector("#incomplete-tasks");

  layout += `
	 	<li class="todo-task" data-id="${todo.id}">
    	<label class="task-name">${todo.task}</label>
    	<input class="task-input" type="text" />

		<div id="icons">
    	<button id="edit">Edit</button>
    	<button id="delete">Delete</button>
		</div>
		</li>
	`;

  ul.innerHTML = layout;
}
fetch("/todos")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((todo) => displaying(todo));
  });

// Create/Add new todo
const newTaskInput = document.querySelector("#new-task");
const createTask = document.querySelector("#add-task");

createTask.addEventListener("click", () => {
  let inputTask = JSON.stringify({
    task: newTaskInput.value,
  });

  fetch("/todos/add", {
    method: "POST",
    body: inputTask,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      displaying(data);
    });
});

// Delete todos
const tasks = document.querySelector("#incomplete-tasks");
tasks.addEventListener("click", (event) => {
  event.preventDefault();

  let deleteBtnPressed = event.target.id == "delete";
  let id = event.target.parentElement.parentElement.dataset.id;

  if (deleteBtnPressed) {
    fetch(`/todos/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => location.reload());
  }
});

// Edit todos
//   const indivTask = document.querySelector('.todoTask');

tasks.addEventListener("click", (event) => {
  event.preventDefault();

  let editPressed = event.target.id === "edit";
  let id = event.target.parentElement.parentElement.dataset.id;
  if (editPressed) {
    // console.log('edit task')
    // const taskTitle = document.querySelector('.task-input')
    // const typedName = document.querySelector('.task-name')
    const parent = event.target.parentElement.parentElement;
    let taskName = parent.querySelector(".task-name").textContent;
    console.log(taskName);
  }

  if (editPressed) {
    fetch(`/todos/${id}`, {
      method: "PUT",
    }).then((res) => res.json());
  }
});
