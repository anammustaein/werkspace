import React from 'react';
import Status from '../components/Status';

function ScheduleMeeting() {

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Meeting scheduled");
    };

    return (
        <div>
            <Status />
            <h1>Schedule Meeting</h1>
            <div className="addtask-form">
                <form>
                    <label>Title:</label>
                    <input type="text" placeholder="Enter meeting title"/>
                    <br/>
                    <label>Description:</label>
                    <input type="text" placeholder="Enter task description"/>
                    <br/>
                    <label>Location:</label>
                    <input type="text" placeholder="Enter location"/>
                    <br/>
                    <label>Meeting mode:</label>
                    <select name="work-mode">
                        <option value="on-site">On-site</option>
                        <option value="online">Online</option>
                    </select>
                    <br/>
                    <label>Attendees:</label>
                    <select name="attendees">
                        <option value="Cowerker 1">Cowerker 1</option>
                        <option value="Cowerker 2">Cowerker 2</option>
                        <option value="Cowerker 3">Cowerker 3</option>
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
                    <input type="submit" value="Schedule Meeting" onClick={handleSubmit}/>
                </form>
            </div>
        </div>
    )
};

export default ScheduleMeeting;