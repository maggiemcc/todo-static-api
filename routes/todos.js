const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

let allTodos = [
  { id: 1, task: "Go to school", complete: false },
  { id: 2, task: "Go to work", complete: false },
  { id: 3, task: "Go to dentist", complete: false },
  { id: 4, task: "Do homework", complete: false },
  { id: 5, task: "Go to the gym", complete: false },
];

// Get - get all tasks
router.get("/", (req, res) => {
  res.status(200).json(allTodos);
});

router.get("/todos", (req, res) => {
  res.json({ message: "todo app nodejs api" });
});

// Get - get tasks by ID
router.get("/:taskId", (req, res) => {
  let found = allTodos.find((item) => {
    return item.id === parseInt(req.params.taskId);
  });

  if (found) {
    res.status(200).json(found);
  } else {
    res.status(404).json({ message: "Task does not exist" });
  }
});
// router.get('/add', (req, res) =>{
//   res.status(200).json(found);

// })

// POST - add new task
router.post("/add", (req, res) => {
  let newId = allTodos.length + Math.floor(Math.random() * 258);

  const { id, task, complete } = req.body;

  const taskExists = allTodos.find((item) => item.task === task);

  let newTask = {
    id: newId,
    task: req.body.task,
    complete: false,
}

  if (taskExists) return res.status(404);

  allTodos.push(newTask);
  res.json(newTask);
});

// PUT - update tasks (working- with help from youtube tutorial)
router.put("/:taskId", async (req, res) => {
  const { taskId } = req.params;

  const { id, task, complete } = req.body;

  const editTask = allTodos.find((item) => item.task === taskId);
  // if (!editTask) return res.send.json({ message: "Task already exists." });
  if (!editTask) {return res.status(404)}

  // check that val is present, if not use prev. if new val use new.
  const updatedField = (val, prev) => (!val ? prev : val);

  const updatedTask = {
    ...editTask,
    id,
    task: updatedField(task, editTask.task),
    complete: updatedField(complete, editTask.complete),
  };

  const taskIndex = allTodos.findIndex((item) => item.id === taskId);
  allTodos.splice(taskIndex, 1, updatedTask);
  res.send(updatedTask);
  res.json(updatedTask);
});

// DELETE - delete task
router.delete("/:taskid", (req, res) => {
  const { taskid } = req.params;
  allTodos = allTodos.filter((todo) => todo.id != taskid);
  res.send(allTodos);
});

// PUT - update task
// router.put("/:taskid", (req, res) => {
//   const { taskid } = req.params;
//   const { id, task, complete } = req.body;

//   const taskToEdit = allTodos.find((todo) => todo.id === taskid);

//   if (id) taskToEdit.id = id;
//   if (task) taskToEdit.task = task;
//   if (complete) taskToEdit.complete = complete;

//   if (!taskToEdit) return res.json({ message: "Task already exists." });


//   res.send(taskToEdit);
// });

module.exports = router;
