import './style.css';
import Books from './modules/class.js';

const itemInput = document.getElementById('input-item');

function Tasks(description, index) {
  this.description = description;
  this.completed = false;
  this.index = index;
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

window.clearAll = () => {
  books.clearTicked();
};

window.editItem = (index) => {
  books.updateItem(index, document.getElementById(`edit${index}`).value);
};