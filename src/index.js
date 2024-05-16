import './styles.css';
import list from './icons/list.png';
import bin from './icons/bin.png';
const icon1 = document.getElementById("list-icon");
icon1.src = list;


class Todo {
    static list = [];
    static id = 0;
    constructor(title, description, dueDate,project){
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

    constructor(title){
        this.title = title;
        Project.list.push(this);
        Populate.makeProject();

    }
}

class Populate {
    static makeTodo(){
        const todo = document.querySelector(".todo");
        todo.innerHTML = "";
        for (let i = 0; i < Todo.list.length; i++){
            const itemDiv =  document.createElement("div");
            itemDiv.id = `todo-item-${i}`;
            if(Todo.list[i].checklist === false)itemDiv.innerHTML = `<input class="check-todo" type="checkbox"><p>${Todo.list[i].title}</p><p>${Todo.list[i].description}</p><p>${Todo.list[i].dueDate}</p><img class="bin-icon">`;
            else {
                itemDiv.innerHTML = `<input class="check-todo" type="checkbox" checked><p><s>${Todo.list[i].title}</s></p><p><s>${Todo.list[i].description}</s></p><p>${Todo.list[i].dueDate}</p><img class="bin-icon">`;
                itemDiv.classList.add("red-border");
            }
            todo.appendChild(itemDiv);  
        }
        const icon2 = document.querySelectorAll(".bin-icon");
        if (icon2){ 
            icon2.forEach((icon2,index)=>{
                icon2.src = bin;
                icon2.addEventListener("click",()=>{
                    Todo.list.splice(index,1);
                    this.makeTodo();
                })
            });
            } 
        const listCheck = document.querySelectorAll(".check-todo");
        if (listCheck){
            listCheck.forEach((box,index)=>{
                box.addEventListener("change",()=>{
                    if (box.checked) Todo.list[index].checklist = true;
                    else Todo.list[index].checklist = false;
                    this.makeTodo();
                })
            })
        }


 
    }

    static makeProject(){
        const projects = document.querySelector("#projects");
        const projectSelect = document.querySelector("#project-select");
        projects.innerHTML = "";
        projectSelect.innerHTML = "";
        const chooseProject = document.createElement("option");
        chooseProject.textContent = "none";
        chooseProject.defaultSelected = true;
        projectSelect.appendChild(chooseProject);
        const item1 = document.createElement("li");
        item1.innerText = "none";

        for (let i = 0; i < Project.list.length;i++){
            const item = document.createElement("li");
            item.innerText = Project.list[i].title;
            projects.appendChild(item);

            const item1 = document.createElement("option");
            item1.innerText = Project.list[i].title;
            projectSelect.appendChild(item1);
        }
        
    }
}
// btn logic
const btnForm = document.getElementById("add");
const form = document.querySelector(".form");
const overlay = document.getElementById("overlay");
btnForm.addEventListener("click",()=>{
    overlay.style.display = "block";
    form.style.display ="block";
    
})
const btnBack = document.getElementById("back");
btnBack.addEventListener("click",()=>{
    form.style.display ="none";
    overlay.style.display = "none";
})
form.addEventListener("submit", (e)=>{
    e.preventDefault();
    const title = document.getElementById("title");
    const description = document.getElementById("description");
    const date = document.getElementById("date");
    const projectSelect = document.querySelector("#project-select");
    if(title.value.length){
        const newItem = new Todo(title.value,description.value,date.value,projectSelect.value);
        console.log(Todo.list); // temp - remove when done
        form.style.display ="none";
        overlay.style.display = "none";

    }
})
const projectForm = document.querySelector(".project");
projectForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const projectName = document.querySelector("#new-project");
    if (projectName.value.length){
        const newProject = new Project(projectName.value);
    }

})



const test = new Todo("test","a test todo","10/24/1995");
const project1 = new Project("fitness");
const project2 = new Project("work"); 

