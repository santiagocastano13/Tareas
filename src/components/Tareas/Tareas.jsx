import React, { useState } from 'react'

const Tareas = () => {
  const [tasks, setTasks] = useState([])

  const [newTask, setNewTask] = useState('')
  const [newTaskDescription, setNewTaskDescription] = useState('')

  const handleTaskInputChange = (event) => {
    setNewTask(event.target.value);
  }
  const handleTaskDescriptionChange = (event) => {
    setNewTaskDescription(event.target.value);
  }

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: newTask, Description: newTaskDescription, completed: false }]);
      setNewTask('');
      setNewTaskDescription('');
    }
  }

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  }
  

  return (
    <>


    <div className=" botones">
        <button>ver tareas pendientes</button>
        <button>ver tareas archivadas</button>
        <button>ver todas las tareas</button>
    </div>

    

      <h1>Tareas</h1>
      <div className='tarea' >
        <input className='task' type="text" placeholder="Ingrese la nueva tarea" value={newTask} onChange={handleTaskInputChange} />
        <textarea placeholder='Descripcion de tarea' value={newTaskDescription} onChange={handleTaskDescriptionChange}/>
      </div>
      <button className='add' onClick={addTask}>Crear tarea</button>
      <hr></hr>

    <div className='resultado'>

        <ul>
          {tasks.map(task => (
            <li key={task.id} className='final'>
              <span >
                {task.text}
              </span>
              <p>{task.Description}</p>
              <button className='archive' onClick={() => archiveTask(task.id)}>Archivar</button>
            </li>
          ))}
        </ul>
    </div>

    </>
  )
}

export default Tareas