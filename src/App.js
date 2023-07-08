import './index.css';
import Employee from './components/Employee';
import { useState } from 'react';
import {v4 as uuidv4} from 'uuid';

function App() {
  const [role, setRole] = useState('dev');
  const [employees, setEmployees] = useState(
    [                                       //Square brackets here represent an array of objects, say, employees here
      {
        name: 'Gaurav',
        role: 'Developer',
        img: 'https://images.pexels.com/photos/4144099/pexels-photo-4144099.jpeg',  
      },
      {
        name: 'Sal',
        role: 'Manager',
        img: 'https://images.pexels.com/photos/775358/pexels-photo-775358.jpeg',  
      },
      {
        name: 'Sanchez',
        role: 'Director of Eng',
        img: 'https://images.pexels.com/photos/3220360/pexels-photo-3220360.jpeg',  
      },
      {
        name: 'Shaurya',
        role: 'Software Engineer',
        img: 'https://images.pexels.com/photos/2741701/pexels-photo-2741701.jpeg',  
      },
      {
        name: 'Corey',
        role: 'The DevOps Guy',
        img: 'https://images.pexels.com/photos/5397723/pexels-photo-5397723.jpeg',  
      },
      {
        name: 'Jake',
        role: 'Asst. Manager',
        img: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',  
      },
    ]
  );
  const showEmployees = true;
  return (
    <div className="App">
      {showEmployees ? (
        <>
        <input type='text' onChange={(e) => 
        {
          console.log(e.target.value);
          setRole(e.target.value);
        }}/>
        <div className = "flex flex-wrap justify-center">
              {employees.map((employee) => {
                    return (
                      <Employee
                        key={uuidv4()}
                        name={employee.name}
                        role={employee.role}
                        img={employee.img}
                      />
                    );
              })}          
          </div>

        </>
      )
        :

        <p>You cannot see the employees</p>
      }
    </div>
  );
}

export default App;
