export default function Login() {
    return (
        <>
            <h2>Login</h2>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
            {/* <span className="option">
                <span>
                    <input type='checkbox' id="remember" />
                    <label htmlFor="remember">Remember Me</label>
                </span>
                <p>Forgot Password</p>
            </span> */}
            <button>Login</button>
        </>
    );
}