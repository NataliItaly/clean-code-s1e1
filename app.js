const taskInput=document.getElementById("new-task-input");//Add a new task.
const addButton=document.getElementsByTagName("button")[0];//first button
const incompleteTaskHolder=document.getElementById("incompleted-tasks");//ul of #incompleteTasks
const completedTasksHolder=document.getElementById("completed-tasks");//completed-tasks


// Create new task
function createNewTaskElement(taskString) {
  const listItem=document.createElement("li");
  listItem.classList.add("task__item");

  const checkBox=document.createElement("input");
  checkBox.type="checkbox";
  checkBox.classList.add('task__checkbox')

  const label=document.createElement("label");
  label.classList.add('task__label');
  label.innerText=taskString;

  const editInput=document.createElement("input");
  editInput.type="text";
  editInput.classList.add('task__input');

  const editButton=document.createElement("button");
  editButton.classList.add('btn', 'edit__btn');

  const deleteButton=document.createElement("button");
  deleteButton.classList.add('btn', 'delete__btn');
  const deleteButtonImg=document.createElement("img");
  deleteButtonImg.classList.add('task__delete-img')


  editButton.innerText="Edit";
  deleteButtonImg.src='./remove.svg';
  deleteButton.appendChild(deleteButtonImg);

  listItem.append(checkBox, label, editInput, editButton, deleteButton);

  return listItem;
}



function addTask() {
  if (!taskInput.value) return;
  const listItem=createNewTaskElement(taskInput.value);
  incompleteTaskHolder.append(listItem);
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value="";
}

//Edit an existing task.

function editTask() {
  const listItem=this.parentNode;
  const editInput=listItem.querySelector('.task__input');
  const label=listItem.querySelector(".task__label");
  editInput.classList.toggle('edit-task__input');
  label.classList.toggle('edit-task__label')
  const editBtn=listItem.querySelector(".edit__btn");
  const containsClass=listItem.classList.contains("edit-task");
  //If class of the parent is .edit-task
  if (containsClass) {
    //switch to .edit-mode
    //label becomes the inputs value.
    label.innerText=editInput.value;
    editBtn.innerText="Edit";
  } else {
    editInput.value=label.innerText;
    editBtn.innerText="Save";
  }

  //toggle .edit-mode on the parent.
  listItem.classList.toggle("edit-task");
};


//Delete task.
function deleteTask() {
  const listItem=this.parentNode;
  const ul=listItem.parentNode;
  //Remove the parent list item from the ul.
  ul.removeChild(listItem);
}


//Mark task completed
function taskCompleted() {
  //Append the task list item to the #completed-tasks
  const listItem=this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncompleted);
}


function taskIncompleted() {
  //Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the #incompleteTasks.
  const listItem=this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem,taskCompleted);
}

//The glue to hold it all together.
//Set the click handler to the addTask function.
addButton.addEventListener("click",addTask);

function bindTaskEvents(taskListItem,checkBoxEventHandler) {
  //select ListItems children
  const checkBox = taskListItem.querySelector(".task__checkbox");
  const editButton = taskListItem.querySelector(".edit__btn");
  const deleteButton = taskListItem.querySelector(".delete__btn");

  //Bind editTask to edit button.
  editButton.addEventListener('click', editTask);
  //Bind deleteTask to delete button.
  deleteButton.addEventListener('click', deleteTask);
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.addEventListener('change', checkBoxEventHandler);
}

function bindTasks(parent, handler) {
  for (const taskItem of parent.children) {
    bindTaskEvents(taskItem, handler);
  }
}

bindTasks(incompleteTaskHolder, taskCompleted);
bindTasks(completedTasksHolder, taskIncompleted);



// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.