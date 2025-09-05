import Popup from './Popup';
import './Navbar.css';
import { useEffect, useRef } from 'react';
import profile from '../assets/person-circle.svg';
import moon from '../assets/moon-fill.svg';

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
            <h1>WhoKjeyLuy</h1>
            <span className="right">
                <button className='add-lender' onClick={handlePopupOpen}>+ Add person</button>
                <img src={moon} alt="dark-mode" />
                <img src={profile} alt="user" />
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