import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom"; // ✅ Use "react-router-dom" instead of "react-router"
import './index.css';
import App from './App.jsx';
import Intro from './Pages/Intro.jsx'; // ✅ Import the Intro component
import Signup from './Pages/Signup.jsx';
import Login from './Pages/Login.jsx';
import Profile from './Pages/Profile.jsx'
import CreateTask from './Pages/CreateTask.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/Intro" element={<Intro />} />
        <Route path="/" element={<App />} />
        <Route path="/CreateTask" element={<CreateTask />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
      
      </Routes>
    </BrowserRouter> {/* ✅ Correct closing tag */}
  </StrictMode>
);
