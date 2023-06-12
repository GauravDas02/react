import './index.css';
import Employee from './components/Employee';
import { useState } from 'react';

function App() {
  const [role, setRole] = useState('dev');

  const showEmployees = true;
  return (
    <div className="App bg-green-300">
      {showEmployees ? (
        <>
        <input type='text' onChange={(e) => 
        {
          console.log(e.target.value);
          setRole(e.target.value);
        }}/>
        <Employee name="Gaurav" role="Intern"/>
        <Employee name="Das" role={role}/>
        </>
      )
        :

        <p>You cannot see the employees</p>
      }
    </div>
  );
}

export default App;
