import Popup from './Popup';
import './Navbar.css';
import { useEffect, useRef } from 'react';
import profile from '../assets/person-circle.svg';
import moon from '../assets/moon-fill.svg';
import { BASE_URL } from '../config/config';
import { useNavigate } from 'react-router';

function Navbar(props) {
    const popupRef = useRef(null);
    const popupContentRef = useRef(null);
    const currencyRef = useRef(null); //currency dropdown
    const nameRef = useRef(); //borrower name dropdown
    const nameTriRef = useRef(); //triangle shape for borrower name
    const triRef = useRef(); //triangle shape ref for animation(currency triangle)

    const navigate = useNavigate();

    const { fetchLoans, fetchSummary, summary } = props;

    const handlePopupOpen = (e) => {
        e.stopPropagation();
        popupRef.current.classList.toggle('popup-active');
    }
    const handlePopupClose = () => {
        popupRef.current.classList.remove('popup-active');
        currencyRef.current.classList.remove('currency-ul-active');
    }

    const handleLogout = () => {
        fetch(`${BASE_URL}/logout`, {
            credentials: 'include',
            method: 'POST'
        }).then(res => res.json())
            .then(data => {
                navigate(data.redirect);
            })
    }

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (popupRef.current && popupRef.current.classList.contains('popup-active') && !popupContentRef.current.contains(e.target)) {
                popupRef.current.classList.remove('popup-active');
                currencyRef.current.classList.remove('currency-ul-active');
                nameRef.current.classList.remove('borrower-names-ul-active');
            }

            if (currencyRef.current && !currencyRef.current.contains(e.target) && currencyRef.current.classList.contains('currency-ul-active')) {
                currencyRef.current.classList.remove('currency-ul-active');
                triRef.current.style.transform = triRef.current.style.transform === 'rotateX(180deg)' ? 'rotateX(0deg)' : 'rotateX(180deg)';
            }

            if (nameRef.current && !nameRef.current.contains(e.target) && nameRef.current.classList.contains('borrower-names-ul-active')) {
                nameRef.current.classList.remove('borrower-names-ul-active');
                nameTriRef.current.style.transform = nameTriRef.current.style.transform === 'rotateX(180deg)' ? 'rotateX(0deg)' : 'rotateX(180deg)';
            }
        }
        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        }
    }, []);

    return (
        <nav>
            <h1 onClick={handleLogout}>WhoKjeyLuy</h1> {/**logout here for now */}
            <span className="right">
                <button className='add-borrower' onClick={handlePopupOpen}>+ Add Borrower</button>
                <img src={moon} alt="dark-mode" />
                <img src={profile} alt="user" />
                <Popup
                    refs={{
                        nameRef,
                        nameTriRef,
                        triRef,
                        currencyRef,
                        popupRef,
                        popupContentRef
                    }}
                    handlePopupClose={handlePopupClose}
                    fetcher={{
                        fetchLoans,
                        fetchSummary
                    }}
                    summary={summary}
                    type="add"
                />
            </span>
        </nav>
    );
}

export default Navbar;