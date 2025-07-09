import { useState, useEffect, useContext } from "react";
import { UrlContext } from "../context/UrlContext";

function SearchBar(props) {
    const [name, setName] = useState('');
    const { dispatch } = useContext(UrlContext)

    useEffect(() => {
        if (name == '') {
            props.setCurrentPage(1);
            dispatch({ type: 'SET_URL', payload: `http://localhost:3000/user/get-transaction` });
        } else {
            props.setCurrentPage(1);
            dispatch({ type: 'SET_URL', payload: `http://localhost:3000/user/get-transaction?name=${encodeURIComponent(name)}` });
        }
    }, [name]);

    return (
        <span className="searchBar">
            <input type="text" className="search" placeholder="Search by name" value={name} onChange={e => setName(e.target.value)} />
            {/* this is for multiple delete, (checkbox, use array, query delete where in (?)) */}
            <button className="delete">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                </svg>
            </button>
        </span>
    );
}

export default SearchBar;