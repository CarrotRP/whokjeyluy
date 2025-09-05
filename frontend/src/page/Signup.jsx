export default function Signup(){
    return(
        <>
            <h2>Sign up</h2>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
            <label htmlFor="conpassword">Confirm Password</label>
            <input type="password" id="conpassword" />
            <button>Login</button>
        </>
    );
}