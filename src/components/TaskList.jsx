import React, { useContext, useState } from 'react';
import { TaskContext } from '../context/TaskProvider';

const TaskList = () => {
  const { tasks, removeTask, doneTask, setUpdateModal, updateModal, setWillUpdate, filtro, showDone, dataInicioFiltro, dataFimFiltro, dataInicioFim } = useContext(TaskContext);
  const [done, setDone] = useState();

  const toggle = () => setUpdateModal(!updateModal);


  const handleRemove = (id) => {
    removeTask(id);
  }

  // Implementar Futuramente
  const handleCheck = (event, index) => {
    const checked = event.target.checked;
    setDone(checked);
    doneTask(index, done);
  }

  const handleUpdate = (id, index) => {
    toggle();
    setWillUpdate({
      id: id,
      index: index,
    });
  };

  // Função Feita as pressas para filtrar o array "Tasks" pelo "Filtro"
  const sortedTasks = tasks.sort((a, b) => {
    var dateA;
    var dateB;
    if (filtro === 'eventDate') {
      dateA = new Date(a.eventDate);
      dateB = new Date(b.eventDate);
      return (dateA - dateB);
    } else if (filtro === "title") {
      dateA = new Date(a.title);
      dateB = new Date(b.title);
      return (dateA - dateB);
    }
  })

  // Filtra por data Inicial e final
  const tarefaFiltrada = sortedTasks.filter((d) => d.eventDate <= dataInicioFiltro && d.eventDate >= dataFimFiltro);
  const isFiltro = dataInicioFim ? tarefaFiltrada : sortedTasks;

  return (
    <div className="row row-cols-1 row-cols-md-4 g-2">
      {
        // Eu deveria ter Feito um componente só para a Lista
        isFiltro.map((task, index) => {
          if (showDone === true) {
            if (!task.done) {
              return (
                <div key={index} className="col">
                  <div style={task.done ? { borderTop: "solid red" } : { borderTop: "solid #43ec9b" }} className="cards">
                    <h6 className="card-header">Inicio: {task.eventDate} Termino: {task.duration}</h6>
                    <div className="card-body">
                      <h5 className="card-title">{task.title}</h5>
                      <p className="card-text">{task.description}</p>
                    </div>
                    <div className="footer">

                      {/* Botao Editar */}
                      <button type="button" onClick={() => handleUpdate(task.id, index)} className="btn"><i style={task.done ? { color: "red" } : { color: "#2c9763" }} className="bi bi-pencil-square"></i></button>
                      {/* Botao Remover */}
                      <button type="button" onClick={() => handleRemove(task.id)} className="btn"><i style={task.done ? { color: "red" } : { color: "#2c9763" }} className="bi bi-trash-fill"></i></button>
                    </div>
                  </div>
                </div>
              )
            }
          } else {
            return (
              <div key={index} className="col">
                <div style={task.done ? { borderTop: "solid red" } : { borderTop: "solid #43ec9b" }} className="cards">
                  <h6 className="card-header">Inicio: {task.eventDate} Termino: {task.duration}</h6>
                  <div className="card-body">
                    <h5 className="card-title">{task.title}</h5>
                    <p className="card-text">{task.description}</p>
                  </div>
                  <div className="footer">
                    {/* Botao Editar */}
                    <button type="button" onClick={() => handleUpdate(task.id, index)} className="btn"><i style={task.done ? { color: "red" } : { color: "#2c9763" }} className="bi bi-pencil-square"></i></button>
                    {/* Botao Remover */}
                    <button type="button" onClick={() => handleRemove(task.id)} className="btn"><i style={task.done ? { color: "red" } : { color: "#2c9763" }} className="bi bi-trash-fill"></i></button>
                  </div>
                </div>
              </div>
            )
          }
        })
      }
    </div>
  );
}

export default TaskList;
