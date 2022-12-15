import React, { useState, useEffect } from "react";

function Status() {
  const [workMode, setWorkMode] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      fetch('/api/user/checklogin')
      .then((res) => {
        if (res.status !== 200) {
          throw new Error({
            message: 'No user logged in'
          })
        }
        return res.json();
      }).then((data) => {
        console.log(data)
        setStatus(data.status)
        setWorkMode(data.workMode)
      }).catch((err) => {
        console.log(err)
      })
    };

    fetchData();
  });

  const handleUpdateStatus = async (event) => {
    const status = event.target.value
    
    fetch('/api/user/updatestatus', {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({status})
    }).then((res) => {
      return res.json();
    }).then((data) => {
      console.log(data)
      setStatus(data.status)
    }).catch((err) => {
      console.log(err)
    })
};

const handleUpdateWorkMode = async (event) => {
  const workMode = event.target.value
  
  fetch('/api/user/updateworkmode', {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({workMode})
  }).then((res) => {
    return res.json();
  }).then((data) => {
    console.log(data)
    setWorkMode(data.workMode)
  }).catch((err) => {
    console.log(err)
  })
};

return (
<div className="status">
  <div>
      <div className="status">
        <label>Status: </label>
        <select name="status" defaultValue={status} onChange={handleUpdateStatus}>
          <option value="Available">Available</option>
          <option value="Away">Away</option>
          <option value="Busy">Busy</option>
          <option value="On leave">On leave</option>
          <option value="On medical leave">On medical leave</option>
          <option value="Offline">Offline</option>
        </select>
      </div>
      <div className="work-mode">
        <label>Work Mode: </label>
        <select name="workMode" defaultValue={workMode} onChange={handleUpdateWorkMode}>
          <option value="In office">In office</option>
          <option value="Remote (home)">Remote - Home</option>
          <option value="Remote (outside)">Remote - Outside</option>
          <option value="Remote (overseas)">Remote - Overseas</option>
        </select>
      </div>
  </div>
  <div className="user-name">
    <span>User Name</span>
  </div>
</div>
);
}

export default Status;
