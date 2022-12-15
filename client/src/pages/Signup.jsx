import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateLoggedInUser } from '../redux/user';

function Signup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userId = useSelector((state) => state.user.id);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        const department = event.target.department.value;
        const designation = event.target.designation.value;
        const startTime = event.target.startTime.value;
        const endTime = event.target.endTime.value;
        const workingHours = startTime + " - " + endTime;
        const workMode = "In office";
        const status = "Available";
        
        fetch('api/user/register', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                name, 
                email, 
                password, 
                department, 
                designation,
                workingHours,
                workMode,
                status
            })
        }).then((res) => {
            if (res.status === 409) {
                throw new Error({
                    message: 'Email has already been used'
                })
            }
            if (res.status !== 201) {
                throw new Error({
                    message: data.message
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
            <div className="signup-form">
                <h1>Sign up</h1>
                <form onSubmit={handleSubmit}>
                    <label>Name:</label>
                    <br/>
                    <input type="text" name="name" required/>
                    <br/>
                    <label>Email:</label>
                    <br/>
                    <input type="email" name="email" required/>
                    <br/>
                    <label>Password:</label>
                    <br/>
                    <input type="password" name="password" required/>
                    <br/>
                    <label>Department:</label>
                    <br/>
                    <select name="department">
                        <option value="Editorial">Editorial</option>
                        <option value="Visuals">Visuals</option>
                        <option value="Audience Growth">Audience Growth</option>
                    </select>
                    <br/>
                    <label>Designation:</label>
                    <br/>
                    <input type="text" name="designation" required/>
                    <br/>
                    <label>Working Hours:</label>
                    <br/>
                    <input type="time" name="startTime" required/>
                    <span> - </span>
                    <input type="time" name="endTime" required/>
                    <br/>
                    <button>Sign up</button>
                </form>
            </div>
            <div className="form-base">
                <p>Already have an account? Log in <Link to="/login">here</Link>.</p>
            </div>
        </div>
    )
};

export default Signup;