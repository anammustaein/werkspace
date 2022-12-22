import React, { useState, useEffect } from "react";
import Status from '../components/Status';
import Navbar from "../components/Navbar";

function EditProfile() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [department, setDepartment] = useState("");
    const [designation, setDesignation] = useState("");
    const [workingHours, setWorkingHours] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            fetch('/api/user/checklogin')
            .then((res) => {
              if (res.status !== 200) {
                throw new Error({
                  message: 'No user logged in'
                })
              }
              return res.json();
            }).then((data) => {
              console.log(data)
              setName(data.name)
              setEmail(data.email)
              setDepartment(data.department)
              setDesignation(data.designation)
              setWorkingHours(data.workingHours)
              setStartTime(data.workingHours.substring(0, 5))
              setEndTime(data.workingHours.substring(16, 8))
            }).catch((err) => {
              console.log(err)
            })
        };

        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const name = event.target.name.value
        const email = event.target.email.value
        const password = event.target.password.value
        const department = event.target.department.value
        const designation = event.target.designation.value
        const startTime = event.target.startTime.value;
        const endTime = event.target.endTime.value;
        const workingHours = startTime + " - " + endTime;
  
        fetch('/api/user/updateprofile', {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            name, 
            email, 
            password, 
            department, 
            designation,
            workingHours,
        })
        }).then((res) => {
            if (res.status !== 202) {
                throw new Error({
                    message: 'Profile update unsuccessful'
                })
            }
            return res.json();
        }).then((data) => {
            console.log(data)
            setName(data.name)
            setEmail(data.email)
            setDepartment(data.department)
            setDesignation(data.designation)
            setWorkingHours(data.workingHours)
        }).catch((err) => {
            console.log(err)
        })
    };

    return (
        <div>
            <Navbar />
            <Status />
            <div className="edit-profile-form">
                <h1>Edit Profile</h1>
                <form onSubmit={handleSubmit}>
                    <label>Name:</label>
                    <br/>
                    <input type="text" name="name" defaultValue={name} required/>
                    <br/>
                    <label>Email:</label>
                    <br/>
                    <input type="email" name="email" defaultValue={email} required/>
                    <br/>
                    <label>Password:</label>
                    <br/>
                    <input type="password" name="password" required/>
                    <br/>
                    <label>Department:</label>
                    <br/>
                    <select name="department" defaultValue={department}>
                        <option value="Editorial">Editorial</option>
                        <option value="Visuals">Visuals</option>
                        <option value="Audience Growth">Audience Growth</option>
                    </select>
                    <br/>
                    <label>Designation:</label>
                    <br/>
                    <input type="text" name="designation" defaultValue={designation} required/>
                    <br/>
                    <label>Working Hours:</label>
                    <br/>
                    <input type="time" name="startTime" defaultValue={startTime} required/>
                    <span> - </span>
                    <input type="time" name="endTime" defaultValue={endTime} required/>
                    <br/>
                    <button>Update</button>
                </form>
            </div>
        </div>
    )
};

export default EditProfile;