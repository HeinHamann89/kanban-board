const tasks = document.querySelectorAll('.task');
let draggedTask = null;

tasks.forEach(task => {
  task.addEventListener('dragstart', handleDragStart);
  task.addEventListener('dragover', handleDragOver);
  task.addEventListener('drop', handleDrop);
});

function handleDragStart(event) {
    draggedTask = this;
    event.dataTransfer.setData('text/plain', event.target.id);
    event.dataTransfer.effectAllowed = 'move';
  }
  
  function handleDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }
  
  function handleDrop(event) {
    event.preventDefault();
    const dropTarget = this;
    const dropTargetTasks = dropTarget.querySelector('.tasks');
    const taskToMove = document.getElementById(event.dataTransfer.getData('text'));
  
    if (draggedTask !== taskToMove) {
      dropTargetTasks.insertBefore(taskToMove, this.nextSibling);
    }
  }
  
  const form = document.querySelector('.add-task form');
form.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(event) {
  event.preventDefault();
  const taskName = event.target.elements['task-name'].value;
  const taskColumn = event.target.elements['task-column'].value;
  const taskContainer = document.getElementById(`${taskColumn}-tasks`);
  const newTask = createNewTask(taskName);
  taskContainer.appendChild(newTask);
  event.target.reset();
}

function createNewTask(taskName) {
    const task = document.createElement('div');
    task.classList.add('task');
    task.setAttribute('draggable', true);
    task.setAttribute('id', `task-${new Date().getTime()}`);
    task.textContent = taskName;
  
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = 'X';
    deleteButton.addEventListener('click', handleDeleteButtonClick);
  
    task.appendChild(deleteButton);
    task.addEventListener('dragstart', handleDragStart);
  
    return task;
  }
  
  function handleDeleteButtonClick(event) {
    const task = event.target.parentNode;
    task.remove();
  }
  
  function handleDragOver(event) {
    event.preventDefault();
  }
  
  
  function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
  function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
  }
  