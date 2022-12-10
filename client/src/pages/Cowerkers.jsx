import React from 'react';
import Status from '../components/Status';
import CowerkerCard from '../components/CowerekerCard';

function Cowerkers() {
    return (
        <div>
            <Status />
            <h1>Cowerkers</h1>
            <div className="department">
                <h2>Visuals Department</h2>
                <CowerkerCard />
            </div>
            <div className="department">
                <h2>Editorial Department</h2>
                <CowerkerCard />
            </div>
            <div className="department">
                <h2>Audience Growth Department</h2>
                <CowerkerCard />
            </div>
        </div>
    )
};

export default Cowerkers;