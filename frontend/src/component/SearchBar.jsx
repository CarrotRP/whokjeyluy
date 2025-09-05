import { useState, useEffect, useContext } from "react";
import { UrlContext } from "../context/UrlContext";
import filter from '../assets/funnel.svg'

function SearchBar(props) {
    // const [name, setName] = useState('');
    // const { dispatch } = useContext(UrlContext)

    // useEffect(() => {
    //     if (name == '') {
    //         props.setCurrentPage(1);
    //         dispatch({ type: 'SET_URL', payload: `http://localhost:3000/user/get-transaction` });
    //     } else {
    //         props.setCurrentPage(1);
    //         dispatch({ type: 'SET_URL', payload: `http://localhost:3000/user/get-transaction?name=${encodeURIComponent(name)}` });
    //     }
    // }, [name]);

    return (
        <span className="searchBar">
            <input type="text" className="search" placeholder="Search by name" value={name} onChange={e => setName(e.target.value)} />
            {/* this is for multiple delete, (checkbox, use array, query delete where in (?)) */}
            <img src={filter} alt="" />
        </span>
    );
}

export default SearchBar;