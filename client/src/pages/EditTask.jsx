import React, { useState } from 'react';
import Status from '../components/Status';
import Navbar from "../components/Navbar";
import { useSelector } from 'react-redux';

function EditTask() {
    const loggedInUser = useSelector((state)=>state.loggedInUser)

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Task submitted");
        const title = event.target.title.value;
        const type = "Task";
        const description = event.target.description.value;
        const location = event.target.location.value;
        const startTime = event.target.startTime.value;
        const endTime = event.target.endTime.value;
        const attendees = [loggedInUser._id];

        fetch('api/task/create', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title,
                type,
                description,
                location,
                startTime,
                endTime,
                attendees
            })
        }).then((res) => {
            if (res.status !== 201) {
                throw new Error({
                    message: 'Required fields cannot be left empty'
                })
            }
            return res.json();
        }).then((data) => {
            console.log(data)
        }).catch((err) => {
            console.log(err)
        })
    };

    return (
        <div>
            <Navbar />
            <Status />
            <h1>Edit Task</h1>
            <div className="addtask-form">
                <form onSubmit={handleSubmit}>
                    <label>Title:</label>
                    <input type="text" name="title"/>
                    <br/>
                    <label>Description:</label>
                    <input type="text" name="description"/>
                    <br/>
                    <label>Location:</label>
                    <input type="text" name="location"/>
                    <br/>
                    <label>Duration:</label>
                    <input type="datetime-local" name="startTime"/>
                    <span> - </span>
                    <input type="datetime-local" name="endTime"/>
                    <br/>
                    <button>Update</button>
                </form>
            </div>
        </div>
    )
}

export default EditTask;