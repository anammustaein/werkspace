import React, { useState, useEffect } from 'react';
import Status from '../components/Status';
import Navbar from "../components/Navbar";

function ScheduleMeeting() {
    const [userList, setUserList] = useState([]);
    const [attendeeList, setAttendeeList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            fetch('/api/user/userList')
            .then((res) => {
                return res.json();
            }).then((data) => {
                // Ensure that encrypted password is not seen
                data.forEach(user => {
                    delete user.password
                })
                setUserList(data)
            }).catch((err) => {
                console.log(err)
            })
        };
    
        fetchData();
      }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const title = event.target.title.value;
        const type = "Meeting";
        const description = event.target.description.value;
        const location = event.target.location.value;
        const startTime = event.target.startTime.value + ":00.000Z";
        const endTime = event.target.endTime.value + ":00.000Z";
        const attendees = attendeeList;

        console.log(
            "title:", title, 
            "type:", type, 
            "description:", description, 
            "location:", location, 
            "startTime:", startTime, 
            "endTime:", endTime, 
            "attendees:", attendeeList);

        fetch('/api/task/create', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
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

    const addAttendee = (event) => {
        console.log(event.target.value)
        setAttendeeList([...attendeeList, event.target.value])
        console.log(attendeeList);
    }

    return (
        <div>
            <Navbar />
            <Status />
            <h1>Schedule Meeting</h1>
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
                    <input type="datetime-local" name="startTime" />
                    <span> - </span>
                    <input type="datetime-local" name="endTime" />
                    <br/>
                    <label>Attendees:</label>
                    {/* {userList.map((user, index) => (
                        <label key={index}>
                            {user.name}
                            <input type="checkbox" value={user._id} name={user.name}/>
                        </label>
                    ))} */}
                    <select name="attendees" multiple="multiple">
                        {userList.map((user, index) => (
                            <option key={index} value={user._id} onClick={addAttendee}>{user.name}</option>
                        ))}
                    </select>
                    <br/>
                    <button>Confirm</button>
                </form>
            </div>
        </div>
    )
}

export default ScheduleMeeting;