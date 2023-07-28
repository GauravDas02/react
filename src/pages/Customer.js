import {useParams, Link, useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import NotFound from '../components/NotFound';
import { baseUrl } from '../shared';

export default function Customer(){
    let {id} = useParams();
    const navigate = useNavigate();         //It is a hook
    //const [error, setError] = useState(false);
    const [customer, setCustomer] = useState();
    const [notFound, setNotFound] = useState(false);     //To render a 404 component in the same page

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
            return response.json()
        })
        .then((data) => {
            setCustomer(data.customer);
        });
    }, []);
/*
    function deleteCustomer(){
        console.log("deleting...");
    }
*/
    return (
        <>
            {notFound ? <p>The customer with id {id} was not found</p>: null}
            {customer ?
                <div>
                <p>{customer.id}</p>
                <p>{customer.name}</p>
                <p>{customer.industry}</p>
                </div>:
                null}
                <button onClick={(e) => {
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
                        console.log(e);
                    });
                }}>Delete</button>
                <br/>
            <Link to = "/Customers">Go Back</Link>
        </>
    );
}