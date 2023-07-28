import { useEffect,useState } from "react";
import {Link} from "react-router-dom";
import { baseUrl } from "../shared";
import AddCustomer from "../components/AddCustomer";

export default function Customers(){
    const [customers, setCustomers] = useState();
    const [show, setShow] = useState(false);

    function toggleShow(){
        setShow(!show);
    }

    useEffect(() => {
        console.log("Fetching...");
        const url = baseUrl + 'api/customers/';
        fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            setCustomers(data.customers);
        });
    }, []);

    function newCustomer(name, industry){
        const data = {name: name, industry: industry};
        const url = baseUrl + 'api/customers/';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => {
            if(!response.ok){
                throw new Error('Something went wrong');
            }
            return response.json();
        }).then((data) => {
            //assume the add was successful
            //hide the modal
            toggleShow();
            //make sure the list is updated appropriately
            console.log(data);
            setCustomers([...customers, data.customer]);        //Passing in a new array taking all the existing customers, but also an additional customer in the form of data.customer
        }).catch((e) => {
            console.log(e);
        });
    }

    return (
        <>
            <h2>Here are our customers:</h2>
            <ul>
            {customers ? customers.map((customer) => {
                return (<li key={customer.id}>
                    <Link to ={'/customers/' + customer.id}>       
                        {customer.name}
                    </Link>
                </li>);
            })
            : null}
            </ul>
            <AddCustomer newCustomer = {newCustomer} show = {show} toggleShow={toggleShow}/>
        </>
    );
}