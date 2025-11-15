import './ProfilePopup.css';
import profile from '../assets/person-circle.svg'
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function ProfilePopup(props) {
    const {profRef, profConRef, isPopup, setIsPopup} = props;
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [newPw, setNewPw] = useState('');
    const [conNewPw, setConNewPw] = useState('');

    const {t} = useTranslation();

    const handlePopupClose = () => {
        profRef.current?.classList.remove('profile-popup-active');
        setIsPopup(false);
    }

    useEffect(() => {
        if(isPopup){
            setUsername('');
            setEmail('');
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
                            <p>name</p>
                            <p>j@gmail.com</p>
                        </span>
                    </div>
                    <div className="inputs">
                        <span>
                            <label htmlFor="username">{t('username')}</label>
                            <input type="text" id='username' value={username} onChange={e => setUsername(e.target.value)}/>
                        </span>
                        <span>
                            <label htmlFor="email">{t("email")}</label>
                            <input type='email' id='email' value={email} onChange={e => setEmail(e.target.value)}/>
                        </span>
                        <span>
                            <label htmlFor="newpw">{t('new pw')}</label>
                            <input type="password" id='newpw' value={newPw} onChange={e => setNewPw(e.target.value)}/>
                        </span>
                        <span>
                            <label htmlFor="con-new-pw">{t("confirm new pw")}</label>
                            <input type="password" id='con-new-pw' value={conNewPw} onChange={e => setConNewPw(e.target.value)}/>
                        </span>
                    </div>
                </div>
                <span className='edited'>
                    <button className='cancel-btn'>{t('cancel')}</button>
                    <button className='update-btn'>{t('update')}</button>
                </span>
            </div>
        </div>
    );
}