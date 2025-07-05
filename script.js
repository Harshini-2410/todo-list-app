const API_URL = 'http://localhost:3000/tasks';

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const deleteAllBtn = document.getElementById("deleteAllBtn");
const exitBtn = document.getElementById("exitBtn");

// Load tasks from backend
async function loadTasks() {
  const res = await fetch(API_URL);
  const tasks = await res.json();
  taskList.innerHTML = '';

  tasks.forEach(task => {
    const li = document.createElement('li');

    // container for checkbox + text
    const taskContent = document.createElement('div');
    taskContent.className = 'task-content';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.done;

    if (task.done) li.classList.add('done');

    checkbox.onchange = () => {
      toggleTask(task._id, checkbox.checked);
      if (checkbox.checked) {
        li.classList.add('done');
      } else {
        li.classList.remove('done');
      }
    };

    const span = document.createElement('span');
    span.textContent = task.text;

    taskContent.appendChild(checkbox);
    taskContent.appendChild(span);

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.onclick = () => deleteTask(task._id);

    li.appendChild(taskContent);
    li.appendChild(delBtn);

    taskList.appendChild(li);
  });
}

// Add new task
async function addTask() {
  const text = taskInput.value.trim();
  if (text === '') return alert('Please enter a task!');
  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });
  taskInput.value = '';
  loadTasks();
}

// Toggle task done
async function toggleTask(id, done) {
  await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ done })
  });
  // No need to reload here — UI updates instantly
}

// Delete single task
async function deleteTask(id) {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  loadTasks();
}

// Delete all tasks
async function deleteAllTasks() {
  await fetch(API_URL, { method: 'DELETE' });
  loadTasks();
}

// Exit app (close window)
function exitApp() {
  window.close();
}

// Event listeners
addBtn.addEventListener('click', addTask);
deleteAllBtn.addEventListener('click', deleteAllTasks);
exitBtn.addEventListener('click', exitApp);

// Initial load
loadTasks();
