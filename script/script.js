"use strict";
//TODO handle duplicate text entries for removal
// initial variable declaration
const newTodoItem = document.getElementById("newTask");
const submit = document.getElementById("submit");
const taskListHTML = document.getElementById("taskList");
const form = document.getElementById("form");
let taskList = [];

const addNewTask = (taskName) => {
  //push new task to array
  taskList.push(taskName);
  createPageElements(taskName);
  localStorage.setItem("tasks", taskList);
  //reset the textbox to blank
  newTodoItem.value = "";
};

const createPageElements = (taskName) => {
  // create the html elements for the new task
  const li = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.setAttribute("id", taskList.length);
  checkbox.setAttribute("value", taskName);
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("name", "todoItem");
  const label = document.createElement("label");
  label.setAttribute("for", taskList.length);
  label.innerHTML = taskName;
  const removeButton = document.createElement("a");
  removeButton.innerHTML = "Delete";
  removeButton.setAttribute("name", "delete");
  removeButton.setAttribute("id", taskList.length);
  //append all items to the li
  li.append(checkbox);
  li.append(label);
  li.append(removeButton);
  li.setAttribute("name", "todoItem");
  li.setAttribute("id", taskList.length);
  //append the li to the tasklist container (ul)
  taskListHTML.append(li);
  //add the eventlisteners for the checkbox and the remove button
  document
    .querySelector("li:last-child")
    .addEventListener("change", checkTaskState);
  const remove = document.querySelectorAll("li > a");
  remove[remove.length - 1].addEventListener("click", removeTask);
};
// prevent the page from refreshing
const preventRefresh = (e) => {
  e.preventDefault();
  addNewTask(newTodoItem.value);
};

const checkTaskState = (e) => {
  //check if the checkbox is checked/unchecked and ajust styles acordingly
  if (e.target.checked) {
    e.target.nextSibling.style.textDecoration = "line-through";
    e.target.parentElement.style.backgroundColor = "#77DD77";
  } else {
    e.target.nextSibling.style.textDecoration = "none";
    e.target.parentElement.style.backgroundColor = "white";
  }
};
const removeTask = (e) => {
  // check for which task the delete button was pressed and delete all the html elements
  console.log(e.target.parentNode.children[1].innerHTML);
  let li = document.querySelectorAll(`li`);
  //remove the task from localStorage
  for (let i = 0; i < li.length; i++) {
    if (taskList[i] === e.target.parentNode.children[1].innerHTML) {
      taskList.splice(i, 1);
      localStorage.setItem("tasks", taskList);
    }
    // the task from the DOM
    if (Number(li[i].id) === Number(e.target.id)) {
      li[i].remove();
    }
  }
};

// check if there is anything stored in the localStorage
if (localStorage.getItem("tasks")) {
  const storedArray = localStorage.getItem("tasks").split(",");
  console.log("local storage has items to show");
  // add stored tasks to the DOM
  for (let i = 0; i < storedArray.length; i++) {
    addNewTask(storedArray[i]);
  }
}

//add the eventlisteners for the form elements
form.addEventListener("submit", preventRefresh);
submit.addEventListener("click", addNewTask);
