import React, { useContext, useState, useEffect } from 'react';
import { TaskContext } from '../context/TaskProvider';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import moment from 'moment';

const ModalCreateTask = () => {

  // Importação de variaveis e funções por Context
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { modal, setModal, saveTask } = useContext(TaskContext);

  // Função para alterar o estado da Modal de alterar Tarefas true/false
  const toggle = () => setModal(!modal);

  const atualDate = moment().format('YYYY-MM-DDThh:mm');

  const [task, setTask] = useState({
    title: '',
    description: '',
    eventDate: atualDate,
    duration: '',
    tags: '',
    done: false,
  });

  // state criado para testar uma função (Nao deu tempo de remover)
  const [durationTime, setDurationTime] = useState();

  // state criado para alterar o input de tempo de duração
  const [horas, setHoras] = useState(0);
  const [minutos, setMinutos] = useState(0);

  const [tag, setTags] = useState();



  // Funções para lidar com os inputs do Formulario
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

  const handleDateTime = (event) => {
    setTask({
      ...task,
      eventDate: event.target.value,
    })
  }

  const handleCheckInput = (event) => {
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

  const handleSubmit = () => {
    if (task.title !== '' && task.description !== '') {
      saveTask(task);
      toggle();
    } else {
      window.alert('Prencha todos os Campos');
    }
  }
  // Fim das Funções para lidar com os inputs do formulario

  // Função Hook para alterar o estado do tempo de duração de Task
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


  return (
    <form className="row g-3">

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Criar nova tarefa</ModalHeader>
        <ModalBody>

          <div className="col">
            <label htmlFor="titulo" className="form-label">Titulo: </label>
            <input id="titulo" className="form-control" type="text" onChange={(event) => handleTitleInput(event)} />
          </div>

          <div className="col">
            <label htmlFor="descricao" className="form-label" >Descrição: </label>
            <textarea className="form-control" onChange={handleDescriptionInput} />
          </div>

          <div className="mb-3">
            <label htmlFor="tagsLabel" className="form-label">Tags: </label>
            <input id="tagsLabel" placeholder="Separe as tags com virgula" className="form-control" type="text" onChange={(event) => handleTagInput(event)} />
          </div>

          <div className="mb-3">
            <label htmlFor="dataTarefa" className="form-label">Data: </label>
            <input id="dataTarefa" defaultValue={atualDate} onChange={(event) => handleDateTime(event)} className="form-control" type="datetime-local" />
          </div>

          <div className="form-check form-switch mb-3">
            <input id="checkInput" className="form-check-input" type="checkbox" onChange={(event) => handleCheckInput(event)} />
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
          <button className="btn btn-primary" type="submit" onClick={() => handleSubmit()}>Criar</button>
        </ModalFooter>

      </Modal>
    </form>
  );
}

export default ModalCreateTask;
