import Popup from './Popup';
import './Navbar.css';
import { useEffect, useRef } from 'react';
import profile from '../assets/person-circle.svg';
import moon from '../assets/moon-fill.svg';
import { BASE_URL } from '../config/config';
import { useNavigate } from 'react-router';

function Navbar(props) {

    const navigate = useNavigate();

    const { handlePopupOpen } = props;

    const handleLogout = () => {
        fetch(`${BASE_URL}/logout`, {
            credentials: 'include',
            method: 'POST'
        }).then(res => res.json())
            .then(data => {
                navigate(data.redirect);
            })
    }

    return (
        <nav>
            <h1 onClick={handleLogout}>WhoKjeyLuy</h1> {/**logout here for now */}
            <span className="right">
                <button className='add-borrower' onClick={(e) => handlePopupOpen(e, {type: 'add'})}>+ Add Borrower</button>
                <img src={moon} alt="dark-mode" />
                <img src={profile} alt="user" />
            </span>
        </nav>
    );
}

export default Navbar;