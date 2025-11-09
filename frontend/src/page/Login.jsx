import { useState } from "react";
import { BASE_URL } from "../config/config";
import { useNavigate } from "react-router";


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleLogin = () => {
        console.log(email, password);
        fetch(`${BASE_URL}/login`, {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        }).then(res => res.json())
        .then(data => {
            console.log(data);
            navigate(data.redirect);
        })
    }

    return (
        <>
            <h2>Login</h2>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} value={email}/>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" onChange={e => setPassword(e.target.value)} value={password}/>
            {/* <span className="option">
                <span>
                    <input type='checkbox' id="remember" />
                    <label htmlFor="remember">Remember Me</label>
                </span>
                <p>Forgot Password</p>
            </span> */}
            <button onClick={handleLogin}>Login</button>
        </>
    );
}