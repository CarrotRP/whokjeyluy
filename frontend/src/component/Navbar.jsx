import './Navbar.css';
import profile from '../assets/person-circle.svg';
import moon from '../assets/moon-fill.svg';
import ProfileDropdown from './ProfileDropdown';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

function Navbar(props) {
    const { handlePopupOpen, handleProfPopupOpen, setIsPopup} = props;
    const {t} = useTranslation();

    const profileDropRef = useRef();

    const handleProfileDropdown = (e) => {
        e.stopPropagation();
        profileDropRef.current?.classList.toggle('profile-dropdown-active');
    }

    useEffect(() => {
        //outside click
        const handleOutsideClick = (e) => {
            if (profileDropRef.current && !profileDropRef.current.contains(e.target) && profileDropRef.current.classList.contains('profile-dropdown-active')) {
                profileDropRef.current?.classList.remove('profile-dropdown-active');
            }
        }

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        }

    }, []);

    return (
        <nav>
            <h1>{t('whokjeyluy')}</h1>
            <span className="right">
                <button className='add-borrower' onClick={(e) => handlePopupOpen(e, { type: 'add' })}>+ {t('add borrower')}</button>
                <img src={moon} alt="dark-mode" />
                <img src={profile} alt="user" onClick={handleProfileDropdown} />
                <ProfileDropdown profileDropRef={profileDropRef} handleProfPopupOpen={handleProfPopupOpen} setIsPopup={setIsPopup}/>
            </span>
        </nav>
    );
}

export default Navbar;