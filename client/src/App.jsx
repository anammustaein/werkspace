import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
// import './App.css'
// import 'bootstrap/dist/css/bootstrap.min.css'
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cowerkers from "./pages/Cowerkers";
import CowerkersSchedule from "./pages/CowerkersSchedule";
import AddTask from "./pages/AddTask";
import ScheduleMeeting from "./pages/ScheduleMeeting";
import EditProfile from "./pages/EditProfile";
import EditTask from './pages/EditTask';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cowerkers" element={<Cowerkers />} />
        <Route path="/cowerkers/schedule/:name" element={<CowerkersSchedule />}/>
        <Route path="/addtask" element={<AddTask />} />
        <Route path="/edittask" element={<EditTask />} />
        <Route path="/meeting" element={<ScheduleMeeting />} />
        <Route path="/editprofile" element={<EditProfile />} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
