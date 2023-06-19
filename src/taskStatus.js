const getCurrentTaskIndex = (parentNode, flag) => {
  const toDoTasks = JSON.parse(localStorage.getItem('tasks'));
  const index = toDoTasks.findIndex(
    (task) => task.index === parseInt(parentNode.id, 10),
  );
  toDoTasks[index].completed = flag;
  localStorage.setItem('tasks', JSON.stringify(toDoTasks));
};

export const statusUpdate = () => {
  const checkboxEl = document.querySelectorAll('.checkbox-el');
  checkboxEl.forEach((element) => {
    element.addEventListener('click', () => {
      const parentNode = element.parentElement.parentElement;
      const taskDescription = document.querySelector(
        `#task-description-${parentNode.id}`,
      );
      if (element.checked) {
        taskDescription.style.textDecoration = 'line-through';
        taskDescription.disabled = true;
        getCurrentTaskIndex(parentNode, true);
      } else {
        taskDescription.style.textDecoration = 'none';
        taskDescription.disabled = false;
        getCurrentTaskIndex(parentNode, false);
      }
    });
  });
};

export const clearAllBtn = () => {
  const clearBtnEl = document.querySelector('#clear-btn');
  clearBtnEl.addEventListener('click', () => {
    const completedTasks = JSON.parse(localStorage.getItem('tasks')).filter(
      (item) => !item.completed,
    );
    let index = 1;
    completedTasks.forEach((el) => {
      el.index = index;
      index += 1;
    });
    localStorage.setItem('tasks', JSON.stringify(completedTasks));
    window.location.reload();
  });
};
