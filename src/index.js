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
        for (const item of Todo.list){
            const itemDiv =  document.createElement("div");
            itemDiv.innerHTML = `<input type="checkbox"><p>${item.title}</p><p>${item.description}</p><p>${item.dueDate}</p>`
            todo.appendChild(itemDiv);
        }     
    }
}

const test = new Todo("test","a test todo","date");
console.log(test);
console.log(Todo.list);