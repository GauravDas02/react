import {useParams, Link, useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import NotFound from '../components/NotFound';
import { baseUrl } from '../shared';

export default function Customer(){
    let {id} = useParams();
    const navigate = useNavigate();         //It is a hook
    //const [error, setError] = useState(false);
    const [customer, setCustomer] = useState();
    const [tempCustomer, setTempCustomer] = useState();
    const [notFound, setNotFound] = useState(false);     //To render a 404 component in the same page
    const [changed, setChanged] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        if(!tempCustomer)
            return;

        if(!customer)
            return;

        let equal = true;               //Checking if the previous value of customer (customer) and the new value of customer (tempCustomer) are same using the bool variable 'equal'
    
        if(customer.name !== tempCustomer.name)
            equal = false;

        if(customer.industry !== tempCustomer.industry)
            equal = false;

        if(equal)
            setChanged(false);
    });

    useEffect(() => {
        const url = baseUrl + "api/customers/" + id;
        fetch(url)
        .then((response) => {
            if(response.status === 404){
                /*
                //navigate to a 404 page (new URL)
                navigate('/404');
                */
                //To render a 404 component in the same page
                setNotFound(true);
            }

            if(!response.ok) {
                throw new Error('Something went wrong, try again later');      //For errors other than error code 200-299
            }
            return response.json()
        })
        .then((data) => {
            setCustomer(data.customer);
            setTempCustomer(data.customer);     //Now we have a copy of the data, in two different state variables
                                                //The idea is when we consider POST command, we are going to change the data in tempCustomer and when we want to save/store it, we will do it using setCustomer
            setError(undefined);
        }).catch((e) => {
            setError(e.message);
        });
    }, []);
/*
    function deleteCustomer(){
        console.log("deleting...");
    }
*/

    function updateCustomer(e){
        e.preventDefault();         //So that when we hit enter and save the content (as we can press enter to submit details in a form), it doesn't cause a refresh which may change the URL a bit
        const url = baseUrl + 'api/customers/' + id;
        fetch(url, {
            method: 'POST',
            headers: {          //'headers' is an object here
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tempCustomer)
        }).then((response) => {
            if(!response.ok) throw new Error('Something went wrong!');      //All the error in the 200-299 range (HTTP range)
            return response.json()
        }).then((data) => {
            setCustomer(data.customer);
            setChanged(false);
            console.log(data);
            setError(undefined);        //If there are no errors, we don't print the message
        }).catch((e) => {
            console.log('e', e);
            setError(e.message);        //'e' is just an error but to access it as a string, else React doesn't render it, we write it as e.message 
        });
    }

    return (
        <div className='p-3'>
            {notFound ? <p>The customer with id {id} was not found</p>: null}
            {customer ?
                <div>
                <form id="customer" className="w-full max-w-sm" onSubmit={updateCustomer}>
                <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/4">
                <label for="name">Name</label>
                </div>
                <div className="md:w-3/4">
                <input id="name" 
                    //className="m-2 block px-2" 
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                    type="text" value={tempCustomer.name} 
                onChange={(e) => {
                    setChanged(true);
                    setTempCustomer({
                        ...tempCustomer,        //First take all the property from the existing temporary customer
                        name: e.target.value    //We change the name property as mentioned in the format, i.e., in layman terms, changing it using the input in the field in the frontend
                    });
                }}/>
                </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/4">
                <label for="industry">Industry</label>
                </div>
                <div className="md:w-3/4">
                <input id="industry" 
                    //className="m-2 block px-2" 
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                    type="text" 
                    value={tempCustomer.industry}
                onChange={(e) => {
                    setChanged(true);
                    setTempCustomer({
                        ...tempCustomer,        //First take all the property from the existing temporary customer
                        industry: e.target.value    //We change the name property as mentioned in the format, i.e., in layman terms, changing it using the input in the field in the frontend
                    });
                }} />
                </div>
                </div>
                </form>
                {changed ? <div className='mb-2'>
                    <button 
                        className="bg-slate-400 hover:bg-slate-700 text-white font-bold py-2 px-4 mr-2 rounded"
                        //className='m-2' 
                        onClick={(e) => {
                        setTempCustomer({...customer});
                        setChanged(false);
                    }}>Cancel</button>
                    <button 
                        className="bg-purple-600 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded"
                        form="customer" 
                        //className='m-2' 
                        //onClick={updateCustomer}
                        >
                            Save
                        </button>
                </div> : null}
                
                <div>      
                <button 
                className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded"
                onClick={(e) => {
                    const url = baseUrl + 'api/customers/' + id;
                    fetch(url, {method:'DELETE', headers: {
                        'Content-Type':'application/json'
                    }})       //That is how we define what method we are using with 'fetch'
                    .then((response) => {
                        if(!response.ok)
                            throw new Error('Something went wrong')
                        //return response.json() : We don't do this because after we delete an entry we don't return anything
                        //assume things went well
                        navigate('/customers');
                    })
                    .catch((e) => {
                        setError(e.message);        //We don't need to unassign/undefine setError here because we are navigating anyways
                    });
                }}>Delete</button>
                </div>
                </div>:
                null}
                {error ? <p>{error}</p> : null}
                <br/>
            <Link 
                to = "/Customers">
                    <button className="no-underline bg-purple-600 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded">
                        Go Back
                    </button>
            </Link>
        </div>
    );
}