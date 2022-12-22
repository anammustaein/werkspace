import React from 'react';
import user from '../assets/user.png';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectedUserActions } from '../redux/selectedUser';

function CowerkerCard(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedUser = useSelector((state)=>state.selectedUser)

  const selectedUserId = props._id
  const selectedUserName = props.name

  const handleView = async () => {
    console.log("Viewing schedule for user:", selectedUserName)

    fetch('/api/user/finduser/' + selectedUserId)
    .then((res) => {
      return res.json()
    }).then((data) => {
      console.log(data)
      dispatch(selectedUserActions.updateSelectedUser(data))
      // console.log("selected user: " + selectedUser.name)
    }).catch((err) => {
      console.log(err)
    })

    navigate('/cowerkers/schedule/' + selectedUserName.toLowerCase())
  }


  return (
    <div className="user-card">
        <img src={user}/>
        <div className="user-container">
            <h4 className="text-center"><b>{props.name}</b></h4>
            <p className="text-center">{props.designation}</p>
            <p className="text-center">{props.status} | {props.workMode}</p>
            <p className="text-center">Working Hours: {props.workingHours}</p>
            <button onClick={handleView}>View Schedule</button>
        </div>
    </div>
  );
}

export default CowerkerCard;