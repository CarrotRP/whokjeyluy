import { useState } from "react";
import { BASE_URL } from "../config/config";
import { useNavigate, useOutletContext } from "react-router";


export default function Login() {
    const { t } = useOutletContext();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleLogin = () => {
        fetch(`${BASE_URL}/login`, {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        }).then(res => res.json())
            .then(data => {
                navigate(data.redirect);
            })
    }

    return (
        <>
            <h2>{t('login')}</h2>
            <label htmlFor="email">{t('email')}</label>
            <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} value={email} />
            <label htmlFor="password">{t('password')}</label>
            <input type="password" id="password" onChange={e => setPassword(e.target.value)} value={password} onKeyDown={e => { if (e.key == 'Enter') handleLogin(); }} />
            {/* <span className="option">
                <span>
                    <input type='checkbox' id="remember" />
                    <label htmlFor="remember">Remember Me</label>
                </span>
                <p>Forgot Password</p>
            </span> */}
            <button onClick={handleLogin}>{t('login')}</button>
        </>
    );
}