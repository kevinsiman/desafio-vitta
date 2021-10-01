import React, { useContext } from 'react';
import { TaskContext } from '../../context/TaskProvider';
import '../navbar/navbar.css'




const Navbar = () => {

  const { setFiltro, setShowDone, dataInicioFim, setDataInicioFim, setDataInicioFiltro, setDataFimFiltro, dataInicioFiltro, dataFimFiltro } = useContext(TaskContext);

  const handleFilter = (event) => {
    const filtro = event.target.value;
    setFiltro(filtro);


  }

  const handleShowTaskDone = (event) => {
    const show = event.target.checked;
    setShowDone(show);
    console.log(show);
  }

  const handleDataInicioFim = (event) => {
    const setarPorData = event.target.checked;
    setDataInicioFim(setarPorData);
  }

  const handleDataInicio = (event) => {
    const dataInico = event.target.value;
    setDataInicioFiltro(dataInico);
  }

  const handleDataFim = (event) => {
    const dataFim = event.target.value;
    setDataFimFiltro(dataFim);
  }


  return (
    <div className="subHeader">

      
      <div className="dataInicioFim" >
        <input type="checkbox" checked={dataInicioFim} onChange={(event) => handleDataInicioFim(event)} className="btn-check" id="filtroPorData" autoComplete="off" />
        <label className="btn btn-outline-success" htmlFor="filtroPorData">Filtrar Data Inicio/Fim</label>
      </div>
      <div className="alinhar" style={dataInicioFim ? { display: "flex" } : { display: "none" }}>
        <label className="input-text" htmlFor="success">Inicio</label>
        <input defaultValue={dataInicioFiltro} onChange={(event) => handleDataInicio(event)} type="date" className="form-control" id="success" autoComplete="off" />
      </div>

      <div className="alinhar" style={dataInicioFim ? { display: "flex" } : { display: "none" }}>
        <label className="input-text" htmlFor="success">Fim</label>
        <input defaultValue={dataFimFiltro} onChange={(event) => handleDataFim(event)} type="date" className="form-control" id="success" autoComplete="off" />
      </div>

      <div className="filter">
        <label> Organizar Por: </label>
        <input onChange={(event) => handleFilter(event)} value="eventDate" type="radio" className="btn-check" name="filtro" id="success-outlined" autoComplete="off" />
        <label className="btn btn-outline-secondary" htmlFor="success-outlined">Data</label>

        <input onChange={(event) => handleFilter(event)} type="radio" className="btn-check" value="title" name="filtro" id="danger-outlined" autoComplete="off" />
        <label className="btn btn-outline-secondary" htmlFor="danger-outlined">Nome</label>
      </div>

      <div className="ocultar">
        <input type="checkbox" onChange={(event) => handleShowTaskDone(event)} className="btn-check" id="ocultar" autoComplete="off" />
        <label className="btn btn-outline-success" htmlFor="ocultar">Ocultar Tarefas concluidas</label>
      </div>
    
    </div>
  );
};

export default Navbar;
