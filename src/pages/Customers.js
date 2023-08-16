import { useEffect,useState } from "react";
import {Link,useNavigate,useLocation} from "react-router-dom";
import { baseUrl } from "../shared";
import AddCustomer from "../components/AddCustomer";

export default function Customers(){
    const [customers, setCustomers] = useState();
    const [show, setShow] = useState(false);

    function toggleShow(){
        setShow(!show);
    }

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        console.log("Fetching...");
        const url = baseUrl + 'api/customers/';
        fetch(url, {
            //We can specify the specific method as well, but here we are sending a GET request, and GET is the method by default so we don't need to specify anything
            headers:
            {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('access'),       //we don't need to put quotes in Authorization since it is perhaps a single string with no hyphens in between
            },
        })
        .then((response) => {
            if(response.status === 401){
                //navigate('/login');                         //Basically telling the people to get a new access code from the backend
                navigate('/login', {                          //navigate can take another argument which is an object
                    state: {
                        //previousUrl: '/customers',                                    //Inside os state we can place any property we want
                        previousUrl: location.pathname,     
                    },                                         //It is pivotal to have the property name here as 'state'
                }); 
            }
            return response.json()})
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
            
            {customers ? customers.map((customer) => {
                return (<div className="m-2" key={customer.id}>
                    <Link to ={'/customers/' + customer.id}>  
                        <button className="no-underline bg-purple-600 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded">     
                            {customer.name}
                        </button>     
                    </Link>
                </div>);
            })
            : null}
            
            <AddCustomer newCustomer = {newCustomer} show = {show} toggleShow={toggleShow}/>
        </>
    );
}