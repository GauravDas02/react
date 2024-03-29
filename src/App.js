import './index.css';
import Employee from './components/Employee';
import { useState } from 'react';
import {v4 as uuidv4} from 'uuid';
import AddEmployee from './components/AddEmployee';
import EditEmployee from './components/EditEmployee';
import Header from './components/Header'
import Employees from './pages/Employees';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Dictionary from './pages/Dictionary';
import Definition from './pages/Definition';
import NotFound from './components/NotFound';
import Customers from './pages/Customers';
import Customer from './pages/Customer';
import Login from './pages/Login';

function App() {

  return (
    <BrowserRouter>
      <Header>
        <Routes>
          <Route path = "/Employees" element = {<Employees />} />
          <Route path="/customers" element={<Customers />}/>
          <Route path="/customers/:id" element={<Customer />}/>
          <Route path = "/dictionary" element = {<Dictionary />}/>
          <Route path = "/login" element = {<Login />}/>
          <Route path = "/dictionary/:search" element = {<Definition />} />
          <Route path = "/404" element = {<NotFound />} />
          <Route path = "*" element = {<NotFound />}/>
        </Routes>
      </Header>
    </BrowserRouter>
  );
}

export default App;
