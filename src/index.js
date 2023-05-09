import './style.css';

const toDoContainer = document.getElementById('todolist');

const toDoTasks = [{
  description: 'Sleep',
  completed: false,
  index: 1,
},
{
  description: 'Play',
  completed: false,
  index: 2,
},
{
  description: 'Eat',
  completed: false,
  index: 3,
}];

toDoTasks.sort((a, b) => a.index - b.index);

toDoTasks.forEach((element) => {
  toDoContainer.innerHTML += `
        <ul class="list-items">
            <li><input type="checkbox" name="item" class="check-for-items"></li>
            <li>${element.description}</li>
            <li class="ellipse"><i class="fa-solid fa-ellipsis-vertical"></i></li>
        </ul>
        `;
});
