import axios from 'axios';

const BASE_URL = 'http://localhost:3000/tasks';

const TaskService = {
  
  createTask: (task) => axios.post(BASE_URL, task),

  getTasks: () => axios.get(BASE_URL),

  updateTask: (id, task) => axios.patch(`${BASE_URL}/${id}`, task),

  deleteTask: (id) => axios.delete(`${BASE_URL}/${id}`),
};

export default TaskService;
