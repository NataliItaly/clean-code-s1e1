//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

const taskInput=document.getElementById("new-task-input");//Add a new task.
const addButton=document.getElementsByTagName("button")[0];//first button
const incompleteTaskHolder=document.getElementById("incompleted-tasks");//ul of #incompleteTasks
const completedTasksHolder=document.getElementById("completed-tasks");//completed-tasks


//New task list item
function createNewTaskElement(taskString) {
  const listItem=document.createElement("li");
  listItem.classList.add("task__item");
  //input (checkbox)
  const checkBox=document.createElement("input");//checkbx
  checkBox.classList.add('task__checkbox')
  //label
  const label=document.createElement("label");//label
  label.classList.add('task__label');
  //input (text)
  const editInput=document.createElement("input");//text
  editInput.classList.add('task__input');
  //button.edit
  const editButton=document.createElement("button");//edit button
  editButton.classList.add('btn', 'edit__btn');

  //button.delete
  const deleteButton=document.createElement("button");//delete button
  deleteButton.classList.add('btn', 'delete__btn');
  const deleteButtonImg=document.createElement("img");//delete button image
  deleteButtonImg.classList.add('task__delete-img')

  label.innerText=taskString;

  //Each elements, needs appending
  checkBox.type="checkbox";
  editInput.type="text";

  editButton.innerText="Edit";
  deleteButtonImg.src='./remove.svg';
  deleteButton.appendChild(deleteButtonImg);


  //and appending.
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}



function addTask() {
  //Create a new list item with the text from the #new-task-input:
  if (!taskInput.value) return;
  const listItem=createNewTaskElement(taskInput.value);

  //Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
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



function ajaxRequest() {
  console.log("AJAX Request");
}

//The glue to hold it all together.
//Set the click handler to the addTask function.
addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


const bindTaskEvents=function(taskListItem,checkBoxEventHandler) {
  //select ListItems children
  const checkBox=taskListItem.querySelector("input[type=checkbox]");
  const editButton=taskListItem.querySelector(".edit__btn");
  const deleteButton=taskListItem.querySelector(".delete__btn");

  //Bind editTask to edit button.
  editButton.onclick=editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick=deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (let child of incompleteTaskHolder.children) {
  //bind events to list items chldren(tasksCompleted)
  bindTaskEvents(child, taskCompleted);
}

//cycle over completedTasksHolder ul list items
for (let child of completedTasksHolder.children) {
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(child, taskIncompleted);
}


// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.