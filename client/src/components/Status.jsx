import React from "react";

function Status() {

    const handleUpdateStatus = (event) => {
        event.preventDefault();
    }

  return (
    <div className="status">
      <div>
        <form>
          <div className="status">
            <label>Status: </label>
            <select name="status">
              <option value="available">Available</option>
              <option value="away">Away</option>
              <option value="busy">Busy</option>
              <option value="on-leave">On Leave</option>
              <option value="sick-leave">Sick Leave</option>
              <option value="offline">Offline</option>
            </select>
          </div>
          <div className="work-mode">
            <label>Work Mode: </label>
            <select name="work-mode">
              <option value="in-office">In office</option>
              <option value="remote-home">Remote - Home</option>
              <option value="remote-outside">Remote - Outside</option>
              <option value="remote-overseas">Remote - Overseas</option>
              <option value="offline">Offline</option>
            </select>
          </div>
          <input type="submit" value="Update Status" onClick={handleUpdateStatus}/>
        </form>
      </div>
      <div className="user-name">
        <span>User Name</span>
      </div>
    </div>
  );
}

export default Status;
