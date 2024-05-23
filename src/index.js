import "./styles.css";
import list from "./icons/list.png";
import bin from "./icons/bin.png";
const icon1 = document.getElementById("list-icon");
icon1.src = list;

class Todo {
  static list = [];
  static id = 0;
  constructor(title, description, dueDate, project) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.checklist = false;
    this.project = project;
    this.id = Todo.id;
    Todo.id++;
    Todo.list.push(this);
    Populate.makeTodo();
  }
}

class Project {
  static list = [];

  constructor(title) {
    this.title = title;
    Project.list.push(this);
    Populate.makeProject();
  }
}

class Populate {
  static makeTodo() {
    const todo = document.querySelector(".todo");
    todo.innerHTML = "";
    for (let i = 0; i < Todo.list.length; i++) {
      const itemDiv = document.createElement("div");
      itemDiv.id = `todo-item-${i}`;
      if (Todo.list[i].checklist === false)
        itemDiv.innerHTML = `<input class="check-todo" type="checkbox"><p>${Todo.list[i].title}</p><p>${Todo.list[i].description}</p><p>${Todo.list[i].dueDate}</p><img class="bin-icon">`;
      else {
        itemDiv.innerHTML = `<input class="check-todo" type="checkbox" checked><p><s>${Todo.list[i].title}</s></p><p><s>${Todo.list[i].description}</s></p><p>${Todo.list[i].dueDate}</p><img class="bin-icon">`;
        itemDiv.classList.add("red-border");
      }
      todo.appendChild(itemDiv);
    }
    const icon2 = document.querySelectorAll(".bin-icon");
    if (icon2) {
      icon2.forEach((icon2, index) => {
        icon2.src = bin;
        icon2.addEventListener("click", () => {
          Todo.list.splice(index, 1);
          this.makeTodo();
        });
      });
    }
    const listCheck = document.querySelectorAll(".check-todo");
    if (listCheck) {
      listCheck.forEach((box, index) => {
        box.addEventListener("change", () => {
          if (box.checked) Todo.list[index].checklist = true;
          else Todo.list[index].checklist = false;
          this.makeTodo();
        });
      });
    }

    // local storage
    saveArrayToLocalStorage();
  }

  static makeProject() {
    const projects = document.querySelector("#projects"); // this is a UL
    const projectSelect = document.querySelector("#project-select");
    projects.innerHTML = "";
    projectSelect.innerHTML = "";
    const defItem = document.createElement("li");
    const defButton = document.createElement("button");
    const defProject = document.createElement("option");
    defButton.textContent = "All";
    defButton.id = "show-all";
    defItem.appendChild(defButton);
    defProject.textContent = "none";
    defProject.defaultSelected = true;
    projects.appendChild(defItem);
    projectSelect.appendChild(defProject);

    for (let i = 0; i < Project.list.length; i++) {
      // generating options
      const selectItem = document.createElement("option");
      selectItem.textContent = Project.list[i].title;
      selectItem.value = Project.list[i].title;
      projectSelect.appendChild(selectItem);
      // generating buttons
      const listItem = document.createElement("li");
      const button = document.createElement("button");
      button.textContent = Project.list[i].title;
      button.dataset.index = i; // data attribute to store index
      // del button for project
      const delProject = document.createElement("button");
      delProject.textContent = "Del";
      delProject.addEventListener("click", () => {
        Project.list.splice(i, 1);
        this.makeProject();
      });
      listItem.appendChild(button);
      listItem.appendChild(delProject);
      projects.appendChild(listItem);
    }

    projects.addEventListener("click", (event) => {
      if (event.target.tagName === "BUTTON") {
        const index = event.target.dataset.index;
        const selectedProject = Project.list[index];
        if (event.target.id === "show-all") {
          this.makeTodo();
        } else {
          for (let i = 0; i < Todo.list.length; i++) {
            if (selectedProject.title === Todo.list[i].project) {
              const divID = document.getElementById(`todo-item-${i}`);
              divID.style.display = "";
            } else {
              const divID = document.getElementById(`todo-item-${i}`);
              divID.style.display = "none";
            }
          }
        }
      }
    });
    saveArrayToLocalStorage();
  }
}
// btn logic
const btnForm = document.getElementById("add");
const form = document.querySelector(".form");
const overlay = document.getElementById("overlay");
btnForm.addEventListener("click", () => {
  overlay.style.display = "block";
  form.style.display = "flex";
});
const btnBack = document.getElementById("back");
btnBack.addEventListener("click", () => {
  form.style.display = "none";
  overlay.style.display = "none";
});
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("title");
  const description = document.getElementById("description");
  const date = document.getElementById("date");
  const projectSelect = document.querySelector("#project-select");
  if (title.value.length) {
    const newItem = new Todo(
      title.value,
      description.value,
      date.value,
      projectSelect.value
    );
    console.log(Todo.list); // temp - remove when done
    // clean form
    title.value = "";
    description.value = "";
    date.value = "";
    form.style.display = "none";
    overlay.style.display = "none";
  }
});
const projectForm = document.querySelector(".project");
projectForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const projectName = document.querySelector("#new-project");
  if (projectName.value.length) {
    const newProject = new Project(projectName.value);
    projectName.value = "";
  }
});
// storage func
function loadArrayFromLocalStorage() {
  const arrayFromStorage = localStorage.getItem("todo");
  if (arrayFromStorage) {
    Todo.list = JSON.parse(arrayFromStorage);
  } else {
    Todo.list = [];
  }
  const arrayFromStorage1 = localStorage.getItem("projects");
  if (arrayFromStorage1) {
    Project.list = JSON.parse(arrayFromStorage1);
  } else {
    Project.list = [];
  }
}
function saveArrayToLocalStorage() {
  localStorage.setItem("todo", JSON.stringify(Todo.list));
  localStorage.setItem("projects", JSON.stringify(Project.list));
}
loadArrayFromLocalStorage();
Populate.makeTodo();
Populate.makeProject();

if (Todo.list.length === 0) {
  const test = new Todo(
    "Test",
    "You have no todos so this todo appears!",
    "10/24/1995"
  );
  Populate.makeTodo();
}

if (Project.list.length === 0) {
  const project1 = new Project("fitness");
  const project2 = new Project("work");
  Populate.makeProject();
}
