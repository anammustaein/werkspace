import React from 'react';
import user from '../assets/user.png';
import '../App.css';

function CowerkerCard() {
  return (
    <div className="user-card">
        <img src={user}/>
        <div className="user-container">
            <h4 className="text-center"><b>Name</b></h4>
            <p className="text-center">Designation</p>
            <p className="text-center">Status | Work Mode</p>
            <button>View Schedule</button>
        </div>
    </div>
  );
}

export default CowerkerCard;