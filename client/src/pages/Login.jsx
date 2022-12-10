import React from 'react';
import { Link } from 'react-router-dom';

function Login() {

    const handleSubmit = (event) => {
        event.preventDefualt();
    }

    return (
        <div>
            <div className="login-form">
                <h1>Login</h1>
                <form>
                    <label>Email:</label>
                    <br/>
                    <input type="text" placeholder="Enter email here"/>
                    <br/>
                    <label>Password:</label>
                    <br/>
                    <input type="password" placeholder="Enter password here"/>
                    <br/>
                    <input type="submit" value="Log in" onClick={handleSubmit}/>
                    </form>
            </div>
            <div className="form-base">
                <p>Don't have an account? Sign up <Link to="/signup">here</Link>.</p>
            </div>
        </div>
    )
};

export default Login;