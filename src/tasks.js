import { getTasks, setTasks } from './localstorage.js';
import { statusUpdate } from './taskStatus.js';

const todoListEl = document.querySelector('#todo-list');
let toDoTasks = getTasks();

export const updateTask = (currentTask, dataEntryEl) => {
  const index = toDoTasks.findIndex((task) => task.index === currentTask.index);
  toDoTasks[index].description = dataEntryEl.value;
  setTasks(toDoTasks);
};

export const removeTask = (element) => {
  const intValue = parseInt(element.id, 10);
  toDoTasks = toDoTasks.filter((task) => task.index !== intValue);
  let index = 1;
  for (let i = 0; i < toDoTasks.length; i += 1) {
    toDoTasks[i].index = index;
    index += 1;
  }
  setTasks(toDoTasks);
};

export const RenderToDoList = () => {
  if (!toDoTasks) {
    setTasks([]);
    toDoTasks = [];
    return;
  }
  todoListEl.innerHTML = '';
  toDoTasks.forEach((task) => {
    const listItemEl = document.createElement('li');
    listItemEl.id = task.index;
    listItemEl.classList.add('list-item', 'padding');
    const dataWrapperEl = document.createElement('div');
    const completedString = task.completed ? 'checked' : '';
    const checkboxEl = `
      <input type="checkbox" class="checkbox-el" ${completedString} >
    `;
    const dataEntryEl = document.createElement('input');
    dataEntryEl.type = 'text';
    dataEntryEl.value = task.description;
    dataEntryEl.id = `task-description-${task.index}`;
    dataEntryEl.classList.add('description-field');
    dataEntryEl.addEventListener('keydown', () => {
      updateTask(task, dataEntryEl);
    });
    dataWrapperEl.innerHTML += checkboxEl;
    dataWrapperEl.appendChild(dataEntryEl);
    listItemEl.appendChild(dataWrapperEl);
    const menuIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 menu-icon" id="loader">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
    </svg>
    `;
    const menuDivEl = document.createElement('div');
    menuDivEl.id = 'menu-icon';
    menuDivEl.addEventListener('click', () => {
      const parentNode = menuDivEl.parentElement;
      const deleteDivEl = document.createElement('div');
      deleteDivEl.innerHTML += `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" id="loader">
      <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
      </svg>
      `;
      parentNode.replaceChild(deleteDivEl, menuDivEl);
      deleteDivEl.addEventListener('click', () => {
        removeTask(parentNode);
        RenderToDoList();
      });
    });
    menuDivEl.innerHTML += menuIcon;
    listItemEl.appendChild(menuDivEl);
    todoListEl.appendChild(listItemEl);
    statusUpdate();
  });
};

export const addTask = () => {
  if (!toDoTasks) {
    setTasks([]);
    toDoTasks = [];
  }
  const taskInput = document.querySelector('#task-adder');
  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const tmpObj = {
        index: toDoTasks.length + 1,
        completed: false,
        description: taskInput.value,
      };
      toDoTasks.push(tmpObj);
      localStorage.setItem('tasks', JSON.stringify(toDoTasks));
      taskInput.value = '';
      RenderToDoList();
    }
  });
};
