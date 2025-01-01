
const todoform = document.querySelector('form');
const todoInput = document.getElementById('todo-input');
const todoListUL =document.getElementById('todo-list');

let alltodos = getTodos();
updateTodoList();

todoform.addEventListener('submit',function(e){
    e.preventDefault();
    addtodo();
})

function addtodo(){
    const todotext = todoInput.value.trim();
    if(todotext.length > 0){
        const todoObject = {
            text: todotext,
            completed: false
        }
        alltodos.push(todoObject);
        updateTodoList();
        saveTodos();
        todoInput.value = "";
    }
}
function updateTodoList(){
    todoListUL.innerHTML = "";
    alltodos.forEach((todo,todoIndex)=>{
        todoItem = createTodoItem(todo,todoIndex);
        todoListUL.append(todoItem);
    })
}
function createTodoItem(todo,todoIndex){
    const TodoLi = document.createElement("li");
    const todoId = "todo-"+ todoIndex;
    const todotext = todo.text;
    TodoLi.className = "todo";
    TodoLi.innerHTML =`
    <input type="checkbox" id="${todoId}" >
                <label class ="custom-checkbox"for="${todoId}">
                    <svg fill="transparent" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px">
                        <path d="M 20.292969 5.2929688 L 9 16.585938 L 4.7070312 12.292969 L 3.2929688 13.707031 L 9 19.414062 L 21.707031 6.7070312 L 20.292969 5.2929688 z"/>
                    </svg>
                </label>
                <label for="${todoId}" class ="todo-text">
                    ${todotext}
                </label>
                <button class="delete-button" title="Delete">
                    <?xml version="1.0"?><svg fill="var(--secondary-color) xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="30px" height="30px">  
                        <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"/>
                    </svg>
                </button>
    
    `
    const deleteButton = TodoLi.querySelector(".delete-button");
    deleteButton.addEventListener("click",()=>{
        deleteTodoItem(todoIndex);
    })

    const checkbox = TodoLi.querySelector("input");
    checkbox.addEventListener("change",()=>{
        alltodos[todoIndex].completed = checkbox.checked;
        saveTodos();
        
    })
    checkbox.checked = todo.completed;
    return TodoLi;
}
function deleteTodoItem(todoIndex){
    alltodos = alltodos.filter((_,i)=> i !==todoIndex);
    saveTodos();
    updateTodoList();
}


function saveTodos(){

    const todojson = JSON.stringify(alltodos);
    localStorage.setItem("todos", todojson);
}

saveTodos();

function getTodos(){

    const todos = localStorage.getItem("todos") || "[]";
    return JSON.parse(todos);
}
getTodos();


