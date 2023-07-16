import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom";
import {v4 as uuidv4} from 'uuid';
import NotFound from '../components/NotFound'
import DefinitionSearch from "../components/DefinitionSearch";

export default function Definition(){
    const [word, setWord] = useState([]);
    const [error, setError] = useState(false);
    const [notFound, setnotFound] = useState(false);
    let { search } = useParams();           //destructuring the object 'search'
    const navigate = useNavigate();

    useEffect(() => {
        //console.log('page loaded');
        //const url = 'http://httpstatefwiufhwiuhf.com';
        //const url = 'http://httpstat.us/501';
        const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + search;

        const headers = {
            Accept: 'application/json', // Set the Accept header from httpstat.us
          };

        fetch(url, {headers})
            //.then((response) => response.json())
            .then((response) => {
                console.log(response.status);
                if(response.status === 404){
                //console.log(response.status);
                   // navigate('/404')
                   setnotFound(true);
                }

                else if(response.status === 401){
                    navigate('/login');
                }

                else if(response.status === 500){
                    //setServerError(true)
                    setError(true);
                }

                if(!response.ok){
                    setError(true);

                    throw new Error('Something went wrong');
                }
                return response.json()
            })
            .then((data) => {
                setWord(data[0].meanings);
                //console.log(data[0].meanings);
            })
            .catch((e) => {
                console.log(e.message);
            });
    }, []);

    if(notFound === true){
        return (
            <>
            <NotFound />
            <Link to = "/dictionary">Search New Term</Link>
            </>
        );
    }

    if(error===true){
        return (
            <>
                <p>Something went wrong, try again?</p>
                <Link to = "/dictionary">Search Another Term</Link>
            </>
        );        
    }

    return (
        <>
            {word.length>0 
                ? (<> 
                <h1>Here is a definition:</h1>
                {word.map((meaning) => {         //in case the api fetch is not complete for the 'word'
                    return (<p key = {uuidv4()}>
                        {meaning.partOfSpeech + ': '}
                        {meaning.definitions[0].definition}
                </p>);
            })} 
            <p>Search again:</p>
            <DefinitionSearch/>
            </>): null}
        </>
    );
}