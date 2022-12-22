import React, { useState, useEffect } from 'react';
import ScheduleCard from '../components/ScheduleCard';
import Status from '../components/Status';
import Navbar from "../components/Navbar";
import { useSelector } from 'react-redux';

function CowerkersSchedule() {
    const selectedUser = useSelector((state)=>state.selectedUser)
    const name = selectedUser.name
    const designation = selectedUser.designation
    const department = selectedUser.department
    const status = selectedUser.status
    const workMode = selectedUser.workMode
    const workingHours = selectedUser.workingHours

    const [taskList, setTaskList] = useState([]);
    const userTaskList = taskList.filter(task => task.attendees.includes(selectedUser._id))
    const sortedTaskList = userTaskList.sort((a, b) => a.startTime - b.startTime);

    useEffect(() => {
        fetch('/api/task/')
        .then((res) => {
            return res.json()
        }).then((data) => {
            setTaskList(data)
        }).catch((err) => {
            console.log(err)
        })
    }, []);

    console.log(taskList)
    console.log(userTaskList)

    return (
        <div>
            <Navbar />
            <Status />
            <div className="user-details">
                <h1>{name}</h1>
                <p>{designation} ({department})</p>
                <p>{status} | {workMode} </p>
                <p>Working Hours: {workingHours}</p>
            </div>
            <div className="daily-schedule">
                <h2>{name}'s Schedule</h2>
                {sortedTaskList.map((task, index) => (
                    <ScheduleCard 
                    key={index}
                    _id={task._id}
                    title={task.title}
                    type={task.type}
                    description={task.description}
                    location={task.location}
                    startTime={task.startTime}
                    endTime={task.endTime}
                    createdBy={task.createdBy}
                    />
                ))}
            </div>
        </div>
    )
}

export default CowerkersSchedule;