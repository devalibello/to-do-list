const toDoContainer = document.getElementById('todolist');

export default class Books {
  constructor() {
    this.toDoTasks = localStorage.books ? JSON.parse(localStorage.books) : [];
  }

      updateToDoList = () => {
        toDoContainer.innerHTML = '';
        for (let i = 0; i < this.toDoTasks.length; i += 1) {
          toDoContainer.innerHTML += `
      <div class="list-items">
          <input type="checkbox" name="item" class="check-for-items" id="${this.toDoTasks[i].index}" onchange='ticked(${this.toDoTasks[i].index})'>
          <input type="text" value="${this.toDoTasks[i].description}" class="todo-item-text" onchange="editItem(${this.toDoTasks[i].index})" id="edit${this.toDoTasks[i].index}">
          <i class='material-icons delete-btn' onclick="removeItem(${this.toDoTasks[i].index})">delete</i>
      </div>`;
        }
      }

      addEntry = (book) => {
        this.toDoTasks.push(book);
        this.saveToDoList();
        this.updateToDoList();
      };

      saveToDoList = () => {
        localStorage.setItem('books', JSON.stringify(this.toDoTasks));
      };

      remove(ids) {
        this.toDoTasks = this.toDoTasks.filter((element) => element.index !== ids);
        this.renewIndex();
        this.saveToDoList();
        this.updateToDoList();
      }

      renewIndex = () => {
        for (let i = 0; i < this.toDoTasks.length; i += 1) {
          this.toDoTasks[i].index = i + 1;
        }
        this.saveToDoList();
      }

      clearTicked = () => {
        this.toDoTasks = this.toDoTasks.filter((element) => element.completed !== true);
        this.renewIndex();
        this.saveToDoList();
        this.updateToDoList();
      }

      updateItem = (index, description) => {
        this.toDoTasks[index - 1].description = description;
        this.saveToDoList();
      }
}