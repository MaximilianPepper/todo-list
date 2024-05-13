import './styles.css';

class Todo {
    static list = [];
    constructor(title, description, dueDate, priority){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
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
            itemDiv.innerHTML = `<p>${item.title}</p><p>${item.description}</p>`
            todo.appendChild(itemDiv);
        }     
    }
}

const test = new Todo("test","a test todo","soon","urgent");
console.log(test);
console.log(Todo.list);