import React from 'react';
import { Link } from 'react-router-dom';

function Signup() {

    const handleSubmit = (event) => {
        event.preventDefault();
    }
    
    return (
        <div>
            <div className="signup-form">
                <h1>Sign up</h1>
                <form>
                    <label>First Name:</label>
                    <br/>
                    <input type="text" placeholder="Enter first name here"/>
                    <br/>
                    <label>Last Name:</label>
                    <br/>
                    <input type="text" placeholder="Enter last name here"/>
                    <br/>
                    <label>Email:</label>
                    <br/>
                    <input type="email" placeholder="Enter email here"/>
                    <br/>
                    <label>Password:</label>
                    <br/>
                    <input type="password" placeholder="Enter password here"/>
                    <br/>
                    <label>Department:</label>
                    <br/>
                    <select name="department">
                        <option value="editorial">Editorial</option>
                        <option value="visuals">Visuals</option>
                        <option value="audience-growth">Audience Growth</option>
                    </select>
                    <br/>
                    <label>Designation:</label>
                    <br/>
                    <input type="text" placeholder="Enter designation here"/>
                    <br/>
                    <label>Working Hours:</label>
                    <br/>
                    <input type="time"/>
                    <span> - </span>
                    <input type="time"/>
                    <br/>
                    <input type="submit" value="Sign up" onClick={handleSubmit}/>
                </form>
            </div>
            <div className="form-base">
                <p>Already have an account? Log in <Link to="/login">here</Link>.</p>
            </div>
        </div>
    )
};

export default Signup;