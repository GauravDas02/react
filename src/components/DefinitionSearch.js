import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

export default function DefinitionSearch()
{
    const [word, setWord] = useState('');
    const navigate = useNavigate();                         //might want to look at redirecting if you would like

    return(
    <form className="flex space-between space-x-2 max-w-[300px] py-2"
        onSubmit={() => {
            navigate('/dictionary/' + word);
        }}>
            <input 
                className="shrink min-w-0 px-2 py-1 rounded"        //shrink inside of flex, and min width because by default inputs have a min width and prevent our functionality (here, shrink) from working
                placeholder="Dinosaur"
                type='text' 
                onChange={(e) => {
                    setWord(e.target.value);
            }} />
            <button className="bg-purple-600 hover:bg-purple-800 text-white font-bold py-1 px-2 rounded" 
                onClick={() => {
                //console.log('click')
                //navigate('/definition/tacos');
            //navigate('/definition/' + word);
                //navigate('/definition/' + word, {replace: true});
                }}>Search</button>
    </form>
    )
}