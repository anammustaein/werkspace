import React, { useState, useEffect } from 'react';
import ScheduleCard from '../components/ScheduleCard';
import Status from '../components/Status';
import Navbar from "../components/Navbar";

function Home() {
    const [userName, setUserName] = useState("");
    const [designation, setDesignation] = useState("")
    const [department, setDepartment] = useState("")
    const [workingHours, setWorkingHours] = useState("")
    const [userTaskList, setUserTaskList] = useState([]);
    const sortedTaskList = userTaskList.sort((a, b) => a.startTime - b.startTime);

    useEffect(() => {
        const fetchData = async () => {
            fetch('/api/user/checklogin').then((res) => {
                return res.json()
            }).then((data) => {
                console.log(data)
                setUserName(data.name)
                setDesignation(data.designation)
                setDepartment(data.department)
                setWorkingHours(data.workingHours)
            }).catch((err) => {
                console.log(err)
            })
        }
    
        fetchData();
    }, []);

    useEffect(() => {
        const fetchTaskList = async () => {
            fetch('/api/user/tasks')
            .then((res) => {
                return res.json()
            }).then((data) => {
                const updatedData = data.taskList
                setUserTaskList(updatedData)
            }).catch((err) => {
                console.log(err)
            })
        };
    
        fetchTaskList();
    }, []);

    console.log(userTaskList);
    console.log(sortedTaskList);

    const handleTaskDelete = (taskId) => {
        console.log("clicked");
        // return async () => {
        //   fetch("/api/task/delete", {
        //     method: "DELETE",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({ _id: taskId }),
        //   })
        //     .then((res) => {
        //       console.log(res);
        //       if (res.status !== 200) {
        //         throw new Error({ 
        //             message: "Only creators can delete task" 
        //         });
        //       }
        //       return res.json();
        //     })
        //     .then((data) => {
        //       console.log(data);
        //     })
        //     .catch((error) => {
        //       console.log(error);
        //     });
        // };
      };

    return (
        <div>
            <Navbar />
            <Status />
            <div className="user-details">
                <h1>{userName}</h1>
                <h2>{designation} ({department})</h2>
                <p>Working Hours: {workingHours}</p>
            </div>
            <div className="button-container">
                <button>View other dates</button>
            </div>
            <div className="daily-schedule">
                <h2>Schedule</h2>
                {sortedTaskList.map((task, index) => (
                    <ScheduleCard 
                    key={index}
                    title={task.title}
                    type={task.type}
                    description={task.description}
                    location={task.location}
                    startTime={task.startTime}
                    endTime={task.endTime}
                    createdBy={task.createdBy}
                    attendees={task.attendees}
                    taskDelete={handleTaskDelete(task._id)}
                    />
                ))}
            </div>
        </div>
    )
}

export default Home;