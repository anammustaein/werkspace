import React from 'react';
import '../App.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectedTaskActions } from '../redux/selectedTask';
import { useNavigate } from 'react-router-dom';

function ScheduleCard(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedTask = useSelector((state)=>state.selectedTask)
  const loggedInUserId = useSelector((state)=>state.loggedInUser._id)
  const taskCreatorId = props._createdBy

  const startTime = props.startTime;
  const endTime = props.endTime;

// Date time adjustments
  const date = startTime.slice(0, 10)
  const newStartTime = startTime.slice(11, 16)
  const newEndtime = endTime.slice(11, 16)

  const handleTaskEdit = () => {
    dispatch(selectedTaskActions.updateSelectedTask({_id: props._id}))
    dispatch(selectedTaskActions.updateSelectedTask({title: props.title}))
    dispatch(selectedTaskActions.updateSelectedTask({type: props.type}))
    dispatch(selectedTaskActions.updateSelectedTask({description: props.description}))
    dispatch(selectedTaskActions.updateSelectedTask({location: props.location}))
    dispatch(selectedTaskActions.updateSelectedTask({startTime: props.startTime}))
    dispatch(selectedTaskActions.updateSelectedTask({createdBy: props.createdBy}))
    dispatch(selectedTaskActions.updateSelectedTask({attendees: [props.attendees]}))

    console.log("editing " + props._id)
    navigate('/edittask')
  }

  const handleTaskDelete = () => {
    console.log("deleting " + props._id)
      fetch("/api/task/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: props._id }),
      }).then((res) => {
          console.log(res);
          if (res.status !== 200) {
            throw new Error({ 
                message: "Only creators can delete task" 
            });
          }
          return res.json();
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
  };

    return (
      <div className="schedule-card">
          <h3>{props.title} [{props.type}]</h3>
          <p>{props.description}</p>
          <p>Date: {date}</p>
          <p>Time: {newStartTime} - {newEndtime}</p>
          <button onClick={handleTaskEdit}>Edit</button>
          <button onClick={handleTaskDelete}>Delete</button>
  
      </div>
    );
}



export default ScheduleCard;