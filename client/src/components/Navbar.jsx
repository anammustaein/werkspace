import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateLoggedInUser } from '../redux/user';

function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        fetch('/api/user/logout', {
            method: "POST"
        }).then((res) => {
            if (res.status === 202) {
                dispatch(updateLoggedInUser({
                    id: "",
                    name: "",
                    email: ""
                }))
            }
            navigate('/login')
        }).catch((err) => {
            console.log(err)
        })
    };

    return (
        <div className="navbar">
            <div>
                <h1>werkspace</h1>
            </div>
            <div><Link to="/home" className="link">Home</Link></div>
            <div><Link to="/cowerkers" className="link">Cowerkers</Link></div>
            <div><Link to="/addtask" className="link">Add Task</Link></div>
            <div><Link to="/meeting" className="link">Schedule Meeting</Link></div>
            <div><Link to="/editprofile" className="link">Edit Profile</Link></div>
            <div><Link onClick={handleLogout} className="link">Logout</Link></div>
        </div>
    )
};

export default Navbar;