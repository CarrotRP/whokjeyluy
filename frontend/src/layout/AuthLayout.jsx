import { Link, Outlet, useLocation } from "react-router";
import './AuthLayout.css';

export default function AuthLayout() {
    const location = useLocation();

    const consoler = () => {
        console.log(location)
    }

    return (
        <main className="authlayout">
            <div className="left-panel">
                <h1 onClick={consoler}>Welcome to <br></br><span style={{fontFamily: 'Dancing Script'}}>WhoKjeyLuy</span></h1>
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