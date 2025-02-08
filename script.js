const addButton = document.getElementById('addTask');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

loadTasks();

function addTask() {

    const task = taskInput.value.trim();

    if (task) {
        createTaskElement(task)
        taskInput.value = ' ';

        saveTasks()
    } else{
        alert('Please enter a task!');
    }
}

addButton.addEventListener('click', addTask);

function createTaskElement(task){
    const listItem = document.createElement('li');

    listItem.textContent = task;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.className = 'deleteTask';

    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);

    deleteButton.addEventListener('click', function(){
        listItem.classList.add('fade-out');
        setTimeout(function() {
            taskList.removeChild(listItem); // Remove the task after the animation
            saveTasks(); // Save the updated task list
        }, 500);
    });

}

function saveTasks(){
    let tasks = [];
    taskList.querySelectorAll('li').forEach(function(item) {
        tasks.push(item.textContent.replace('X', '').trim());
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks(){
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(createTaskElement);
}
