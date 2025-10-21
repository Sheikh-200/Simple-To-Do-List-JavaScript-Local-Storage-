// Select elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Load tasks from Local Storage when page loads
document.addEventListener('DOMContentLoaded', loadTasks);

// Add task event
addTaskBtn.addEventListener('click', addTask);

// Function to add a task
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const task = { text: taskText, completed: false };
    let tasks = getTasksFromStorage();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    createTaskElement(task);
    taskInput.value = '';
}

// Function to create task HTML element
function createTaskElement(task) {
    const li = document.createElement('li');
    li.textContent = task.text;
    if (task.completed) li.classList.add('completed');

    // Toggle complete on click
    li.addEventListener('click', () => {
        li.classList.toggle('completed');
        updateTaskStatus(task.text, li.classList.contains('completed'));
    });

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('deleteBtn');
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        li.remove();
        deleteTask(task.text);
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

// Load tasks from localStorage
function loadTasks() {
    const tasks = getTasksFromStorage();
    tasks.forEach(task => createTaskElement(task));
}

// Get tasks from localStorage
function getTasksFromStorage() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

// Update task completion status
function updateTaskStatus(taskText, completed) {
    let tasks = getTasksFromStorage();
    tasks = tasks.map(task => task.text === taskText ? { ...task, completed } : task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Delete a task from localStorage
function deleteTask(taskText) {
    let tasks = getTasksFromStorage();
    tasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
