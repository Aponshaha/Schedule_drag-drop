import React from 'react';
import './App.css';
import './styles/jqx.base.css'
import { Another_schedule } from './components/Another_schedule';


function App() {
  return (
    <div className="App">
      <h1>Create Schedule</h1>
      <div className="container">
          <Another_schedule />  
      </div>
       
    </div>
  );
}

export default App;
