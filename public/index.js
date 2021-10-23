// Display all todos
function displaying(todo) {
  let ul = document.querySelector("#incomplete-tasks");

  let todoLayout = `
  <li class="todo-task" data-id="${todo.id}">
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
    data.forEach((todo) => displaying(todo));
  });

// Create/Add new todo
const newTaskInput = document.querySelector("#new-task");
const createTask = document.querySelector("#add-task");

createTask.addEventListener("click", (event) => {
  event.preventDefault();

  fetch("/todos/add", {
    method: "POST",
    body: JSON.stringify({task: newTaskInput.value}),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      displaying(data);
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
        console.log(error)
      });
  }
});

// Edit todos (works as far as displaying task in input field, but instead of replacing task it creates new)
tasks.addEventListener("click", (event) => {
  event.preventDefault();

  let editBtnPressed = event.target.id == "edit";
  let id = event.target.parentElement.parentElement.dataset.id;

  if (editBtnPressed) {
    console.log(`Editing task ${id}`);

    const taskLiElement = event.target.parentElement.parentElement;

    let taskTitle = taskLiElement.querySelector(".task-name").textContent;

    newTaskInput.value = taskTitle;

    // let btn = document.createElement("BUTTON");
    // btn.innerHTML = 'SAVE';
    // let icons = document.querySelector('#icons');
    // icons.appendChild(btn);

    createTask.addEventListener("click", () => {
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
          console.log(error)
        })
        .then(() => location.reload())

    });
  }
});
