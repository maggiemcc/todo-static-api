const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

let allTodos = [
  { id: 1, task: "go to school", complete: false },
  { id: 2, task: "go to work", complete: false },
  { id: 3, task: "go to dentist", complete: false },
  { id: 4, task: "do homework", complete: false },
  { id: 5, task: "go to gym", complete: false },
];

// Get - get all tasks
router.get("/", (req, res) => {
  res.status(200).json(allTodos);
});

router.get('/todos', (req, res) => {
    res.json({message: 'todo app nodejs api'});
})

// Get - get tasks by ID
router.get('/:taskId', (req, res) => {
    let found = allTodos.find((item) => {
        return item.id === parseInt(req.params.taskId);
      });
    
      if (found) {
        res.status(200).json(found);
      } else {
        res.status(404).json({message: "Task does not exist"});
      }
});

// POST - add new task
router.post("/", (req, res) => {
  let newId = allTodos.length + Math.floor(Math.random() * 258);

  const { id, task, complete } = req.body;

  const taskExists = allTodos.find((item) => item.task === task);
  if (taskExists) return res.send.json({message: "Task already exists."});

  let newTask = {
    id: newId,
    task: req.body.task,
    complete: false,
  };

  allTodos.push(newTask);
  res.json(newTask);
});

// // PUT - update tasks (working- with help from youtube tutorial)
// router.put("/:taskId", async (req, res) => {
//   const { taskId } = req.params;

//   const { id, task, complete } = req.body;

//   const editTask = allTodos.find((item) => item.task === taskId);
//   if (!editTask) return res.send(JSON.parse("task does not exist"));

//   // check that val is present, if not use prev. if new val use new.
//   const updatedField = (val, prev) => (!val ? prev : val);

//   const updatedTask = {
//     ...editTask,
//     id,
//     task: updatedField(task, editTask.task),
//     // category: updatedField(category, editTask.category),
//     complete: updatedField(complete, editTask.complete),
//   };

//   const taskIndex = allTodos.findIndex((item) => item.id === taskId);
//   allTodos.splice(taskIndex, 1, updatedTask);
//   res.send(updatedTask);
//   res.json(updatedTask);
// });


// DELETE - delete task
router.delete("/:taskId", (req, res) => {
  const { taskId } = req.params;

  let removeTask = allTodos.find((item) => item.id === taskId);
  if (!removeTask) return res.status(404).json({message: "task does not exist"})
  else {
      allTodos.splice(index, 1);
        res.status(200).json({message: "Success"})
  }

//   allTodos = allTodos.find((item) => item.id !== taskId);
//   console.log(item)
//   res.status(200).json({message: "Success"})
});

module.exports = router;