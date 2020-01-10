/* store targets in variable */
const new_task_text = document.getElementById("icon_prefix");
const new_task_add = document.getElementById("new_task_add");
const task_list = document.querySelector("#task_list").childNodes[1];
const delete_all = document.getElementById("btn_delete_all");

/* set all event listeners */
loadAllEventListeners();
function loadAllEventListeners() {
  document.addEventListener("DOMContentLoaded", loadTasks);
  new_task_text.addEventListener("keydown", addTask);
  new_task_add.addEventListener("click", addTaskBtn);
  task_list.addEventListener("click", deleteThisTask);
  delete_all.addEventListener("click", delete_all_btn);
}

/* function to load tasks from storage */
function loadTasks() {
  let tasksML;
  if (localStorage.getItem("tasksML") === null) {
    tasksML = [];
  } else {
    tasksML = JSON.parse(localStorage.getItem("tasksML"));
  }
  tasksML.forEach(function(t) {
    /* create li */
    const li_tag = document.createElement("li");
    /* add classes */
    li_tag.className = "card black white-text valign-wrapper";
    /* create and add text node */
    li_tag.appendChild(document.createTextNode(t));
    /* create icon element */
    const i_tag = document.createElement("i");
    /* add classes */
    i_tag.className = "material-icons white-text";
    /* add id */
    i_tag.id = "clear_btn";
    /* create and add text node */
    i_tag.appendChild(document.createTextNode("clear"));

    /* append i_tag to li_tag */
    li_tag.appendChild(i_tag);

    /* append li_tag to ul */
    task_list.appendChild(li_tag);
  });
}

/* function to add a task */
function addTask(e) {
  if (e.which === 13 && new_task_text.value !== "") {
    /* create li */
    const li_tag = document.createElement("li");
    /* add classes */
    li_tag.className = "card black white-text valign-wrapper";
    /* create and add text node */
    li_tag.appendChild(document.createTextNode(new_task_text.value));
    /* create icon element */
    const i_tag = document.createElement("i");
    /* add classes */
    i_tag.className = "material-icons white-text";
    /* add id */
    i_tag.id = "clear_btn";
    /* create and add text node */
    i_tag.appendChild(document.createTextNode("clear"));

    /* append i_tag to li_tag */
    li_tag.appendChild(i_tag);

    /* append li_tag to ul */
    task_list.appendChild(li_tag);

    /* store new task to storage */
    storeTaskInStorage(new_task_text.value);

    /* clear text field */
    new_task_text.value = "";
    console.log(task_list);

    e.preventDefault();
  } else if (e.which === 13 && new_task_text.value === "") {
    alert("Add a task");
  }
}

/* function to add a task with the + icon */
function addTaskBtn(e) {
  if (new_task_text.value !== "") {
    /* create li */
    const li_tag = document.createElement("li");
    /* add classes */
    li_tag.className = "card black white-text valign-wrapper";
    /* create and add text node */
    li_tag.appendChild(document.createTextNode(new_task_text.value));
    /* create icon element */
    const i_tag = document.createElement("i");
    /* add classes */
    i_tag.className = "material-icons white-text";
    /* add id */
    i_tag.id = "clear_btn";
    /* create and add text node */
    i_tag.appendChild(document.createTextNode("clear"));

    /* append i_tag to li_tag */
    li_tag.appendChild(i_tag);

    /* append li_tag to ul */
    task_list.appendChild(li_tag);

    /* store new task to storage */
    storeTaskInStorage(new_task_text.value);

    /* clear text field */
    new_task_text.value = "";
    console.log(task_list);

    e.preventDefault();
  } else if (new_task_text.value === "") {
    alert("Add a task");
  }
}

/* function to store new task to storage */
function storeTaskInStorage(new_task) {
  let tasksML;
  if (localStorage.getItem("tasksML") === null) {
    tasksML = [];
  } else {
    tasksML = JSON.parse(localStorage.getItem("tasksML"));
  }
  tasksML.push(new_task);

  localStorage.setItem("tasksML", JSON.stringify(tasksML));
}

/* function to delete the clicked task */
function deleteThisTask(e) {
  if (e.target.id === "clear_btn") {
    e.target.parentElement.remove();
    /* remove task from storage */
    removeTaskFromStorage(e.target.parentElement);
  }
}

/* remove task from local storage */
function removeTaskFromStorage(li_element) {
  li_element.lastChild.remove();
  let tasksML;
  if (localStorage.getItem("tasksML") === null) {
    tasksML = [];
  } else {
    tasksML = JSON.parse(localStorage.getItem("tasksML"));
  }
  tasksML.forEach(function(task, index) {
    if (li_element.textContent === task) {
      tasksML.splice(index, 1);
    }
  });
  localStorage.setItem("tasksML", JSON.stringify(tasksML));
}

/* function to delete all tasks */
function delete_all_btn(e) {
  while (task_list.firstChild) {
    task_list.removeChild(task_list.firstChild);
  }
  localStorage.clear();
}
console.log(task_list);
