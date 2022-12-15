import React from 'react';
import Status from '../components/Status';
import Navbar from "../components/Navbar";

function AddTask() {

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Task submitted");
    };

    return (
        <div>
            <Navbar />
            <Status />
            <h1>Add Task</h1>
            <div className="addtask-form">
                <form>
                    <label>Title:</label>
                    <input type="text" placeholder="Enter task title"/>
                    <br/>
                    <label>Description:</label>
                    <input type="text" placeholder="Enter task description"/>
                    <br/>
                    <label>Location:</label>
                    <input type="text" placeholder="Enter location"/>
                    <br/>
                    <label>Work mode:</label>
                    <select name="work-mode">
                        <option value="on-site">On-site</option>
                        <option value="online">Online</option>
                    </select>
                    <br/>
                    <label>Date:</label>
                    <input type="datetime-local"/>
                    <br/>
                    <label>Duration:</label>
                    <input type="time"/>
                    <span> - </span>
                    <input type="time"/>
                    <br/>
                    <input type="submit" value="Add Task" onClick={handleSubmit}/>
                </form>
            </div>
        </div>
    )
};

export default AddTask;