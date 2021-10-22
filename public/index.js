(function (window) {
  // Display all todos
  //   const listOfTodos = document.querySelector("#incomplete-tasks");
  let layout = "";

  fetch("/todos")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((todo) => display(todo));
    });

  function display(todo) {
    let ul = document.querySelector("#incomplete-tasks");

    layout += `
	 	<li data-id="${todo.id}">
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

  // Create/Add new todo
  const newTaskInput = document.querySelector("#new-task");
  const createTask = document.querySelector("#add-task");
  console.log(createTask);

  createTask.addEventListener("click", () => {
    let inputTask = JSON.stringify({
      task: newTaskInput.value,
    });

    fetch("/todos", {
      method: "POST",
      body: inputTask,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        display(data);
      });
  });


  // Delete & Edit todos
  const tasks = document.querySelector("#incomplete-tasks");
//   const indivTask = document.querySelector('.todoTask');

  console.log(tasks);
  tasks.addEventListener("click", (event) => {
    event.preventDefault();
    let deletePressed = event.target.id == "delete";
    let id = event.target.parentElement.parentElement.dataset.id;

	if(deletePressed) {
		console.log(`remove task ${id}`);
		fetch(`../todos/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			  }
		})
		.then(res => res.json())
		// .then(() => location.reload())	
	}


      let editPressed = event.target.id === "edit";

    if(editPressed){
    	// console.log('edit task')
    	// const taskTitle = document.querySelector('.task-input')
    	// const typedName = document.querySelector('.task-name')
    	const parent = event.target.parentElement.parentElement;
    	let taskName = parent.querySelector(".task-name").textContent;
    	console.log(taskName);
	}
  });


})(window);
