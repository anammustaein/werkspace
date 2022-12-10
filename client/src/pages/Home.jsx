import React from 'react';
import ScheduleCard from '../components/ScheduleCard';
import Status from '../components/Status';

function Home() {
    return (
        <div>
            <Status />
            <div className="user-details">
                <h1>User Name</h1>
                <h2>Designation (Department)</h2>
                <p>Working Hours: 00:00 - 00:00</p>
                <p>Status | Work Mode</p>
            </div>
            <div className="button-container">
                <button>View other dates</button>
            </div>
            <div className="daily-schedule">
                <h2>Today's Schedule</h2>
                <ScheduleCard />
            </div>
            <div className="daily-schedule">
                <h2>Tomorrow's Schedule</h2>
                <ScheduleCard />
            </div>
        </div>
    )
};

export default Home;