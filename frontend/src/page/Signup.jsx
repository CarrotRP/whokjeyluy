import { useState } from "react";
import { BASE_URL } from "../config/config";
import { useNavigate } from "react-router";

export default function Signup(){
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [conPassword, setConPassword] = useState('');

    const navigate = useNavigate();

    const handleSignup = () => {
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

    return(
        <>
            <h2>Sign up</h2>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" onChange={e => setUsername(e.target.value)} value={username}/>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" onChange={e => setEmail(e.target.value)} value={email}/>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" onChange={e => setPassword(e.target.value)} value={password}/>
            <label htmlFor="conpassword">Confirm Password</label>
            <input type="password" id="conpassword" onChange={e => setConPassword(e.target.value)} value={conPassword}/>
            <button onClick={handleSignup}>Sign up</button>
        </>
    );
}