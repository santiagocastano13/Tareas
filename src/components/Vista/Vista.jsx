import React, { useState } from 'react';

const Vista = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [filter, setFilter] = useState('all');

  const handleTaskInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleTaskDescriptionChange = (event) => {
    setNewTaskDescription(event.target.value);
  };

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: newTask, description: newTaskDescription, completed: false }]);
      setNewTask('');
      setNewTaskDescription('');
    }
  };


  const toggleTaskCompletion = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const archiveCompletedTasks = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  const handleFilter = (filterType) => {
    setFilter(filterType);
  };

  const filteredTasks = () => {
    if (filter === 'pending') {
      return tasks.filter((task) => !task.completed);
    } else if (filter === 'archived') {
      return tasks.filter((task) => task.completed);
    } else {
      return tasks;
    }
  };

  return (
    <>
      <div className="botones">
        <button onClick={() => handleFilter('pending')}>Ver tareas pendientes</button>
        <button onClick={() => handleFilter('archived')}>Ver tareas archivadas</button>
        <button onClick={() => handleFilter('all')}>Ver todas las tareas</button>
      </div>

      <h1>Tareas</h1>
      <div className="tarea">
        <input className="task" type="text" placeholder="Ingrese la nueva tarea" value={newTask} onChange={handleTaskInputChange} />
        <textarea placeholder="Descripción de la tarea" value={newTaskDescription} onChange={handleTaskDescriptionChange} />
      </div>
      <button className="add" onClick={addTask}>
        Crear tarea
      </button>
      <hr />

      <div className="resultado">
          <ul>
            
            {filteredTasks().map((task) => (
              <li className='final'key={task.id}>
                <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.text}</span>
                <p>{task.description}</p>
                <button onClick={() => toggleTaskCompletion(task.id)}>
                  {task.completed ? 'No Completada' : 'Completada'}
                </button>
              </li>
            ))}
          </ul>
      </div>
      {filter === 'archived' && (
        <button onClick={archiveCompletedTasks}>Archivar tareas completadas</button>
      )}
    </>
  );
};

export default Vista;
