
let pendingTasks = [];
let completedTasks = [];

function displayTasks() {
  document.getElementById('pendingTasks').innerHTML = '';
  document.getElementById('completedTasks').innerHTML = '';
  
  pendingTasks.forEach((task, index) => {
    let li = document.createElement('li');
    li.innerHTML = `
      <span>${task.name} (Added: ${task.date})</span>
      <button class="edit-btn" onclick="editTask(${index}, 'pending')">Edit</button>
      <button class="delete-btn" onclick="deleteTask(${index}, 'pending')">Delete</button>
      <button onclick="markComplete(${index}, 'pending')">Mark Complete</button>
    `;
    document.getElementById('pendingTasks').appendChild(li);
  });

  completedTasks.forEach((task, index) => {
    let li = document.createElement('li');
    li.classList.add('completed');
    li.innerHTML = `
      <span>${task.name} (Completed: ${task.date})</span>
      <button class="edit-btn" onclick="editTask(${index}, 'completed')">Edit</button>
      <button class="delete-btn" onclick="deleteTask(${index}, 'completed')">Delete</button>
    `;
    document.getElementById('completedTasks').appendChild(li);
  });
}

function addTask() {
  let taskName = document.getElementById('taskInput').value;
  if (taskName === '') {
    alert('Please enter a task.');
    return;
  }

  let task = {
    name: taskName,
    date: new Date().toLocaleString(),
  };

  pendingTasks.push(task);
  displayTasks();
  document.getElementById('taskInput').value = ''; // clear input
}

function markComplete(index, list) {
  if (list === 'pending') {
    let task = pendingTasks.splice(index, 1)[0];
    completedTasks.push(task);
  } else if (list === 'completed') {
    alert('Task is already completed.');
    return;
  }
  displayTasks();
}

function deleteTask(index, list) {
  if (list === 'pending') {
    pendingTasks.splice(index, 1);
  } else if (list === 'completed') {
    completedTasks.splice(index, 1);
  }
  displayTasks();
}

function editTask(index, list) {
  let newTaskName = prompt('Edit task:', list === 'pending' ? pendingTasks[index].name : completedTasks[index].name);
  if (newTaskName === null || newTaskName === '') return;

  if (list === 'pending') {
    pendingTasks[index].name = newTaskName;
  } else if (list === 'completed') {
    completedTasks[index].name = newTaskName;
  }
  displayTasks();
}
