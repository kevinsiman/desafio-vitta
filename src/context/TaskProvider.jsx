import React, { createContext, useState } from 'react';
import ModalCreateTask from '../modals/ModalCreateTask';
import ModalUpdateTask from '../modals/ModalUpdateTask';
import TaskList from '../components/TaskList';
import moment from 'moment';
import Navbar from '../components/navbar/Navbar';

export const TaskContext = createContext();

const TaskProvider = ({ children }) => {

  const [tasks, setTasks] = useState([
    { id: 1, title: 'Titulo 9', description: 'Descrição da Tarefa', tags: '', createTime: '01-05-20 01:05:30', eventDate: '2021-09-09', duration: '08:00 am', lastUpdate: '01-05-20 01:05:30', done: false },
    { id: 2, title: 'Titulo 2', description: 'Descrição da Tarefa', tags: '', createTime: '01-05-20 01:05:30', eventDate: '2021-09-27', duration: '08:00 am', lastUpdate: '01-05-20 01:05:30', done: false },
    { id: 3, title: 'Titulo 10', description: 'Descrição da Tarefa', tags: '', createTime: '01-05-20 01:05:30', eventDate: '2021-09-25', duration: '08:00 am', lastUpdate: '01-05-20 01:05:30', done: false },
    { id: 4, title: 'Titulo 4', description: 'Descrição da Tarefa', tags: '', createTime: '01-05-20 01:05:30', eventDate: '2021-09-23', duration: '08:00 am', lastUpdate: '01-05-20 01:05:30', done: false },
  ]);

  // Define o state da tarefa que vai ser Atualizada para ter acesso via Modal
  const [willUpdate, setWillUpdate] = useState({ id: -1, index: -1, });

  // State da Modal de criar Tarefas.
  // Criada com o valor default de false para que inicie escondida
  const [modal, setModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);

  const [filtro, setFiltro] = useState();
  const [showDone, setShowDone] = useState(false);

  const atualDate = moment().format('YYYY-MM-DD');
  const seteDiasAtras = moment(`${atualDate}`).subtract(7, 'day').format('YYYY-MM-DD');

  const [dataInicioFiltro, setDataInicioFiltro] = useState(atualDate);
  const [dataFimFiltro, setDataFimFiltro] = useState(seteDiasAtras);
  const [dataInicioFim, setDataInicioFim] = useState(true);

  // Função para alterar o estado da Modal de criar Tarefas true/false
  const toggle = () => {
    setModal(!modal)
  };

  // Função para Salvar uma nova tarefa
  // Prop "taskToSave" vem de modalCreatTask com um 
  const saveTask = (taskToSave) => {
    let mom = moment(taskToSave.eventDate);
    mom = mom.format('YYYY-MM-DD hh:mm');
  
    const newTask = {
      id: tasks.length + 1,
      title: taskToSave.title,
      description: taskToSave.description,
      createTime: moment().format('D-MM-YY hh:mm:ss a'),
      lastUpdate: moment().format('D-MM-YY hh:mm:ss a'),
      eventDate: mom,
      tags: taskToSave.tags,
      duration: taskToSave.duration,
      done: taskToSave.done,
    }
    setTasks([
      ...tasks,
      newTask
    ]);
  }

  const removeTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);

    setTasks(updatedTasks);
  }

  const doneTask = (index, done) => {
    const taskToUpdate = tasks[index];
    taskToUpdate.done = done;

    setTasks([...tasks]);
  }

  const updateTask = (updatedTask, index) => {
    let mom = moment(updatedTask.eventDate);
    mom = mom.format('YYYY-MM-DD hh:mm');
    const taskToUpdate = tasks[index];
    taskToUpdate.description = updatedTask.description;
    taskToUpdate.title = updatedTask.title;
    taskToUpdate.eventDate = mom;
    taskToUpdate.done = updatedTask.done;
    taskToUpdate.duration = updatedTask.duration;
    taskToUpdate.lastUpdate = moment().format('D/M/YY hh:mm:ss a');

    setTasks([...tasks]);
  };

  return (
    <TaskContext.Provider value={{
      tasks,
      setTasks,
      modal,
      setModal,
      updateModal,
      setUpdateModal,
      saveTask,
      removeTask,
      doneTask,
      updateTask,
      setWillUpdate,
      willUpdate,
      setFiltro,
      filtro,
      setShowDone,
      showDone,
      setDataInicioFim,
      dataInicioFim,
      dataInicioFiltro,
      setDataInicioFiltro,
      dataFimFiltro,
      setDataFimFiltro,
    }}>
      <div className="header">
        <h1>Lista de Tarefas</h1>
        <button type="button" className="btn btn-success" onClick={toggle}>Criar Tarefa</button>
      </div>
      <div className="subHeader">
        <Navbar/>
      </div>
      <ModalCreateTask />
      <ModalUpdateTask />
      <div className="taskList">
        <TaskList />
      </div>
    </TaskContext.Provider>
  );
};

export default TaskProvider;

