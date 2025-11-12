import { Link, Outlet, useLocation, useNavigate } from "react-router";
import './AuthLayout.css';
import { useState, useEffect } from "react";
import { BASE_URL } from "../config/config";

export default function AuthLayout() {
    const [isLoading, setIsLoading] = useState(true);
    
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${BASE_URL}/check-auth`, {
            credentials: 'include'
        }).then(res => res.json())
        .then(data => {
            console.log();
            if(data.authenticate){
                navigate(data.redirect);
            } else{
                navigate(data.redirect);
            }
        }).finally(() => setIsLoading(false));
    }, [isLoading]);

    if(isLoading) return null;

    return (
        <main className="authlayout">
            <div className="left-panel">
                <h1>Welcome to <br></br><span style={{fontFamily: 'Dancing Script'}}>WhoKjeyLuy</span></h1>
                <p>A platform to track who borrow, pay back money and summary owe amount. Handy for those who are lazy to write notes and calculation.</p>
            </div>
            <div className="right-panel">
                <h1>WhoKjeyLuy</h1>
                <div className="form">
                    <Outlet />
                </div>
                <Link to={location.pathname == '/signup' ? '/login' : '/signup'}>No Account? <b>Sign up</b></Link>
            </div>
        </main>
    );
}