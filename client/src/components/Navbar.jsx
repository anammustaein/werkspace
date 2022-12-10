import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <div className="navbar">
            <div>
                <h1>werkspace</h1>
            </div>
            <div><Link to="/" className="link">Home</Link></div>
            <div><Link to="/cowerkers" className="link">Cowerkers</Link></div>
            <div><Link to="/addtask" className="link">Add Task</Link></div>
            <div><Link to="/meeting" className="link">Schedule Meeting</Link></div>
            <div><Link to="/editprofile" className="link">Edit Profile</Link></div>
        </div>
    )
};

export default Navbar;