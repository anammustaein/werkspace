import React, { useState, useEffect } from 'react';
import ScheduleCard from '../components/ScheduleCard';
import Status from '../components/Status';
import Navbar from "../components/Navbar";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loggedInUserActions } from '../redux/loggedInUser';

function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loggedInUser = useSelector((state)=>state.loggedInUser)
    const _id = loggedInUser._id
    const name = loggedInUser.name
    const designation = loggedInUser.designation
    const department = loggedInUser.department
    const workingHours = loggedInUser.workingHours

    const [taskList, setTaskList] = useState([]);
    const userTaskList = taskList.filter(task => task.attendees.includes(_id))
    const sortedTaskList = userTaskList.sort((a, b) => a.startTime - b.startTime);

    useEffect(() => {
        const fetchData = async () => {
            fetch('/api/user/checklogin').then((res) => {
                return res.json()
            }).then((data) => {
                // console.log(data)
                dispatch(loggedInUserActions.updateLoggedInUser(data))
            }).catch((err) => {
                console.log(err)
            })
        }
    
        fetchData();
    }, []);

    useEffect(() => {
        if (loggedInUser._id === "") {
            navigate('/login')
        }
    }, []);

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

    console.log(taskList);
    console.log(sortedTaskList);

    return (
        <div>
            <Navbar />
            <Status />
            <div className="user-details">
                <h1>{name} (Me)</h1>
                <p>{designation} ({department})</p>
                <p>Working Hours: {workingHours}</p>
            </div>
            <div className="daily-schedule">
                <h2>My Schedule</h2>
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

export default Home;