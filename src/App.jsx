import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import './App.css';
import TaskProvider from './context/TaskProvider'

function App() {
  return (
    <div className="App">
      <TaskProvider />
    </div>
  );
}

export default App;
