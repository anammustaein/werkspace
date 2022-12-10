// import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
// import './App.css'
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cowerkers from "./pages/Cowerkers";
import AddTask from "./pages/AddTask";
import ScheduleMeeting from "./pages/ScheduleMeeting";
import EditProfile from "./pages/EditProfile";
import Navbar from "./components/Navbar"

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cowerkers" element={<Cowerkers />} />
        <Route path="/addtask" element={<AddTask />} />
        <Route path="/meeting" element={<ScheduleMeeting />} />
        <Route path="/editprofile" element={<EditProfile />} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
