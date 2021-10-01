import React, { useContext, useState, useEffect } from 'react';
import { TaskContext } from '../context/TaskProvider';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import moment from 'moment';

const ModalUpdateTask = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { updateModal, setUpdateModal, willUpdate, tasks, updateTask } = useContext(TaskContext);

  const { index, id } = willUpdate;

  const [durationTime, setDurationTime] = useState();
  const [horas, setHoras] = useState(0);
  const [minutos, setMinutos] = useState(0);

  const [tag, setTags] = useState();

  // Função para alterar o estado da Modal de alterar Tarefas true/false
  const toggle = () => setUpdateModal(!updateModal);

  const [task, setTask] = useState({
    title: '',
    description: '',
    eventDate: '',
    duration: '',
    done: '',
    tags: '',
  });

  // Atualiza as tarefas globais no estado do Modal assim que o index muda
  useEffect(() => {
    setTask(tasks[index]);
  }, [index]);

  const handleTitleInput = (event) => {
    setTask({
      ...task,
      title: event.target.value,
    });
  };

  const handleDescriptionInput = (event) => {
    setTask({
      ...task,
      description: event.target.value,
    });
  };

  var mom = moment(task.eventDate);
  mom = mom.format('YYYY-MM-DDThh:mm')
  const handleDateTime = (event) => {
    setTask({
      ...task,
      eventDate: event.target.value,
    })
  }

  useEffect(() => {
    if (horas > 23) setHoras(0);
    if (horas < 0) setHoras(23);
    if (minutos > 55) setMinutos(0);
    if (minutos < 0) setMinutos(55);

    var mom = moment(`${horas}:${minutos}`, 'hh:mm');
    mom = mom.format('hh:mm a');

    setDurationTime(`${mom}`);
    setTask({
      ...task,
      duration: `${mom}`,
    });
  }, [horas, minutos]);


  const handleCheck = (event) => {
    setTask({
      ...task,
      done: event.target.checked,
    })
  }

  const handleTagInput = (event) => {
    const sentenceToSplit = event.target.value;
    const sentenceSplited = sentenceToSplit.split(', ');

    setTags(sentenceSplited);
    setTask({
      ...task,
      tags: sentenceSplited,
    })
  }

  const handleSubmit = (index) => {
    updateTask(task, index)
    toggle();
  }
  return (
    <form className="row g-3">

      <Modal isOpen={updateModal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Atualizar Tarefa</ModalHeader>
        <ModalBody>

          <div className="col">
            <label htmlFor="titulo" className="form-label">Titulo: </label>
            <input id="titulo" defaultValue={task.title} className="form-control" type="text" onChange={(event) => handleTitleInput(event)} />
          </div>

          <div className="col">
            <label htmlFor="descricao" className="form-label" >Descrição: </label>
            <textarea className="form-control" defaultValue={task.description} onChange={handleDescriptionInput} />
          </div>

          <div className="mb-3">
            <label htmlFor="tagsLabel" className="form-label">Tags: </label>
            <input id="tagsLabel" placeholder="Separe as tags com virgula" defaultValue={`${task.tags}`} className="form-control" type="text" onChange={(event) => handleTagInput(event)} />
          </div>

          <div className="mb-3">
            <label htmlFor="dataTarefa" className="form-label">Data: </label>
            <input id="dataTarefa" defaultValue={mom} onChange={(event) => handleDateTime(event)} className="form-control" type="datetime-local" />
          </div>

          <div className="form-check form-switch mb-3">
            <input id="checkInput" checked={task.done} className="form-check-input" type="checkbox" onChange={(event) => handleCheck(event)} />
            <label htmlFor="checkInput">Marcar como concluido</label>
          </div>

          <div>
            <label className="form-label">Duração: </label>
            <div className="input-group mb-3">
              <button onClick={() => setHoras(horas + 1)} className="btn btn-secondary" type="button">+</button>
              <button onClick={() => setHoras(horas - 1)} className="btn btn-secondary" type="button">-</button>
              <span className="input-group-text">{durationTime}</span>
              <button onClick={() => setMinutos(minutos + 5)} className="btn btn-secondary" type="button">+</button>
              <button onClick={() => setMinutos(minutos - 5)} className="btn btn-secondary" type="button">-</button>
            </div>
          </div>



        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" type="submit" onClick={() => handleSubmit(index)}>Atualizar</button>
        </ModalFooter>

      </Modal>
    </form>
  );
}

export default ModalUpdateTask;
