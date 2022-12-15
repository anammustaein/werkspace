import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log (
            "Email:", email, "Password:", password
        )
    }

    return (
        <div>
            <div className="login-form">
                <h1>Login</h1>
                <form
                autoComplete="off"
                onSubmit={handleSubmit}>
                    <label>Email:</label>
                    <br/>
                    <input 
                    type="email" 
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                    />
                    <br/>
                    <label>Password:</label>
                    <br/>
                    <input 
                    type="password" 
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                    />
                    <br/>
                    <button>Log in</button>
                    </form>
            </div>
            <div className="form-base">
                <p>Don't have an account? Sign up <Link to="/signup">here</Link>.</p>
            </div>
        </div>
    )
};

export default Login;