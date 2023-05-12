import './style.css';

const toDoContainer = document.getElementById('todolist');
const itemInput = document.getElementById('input-item');

function Tasks(description, index) {
  this.description = description;
  this.completed = false;
  this.index = index;
}

class Books {
  constructor() {
    this.toDoTasks = localStorage.books ? JSON.parse(localStorage.books) : [];
  }

    updateToDoList = () => {
      toDoContainer.innerHTML = '';
      for (let i = 0; i < this.toDoTasks.length; i += 1) {
        toDoContainer.innerHTML += `
    <div class="list-items">
        <input type="checkbox" name="item" class="check-for-items" id="${this.toDoTasks[i].index}" onchange='ticked(${this.toDoTasks[i].index})'>
        <input type="text" value="${this.toDoTasks[i].description}" class="todo-item-text">
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
}

const books = new Books();
books.updateToDoList();

itemInput.addEventListener('focusout', () => {
  const newTask = new Tasks(itemInput.value, books.toDoTasks.length + 1);
  books.addEntry(newTask);
  itemInput.value = '';
});

itemInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    const newTask = new Tasks(itemInput.value, books.toDoTasks.length + 1);
    books.addEntry(newTask);
    itemInput.value = '';
  }
});

window.ticked = (index) => {
  document.getElementById(index).parentElement.classList.toggle('complete');
  books.toDoTasks[index - 1].completed = !books.toDoTasks[index - 1].completed;
  books.saveToDoList();
};

window.removeItem = (index) => {
  books.remove(index);
};