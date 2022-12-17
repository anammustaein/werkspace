import React from 'react';
import user from '../assets/user.png';
import '../App.css';

function CowerkerCard(props) {


  return (
    <div className="user-card">
        <img src={user}/>
        <div className="user-container">
            <h4 className="text-center"><b>{props.name}</b></h4>
            <p className="text-center">{props.designation}</p>
            <p className="text-center">{props.status} | {props.workMode}</p>
            <p className="text-center">Working Hours: {props.workingHours}</p>
            <button>View Schedule</button>
        </div>
    </div>
  );
}

export default CowerkerCard;