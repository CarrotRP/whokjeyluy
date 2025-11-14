import { useEffect, useRef } from "react";
import './SearchBar.css';
import filter from '../assets/funnel.svg'

function SearchBar(props) {
    const { summary, query, setQuery } = props;
    const borrowerRef = useRef();

    const handleSearchDropdown = (e) => {
        e.stopPropagation();
        borrowerRef.current.classList.toggle('ul-active')
    }

    const handleNameClick = (e) => {
        setQuery(e.target.textContent);
        borrowerRef.current.classList.remove('ul-active')
    }

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if(borrowerRef.current && !borrowerRef.current.contains(e.target) && borrowerRef.current.classList.contains('ul-active')){
                borrowerRef.current.classList.remove('ul-active');
            }
        }

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        }
    }, []);

    return (
        <span className="searchBar">
            <span>
                <input type="text" className="search" placeholder="Search by name" onClick={handleSearchDropdown} value={query} onChange={e => setQuery(e.target.value)}/>
                <button>Search</button> {/*might remove this button later, cuz using autosearch(or debounce search) */}
            </span>
            {
                summary.length > 0 &&
                <ul ref={borrowerRef} onClick={handleNameClick}>
                    {summary?.map(s => {
                        return <li key={s.userId}>{s._id}</li>
                    })}
                </ul>
            }
            <img src={filter} alt="" />
        </span>
    );
}

export default SearchBar;