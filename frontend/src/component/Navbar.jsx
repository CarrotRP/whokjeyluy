import Popup from './Popup';
import './Navbar.css';
import { useEffect, useRef } from 'react';

function Navbar(props) {
    const popupRef = useRef(null);
    const popupContentRef = useRef(null);
    const currencyRef = useRef(null);
    const {fetchTransaction, fetchSummary} = props;

    const handlePopupOpen = (e) => {
        e.stopPropagation();
        popupRef.current.classList.toggle('popup-active');
    }
    const handlePopupClose = () => {
        popupRef.current.classList.remove('popup-active');
        currencyRef.current.classList.remove('dropdown-c-active');
    }

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (popupRef.current && popupRef.current.classList.contains('popup-active') && !popupContentRef.current.contains(e.target)) {
                popupRef.current.classList.remove('popup-active');
                currencyRef.current.classList.remove('dropdown-c-active');
            }

            if(currencyRef.current && !currencyRef.current.contains(e.target)){
                currencyRef.current.classList.remove('dropdown-c-active');
            }
        }
        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        }
    }, []);

    return (
        <nav>
            <h1>WhoKjeyLuy🙏</h1>
            <span className="right">
                <button className="dark-mode">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16">
                        <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278" />
                    </svg>
                </button>
                {/* todo move the popup to the top of layout, so it can be reuse */}
                <button className='add' onClick={handlePopupOpen}>+ Add person</button>
                <Popup 
                    refs={{
                        currencyRef,
                        popupRef,
                        popupContentRef
                    }}
                    handlePopupClose={handlePopupClose}
                    fetcher={{
                        fetchTransaction,
                        fetchSummary
                    }}/>
            </span>
        </nav>
    );
}

export default Navbar;