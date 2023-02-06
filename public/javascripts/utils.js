import {todos, taskInput} from "./fetch.js";
import {SyncData} from "./sync.js";

const syncData = new SyncData;

function QuerySelectionHandler(querySelectorAll, functionToUse) {
  for (const element of querySelectorAll) {
    element.addEventListener('click', function (event) {
      functionToUse(event.target);
    });
  }
}

const updateStatus = (selectedTask) => {
  const taskName = selectedTask.parentElement.lastElementChild;

  // checkbox properties: https://www.w3schools.com/jsref/dom_obj_checkbox.asp
  if (selectedTask.checked) {
    taskName.classList.add('checked')
    todos[selectedTask.id].completed = true;
  } else {
    taskName.classList.remove('checked');
    todos[selectedTask.id].completed = false;
  }
  localStorage.setItem('todo-list', JSON.stringify(todos));
  syncData.send(todos)
  window.location.reload();
}

function showMenu(selectedTask) {
  const taskMenu = selectedTask.lastElementChild;
  if (taskMenu !== null) {
    taskMenu.classList.add('show')
    document.addEventListener("click", event => {
      // If click menu with edit and delete options disappears
      if (event.target !== selectedTask) {
        taskMenu.classList.remove('show');
      }
    })
  }
}

async function deleteTask(selectedTask) {
  const id = selectedTask.getAttribute('index')
  // deleting from local storage
  todos.splice(id, 1);
  localStorage.setItem('todo-list', JSON.stringify(todos));

  // deleting on a server
  const response = await fetch('http://localhost:3000/todo/', {
    method: 'DELETE',
    body: JSON.stringify({id}),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  window.location.reload();
}

async function clearAllData() {
  // deleting ALL from local storage
  todos.splice(0, todos.length);
  localStorage.setItem('todo-list', JSON.stringify(todos));
  // deleting on a server
  const response = await fetch('http://localhost:3000/todo/delete-all', {
    method: 'DELETE',
  });
  localStorage.clear()
  window.location.reload();
}


export {QuerySelectionHandler, updateStatus, showMenu, deleteTask, clearAllData};