import './index.css';
import Employee from './components/Employee';
import { useState } from 'react';
import {v4 as uuidv4} from 'uuid';
import AddEmployee from './components/AddEmployee';
import EditEmployee from './components/EditEmployee';

function App() {
  const [role, setRole] = useState('dev');
  const [employees, setEmployees] = useState(
    [                                       //Square brackets here represent an array of objects, say, employees here
      {
        id: 1,
        name: 'Gaurav',
        role: 'Developer',
        img: 'https://images.pexels.com/photos/4144099/pexels-photo-4144099.jpeg',  
      },
      {
        id: 2,
        name: 'Sal',
        role: 'Manager',
        img: 'https://images.pexels.com/photos/775358/pexels-photo-775358.jpeg',  
      },
      {
        id: 3,
        name: 'Sanchez',
        role: 'Director of Eng',
        img: 'https://images.pexels.com/photos/3220360/pexels-photo-3220360.jpeg',  
      },
      {
        id: 4,
        name: 'Shaurya',
        role: 'Software Engineer',
        img: 'https://images.pexels.com/photos/2741701/pexels-photo-2741701.jpeg',  
      },
      {
        id:5,
        name: 'Corey',
        role: 'The DevOps Guy',
        img: 'https://images.pexels.com/photos/5397723/pexels-photo-5397723.jpeg',  
      },
      {
        id: 6,
        name: 'Jake',
        role: 'Asst. Manager',
        img: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',  
      },
    ]
  );

    function updateEmployee(id, newName, newRole){
      const updatedEmployees = employees.map((employee) => {
        if(id==employee.id){
          return {...employee, name: newName, role: newRole};
        }

        return employee;
      });
      setEmployees(updatedEmployees);
    }

    function newEmployee(name, role, img){
      const newEmployee = {
        id: uuidv4(),
        name: name,
        role: role,
        img: img,
      };
      setEmployees([...employees, newEmployee]);
    }

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
                    const editEmployee = <EditEmployee 
                    id={employee.id}                   
                    name={employee.name}               
                    role={employee.role} 
                    //updateEmployee={props.updateEmployee}
                    updateEmployee={updateEmployee} //We no longer need to define props here because it is defined 
                                                    //directly in the same file
                />;
                    return (
                      <Employee
                        //key={uuidv4()}
                        key={employee.id}
                        id={employee.id}
                        name={employee.name}
                        role={employee.role}
                        img={employee.img}
                        editEmployee={editEmployee}
                      />
                    );
              })}          
          </div>
          <AddEmployee newEmployee={newEmployee}/>

        </>
      )
        :

        <p>You cannot see the employees</p>
      }
    </div>
  );
}

export default App;
