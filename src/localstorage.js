export const setTasks = (data) => localStorage.setItem('tasks', JSON.stringify(data));
export const getTasks = () => JSON.parse(localStorage.getItem('tasks'));
export const listLength = getTasks().length;
