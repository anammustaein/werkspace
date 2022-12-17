import React from 'react';
import '../App.css';

function ScheduleCard(props) {

  const startTime = props.startTime;
  const endTime = props.endTime;
  const date = startTime.slice(0, 10)
  const newStartTime = startTime.slice(11, 16)
  const newEndtime = endTime.slice(11, 16)

  return (
    <div className="schedule-card">
        <h3>{props.title} [{props.type}]</h3>
        <p>{props.description}</p>
        <p>Date: {date}</p>
        <p>Time: {newStartTime} - {newEndtime}</p>
        <button onClick={props.taskDelete}>Delete</button>
    </div>
  );
}

export default ScheduleCard;