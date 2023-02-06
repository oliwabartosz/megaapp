// Imports
import {QuerySelectionHandler, updateStatus, showMenu, deleteTask, clearAllData} from "./utils.js";

import {SyncData} from './sync.js';

// Initials
const syncData = new SyncData();
let editId;
let isEditedTask = false;

// Query Selectors (QS)
const taskInput = document.querySelector('.task-input input');

// QS - Checkboxes
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
QuerySelectionHandler(checkboxes, updateStatus)

// QS - menus with edit and delete options
const taskMenus = document.querySelectorAll('.settings')
QuerySelectionHandler(taskMenus, showMenu)

// QS - delete option
const deleteTasks = document.querySelectorAll('#delete')
QuerySelectionHandler(deleteTasks, deleteTask)

// QS - edit option
const editTasks = document.querySelectorAll('#edit')
QuerySelectionHandler(editTasks, editTask);

//@TODO - how to move it to utils.js?
function editTask (selectedTask) {
  const id = Number(selectedTask.getAttribute('index'));
  taskInput.value = todos[id].task
  editId = id;
  isEditedTask = true;
}

// QS - clear all data
const clearAllBtn = document.querySelector('.clear-btn');

clearAllBtn.addEventListener('click', async () => {
 await clearAllData();
});

// QS - filters
const filters = document.querySelectorAll('.filters span');
//@ TODO - make for of and move to .utils.js
filters.forEach(btn => {
  btn.addEventListener('click', async () => {
    document.querySelector('span.active').classList.remove('active');
    btn.classList.add('active');
  })
});


// Getting data from server to local storage
let todos = JSON.parse(localStorage.getItem('todo-list'))
if (!todos) {
  const response = await fetch('http://localhost:3000/todo/todo.json');
  const responseJSON = await response.json();
  todos = JSON.parse(responseJSON);
  localStorage.setItem('todo-list', JSON.stringify(todos));
}

taskInput.addEventListener('keypress', async (event) => {

  const userTask = taskInput.value.trim();
  // prevent empty data -> trim and && userTask
  if (event.key === 'Enter' && userTask) {
    if (!isEditedTask) {
      const taskData = {task: userTask, completed: false};
      todos.push(taskData);
      taskInput.value = '';
    } else {
      isEditedTask = false;
      todos[editId].task = userTask
    }
    localStorage.setItem('todo-list', JSON.stringify(todos));
    await syncData.send(todos);
  }
});

export {todos, taskInput}
