import { useState } from "react";
import { BASE_URL } from "../config/config";
import { useNavigate, useOutletContext } from "react-router";

export default function Signup(){
    const {t} = useOutletContext();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [conPassword, setConPassword] = useState('');

    const navigate = useNavigate();

    const handleSignup = () => {
        if(username && email && password && conPassword){
            if(password == conPassword){
                fetch(`${BASE_URL}/signup`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({username, email, password})
                }).then(res => res.json())
                .then(data => {
                    navigate(data.redirect);
                })
            }
        }
    }

    return(
        <>
            <h2>{t('signup')}</h2>
            <label htmlFor="username">{t('username')}</label>
            <input type="text" id="username" onChange={e => setUsername(e.target.value)} value={username}/>
            <label htmlFor="email">{t('email')}</label>
            <input type="email" id="email" onChange={e => setEmail(e.target.value)} value={email}/>
            <label htmlFor="password">{t('password')}</label>
            <input type="password" id="password" onChange={e => setPassword(e.target.value)} value={password}/>
            <label htmlFor="conpassword">{t('confirm pw')}</label>
            <input type="password" id="conpassword" onChange={e => setConPassword(e.target.value)} value={conPassword}/>
            <button onClick={handleSignup}>{t('signup')}</button>
        </>
    );
}