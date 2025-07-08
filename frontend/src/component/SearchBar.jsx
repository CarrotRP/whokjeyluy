import { useState, useEffect, useContext } from "react";
import { UrlContext } from "../context/UrlContext";

function SearchBar(props){
    const [name, setName] = useState('');
    const {dispatch} = useContext(UrlContext)

    useEffect(() => {
        if(name == ''){
            dispatch({type: 'SET_URL', payload: 'http://localhost:3000/user/get-transaction'});
        } else{
            dispatch({type: 'SET_URL', payload: `http://localhost:3000/user/get-transaction?name=${encodeURIComponent(name)}`});
        }
    }, [name]);

    return(
        <input type="text" className="search" placeholder="Search by name" value={name} onChange={e => setName(e.target.value)}/>
    );
}

export default SearchBar;