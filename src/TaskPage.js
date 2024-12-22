import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"; 
import TaskService from "./TaskService";
import "./TaskPage.css";

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [editingTask, setEditingTask] = useState(null); 
  const history = useHistory(); 

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await TaskService.getTasks();
      setTasks(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des tâches :", error);
    }
  };

  const createTask = async () => {
    try {
      await TaskService.createTask(newTask);
      setNewTask({ title: "", description: "" });
      fetchTasks();
    } catch (error) {
      console.error("Erreur lors de la création de la tâche :", error);
    }
  };

  const updateTask = async () => {
    try {
      if (editingTask) {
        await TaskService.updateTask(editingTask.id, editingTask);
        setEditingTask(null); 
        fetchTasks();
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la tâche :", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await TaskService.deleteTask(id);
      fetchTasks();
    } catch (error) {
      console.error("Erreur lors de la suppression de la tâche :", error);
    }
  };

  const navigateToCategoryPage = () => {
    history.push("/categories"); 
  };

  return (
    <div className="task-page">
      <nav className="navbar">
        <h1>Gestion des tâches</h1>
      </nav>

      <div className="task-container">
        <aside className="sidebar">
          <h3>{editingTask ? "Modifier une tâche" : "Ajouter une tâche"}</h3>
          <input
            type="text"
            placeholder="Titre"
            value={editingTask ? editingTask.title : newTask.title}
            onChange={(e) =>
              editingTask
                ? setEditingTask({ ...editingTask, title: e.target.value })
                : setNewTask({ ...newTask, title: e.target.value })
            }
          />
          <textarea
            placeholder="Description"
            value={editingTask ? editingTask.description : newTask.description}
            onChange={(e) =>
              editingTask
                ? setEditingTask({
                    ...editingTask,
                    description: e.target.value,
                  })
                : setNewTask({ ...newTask, description: e.target.value })
            }
          />
          <button onClick={editingTask ? updateTask : createTask}>
            {editingTask ? "Enregistrer" : "Ajouter"}
          </button>
          
         
          <button className="btn-navigate" onClick={navigateToCategoryPage}>
            Aller à la page des catégories
          </button>
          
          {editingTask && (
            <button onClick={() => setEditingTask(null)} className="btn-cancel">
              Annuler
            </button>
          )}
        </aside>

        <main className="task-table">
          <h3>Liste des tâches</h3>
          <table>
            <thead>
              <tr>
                <th>Titre</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>
                    <button
                      className="btn-edit"
                      onClick={() => setEditingTask(task)}
                    >
                      Modifier
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => deleteTask(task.id)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
};

export default TaskPage;
