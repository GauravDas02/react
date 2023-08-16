import {useState, useEffect} from 'react';
import { baseUrl } from '../shared';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Login(){
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const location = useLocation();                 //To find/get the location of our previous webpage after login we use the useLocation hook
                                                    //It will have the location/information that we last passed in our 'state' property in navigation of different pages while logging in

    const navigate = useNavigate();
    /*
    useEffect(() => {
        console.log(location.state.previousUrl);
        //locationRef.current = useLocation();
    })
    */
    function login(e){
        e.preventDefault();                     //To prevent a page refresh
        const url = baseUrl + 'api/token/';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }), 
        })
        .then((response) => {
            return response.json();
        }).then((data) => {
            localStorage.setItem('access', data.access);
            localStorage.setItem('refresh', data.refresh);
            navigate(
                location?.state?.previousUrl
                    ? location.state.previousUrl
                    : '/customers'
            );  
        });
    }

    return (
        <form id="customer" className="m-2 w-full max-w-sm" onSubmit={login}>
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/4">
                    <label htmlFor="username">Username</label>
                </div>
                
                <div className="md:w-3/4">
                    <input id="username" 
                        //className="m-2 block px-2" 
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                        type="text" 
                        //value={tempCustomer.name} 
                        value={username} 
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                    />
                </div>
            </div>

            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/4">
                    <label htmlFor="password">Password</label>
                </div>
                
                <div className="md:w-3/4">
                    <input id="password" 
                        //className="m-2 block px-2" 
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                        type="password" 
                        //value={tempCustomer.industry}
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }} />
                </div>
            </div>

            <button className='bg-purple-600 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded'>Login</button>
        </form>
    );
}