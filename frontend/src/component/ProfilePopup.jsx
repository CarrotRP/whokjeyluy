import './ProfilePopup.css';
import profile from '../assets/person-circle.svg'
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { LenderContext } from '../context/LenderContext';
import {BASE_URL} from '../config/config';

export default function ProfilePopup(props) {
    const { profRef, profConRef, isPopup, setIsPopup } = props;
    const { user } = useContext(LenderContext);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [newPw, setNewPw] = useState('');
    const [conNewPw, setConNewPw] = useState('');

    const { t } = useTranslation();

    const handlePopupClose = () => {
        profRef.current?.classList.remove('profile-popup-active');
        console.log(user);
        setIsPopup(false);
    }

    const handleUpdateUser = () => {
        if(username && email && newPw){
            if(newPw === conNewPw){
                fetch(`${BASE_URL}/user`, {
                    credentials: 'include',
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({username, email, password: newPw})
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    handlePopupClose();
                })
            }
        }
    }

    useEffect(() => {
        if (isPopup) {
            setUsername(user?.username);
            setEmail(user?.email);
            setNewPw('');
            setConNewPw('');
        }
    }, [isPopup]);

    return (
        <div className="profile-popup" ref={profRef}>
            <div className="profile-popup-content" ref={profConRef}>
                <div className="head">
                    <h1>{t('profile')}</h1>
                    <button onClick={handlePopupClose}>&#215;</button>
                </div>
                <div className="content-body">
                    <div className="profile">
                        <img src={profile} alt="user" />
                        <span>
                            <p>{user?.username}</p>
                            <p>{user?.email}</p>
                        </span>
                    </div>
                    <div className="inputs">
                        <span>
                            <label htmlFor="username">{t('username')}</label>
                            <input type="text" placeholder='' id='username' value={username} onChange={e => setUsername(e.target.value)} />
                        </span>
                        <span>
                            <label htmlFor="email">{t("email")}</label>
                            <input type='email' id='email' value={email} onChange={e => setEmail(e.target.value)} />
                        </span>
                        <span>
                            <label htmlFor="newpw">{t('new pw')}</label>
                            <input type="password" id='newpw' value={newPw} onChange={e => setNewPw(e.target.value)} />
                        </span>
                        <span>
                            <label htmlFor="con-new-pw">{t("confirm new pw")}</label>
                            <input type="password" id='con-new-pw' value={conNewPw} onChange={e => setConNewPw(e.target.value)} />
                        </span>
                    </div>
                </div>
                <span className='edited'>
                    <button className='cancel-btn' onClick={handlePopupClose}>{t('cancel')}</button>
                    <button className='update-btn' onClick={handleUpdateUser}>{t('update')}</button>
                </span>
            </div>
        </div>
    );
}