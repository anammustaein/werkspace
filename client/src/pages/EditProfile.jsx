import React from 'react';
import Status from '../components/Status';

function EditProfile() {

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Profile updated");
    };

    return (
        <div>
            <Status />
            <div className="edit-profile-form">
                <h1>Edit Profile</h1>
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
                    <input type="submit" value="Update Profile" onClick={handleSubmit}/>
                </form>
            </div>
        </div>
    )
};

export default EditProfile;