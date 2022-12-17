import React, { useState, useEffect } from 'react';
import Status from '../components/Status';
import CowerkerCard from '../components/CowerekerCard';
import Navbar from "../components/Navbar";
// import { useNavigate } from 'react-router-dom';

function Cowerkers() {
    // const navigate = useNavigate();
    const [userList, setUserList] = useState([]);
    const editorialList = userList.filter(user => user.department === "Editorial")
    const visualsList = userList.filter(user => user.department === "Visuals")
    const audienceGrowthList = userList.filter(user => user.department === "Audience Growth")

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

    console.log(editorialList);
    console.log(visualsList);
    console.log(audienceGrowthList);

    // const handleViewCowerker = () => {
    //     navigate('/cowerkers/schedule')
    // };

    return (
        <div>
            <Navbar />
            <Status />
            <h1>Cowerkers</h1>
            <div className="department">
                <h2>Visuals Department</h2>
                {visualsList.map((user, index) => (
                    <CowerkerCard 
                    key={index} 
                    name={user.name} 
                    designation={user.designation} 
                    status={user.status}
                    workMode={user.workMode}
                    workingHours={user.workingHours}
                    onClick={handleViewCowerker(user._id)}
                    />
                ))}
            </div>
            <div className="department">
                <h2>Editorial Department</h2>
                {editorialList.map((user, index) => (
                    <CowerkerCard 
                    key={index} 
                    name={user.name} 
                    designation={user.designation} 
                    status={user.status}
                    workMode={user.workMode}
                    workingHours={user.workingHours}
                    onClick={handleViewCowerker(user._id)}
                    />
                ))}
            </div>
            <div className="department">
                <h2>Audience Growth Department</h2>
                {audienceGrowthList.map((user, index) => (
                    <CowerkerCard 
                    key={index} 
                    name={user.name} 
                    designation={user.designation} 
                    status={user.status}
                    workMode={user.workMode}
                    workingHours={user.workingHours}
                    viewCowerker={handleViewCowerker(user._id)}
                    />
                ))}
            </div>
        </div>
    )
}

export default Cowerkers;