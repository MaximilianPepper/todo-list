import './styles.css';
import list from './icons/list.png'
const icon1 = document.getElementById("list-icon");
icon1.src = list;

class Todo {
    static list = [];
    constructor(title, description, dueDate){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.checklist = false;
        Todo.list.push(this);
        Populate.makeTodo();
    }
    
}

class Projects {
    constructor(title){
        this.title = title;

    }
}

class Populate {
    static makeTodo(){
        const todo = document.querySelector(".todo");
        todo.innerHTML = "";
        for (let i = 0; i < Todo.list.length; i++){
            const itemDiv =  document.createElement("div");
            itemDiv.id = `todo-item-${i}`;
            itemDiv.innerHTML = `<input type="checkbox"><p>${Todo.list[i].title}</p><p>${Todo.list[i].description}</p><p>${Todo.list[i].dueDate}</p>`
            todo.appendChild(itemDiv);
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
    if(title.value.length){
        const newItem = new Todo(title.value,description.value,date.value);
    }
})





const test = new Todo("test","a test todo","date");
console.log(test);
console.log(Todo.list);