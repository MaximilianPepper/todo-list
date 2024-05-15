import './styles.css';
import list from './icons/list.png';
import bin from './icons/bin.png';
const icon1 = document.getElementById("list-icon");
icon1.src = list;


class Todo {
    static list = [];

    constructor(title, description, dueDate,project){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.checklist = false;
        this.project = project
        Todo.list.push(this);
        Populate.makeTodo();
    }
    // TODO add checkbox <s> text

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
            itemDiv.innerHTML = `<input type="checkbox"><p>${Todo.list[i].title}</p><p>${Todo.list[i].description}</p><p>${Todo.list[i].dueDate}</p><img class="bin-icon">`;
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


 
    }

    static makeProject(){
        const projects = document.querySelector("#projects");
        const projectSelect = document.querySelector("#project-select");
        projects.innerHTML = "";
        projectSelect.innerHTML = "";
        const chooseProject = document.createElement("option");
        chooseProject.textContent = "select a project";
        chooseProject.disabled = true;  // its not disabling correctly,check for this when form is sumbit
        chooseProject.defaultSelected = true;
        projectSelect.appendChild(chooseProject);
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
        console.log(Todo.list)

    }
})
const projectForm = document.querySelector(".project");
projectForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const projectName = document.querySelector("#new-project");
    const newProject = new Project(projectName.value);

})
// TODO fix form to close on submit and clear inputs

// Add project logic and a dropdown for each project.






const test = new Todo("test","a test todo","date");
const project1 = new Project("fitness");
const project2 = new Project("work"); 

