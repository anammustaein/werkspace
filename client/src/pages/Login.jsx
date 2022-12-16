import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateLoggedInUser } from '../redux/user';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userId = useSelector((state) => state.user.id);

    const [loginFail, setLoginFail] = useState(false)

    useEffect(() => {
        if (userId === "") {
            const fetchData = async () => {
                fetch('/api/user/checklogin').then((res) => {
                    if (res.status === 200){
                        return res.json()
                    }
                    throw new Error({
                        message: "No user logged in"
                    })
                }).then((data) => {
                    dispatch(updateLoggedInUser(data))
                    navigate('/home')
                }).catch((err) => {
                    console.log(err)
                })
            }
            fetchData();
        }
        return;
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;

        fetch('/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({email, password})
        }).then((res) => {
            console.log(res)
            if (res.status !== 202) {
                setLoginFail(true)
                throw new Error({
                    message: "Login failed"
                })
            }
            return res.json()
        }).then((data) => {
            console.log(data)
            dispatch(updateLoggedInUser(data))
            navigate('/home')
        }).catch((err) => {
            console.log(err)
        })
    };

    return (
        <div>
            <div className="login-form">
                <h1>Login</h1>
                {loginFail && <span>Login failed</span>}
                <form autoComplete="off" onSubmit={handleSubmit}>
                    <label>Email:</label>
                    <br/>
                    <input type="email" name="email" required />
                    <br/>
                    <label>Password:</label>
                    <br/>
                    <input type="password" name="password" required />
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