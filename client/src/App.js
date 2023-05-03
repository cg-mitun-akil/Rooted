import './App.scss';
import Login from "./pages/login/Login";
import Register from './pages/register/Register';
import Home from './pages/home/Home';
import Event from './pages/event/Event';
import Addevent from './pages/addevent/Addevent';
import Editevent from './pages/editevent/Editevent';
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import { setToken } from "./services/user";
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function App() {
  useEffect(()=>{
    const token = localStorage.getItem("rooted-token");
    if (!token)
    {
      <Navigate to="/login"/>
    }
    else{
      setToken(token);
      <Navigate to="/home"/>
    }
  }, [] );
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="event/:id" element={<Event />} />
        <Route path="addevent" element={<Addevent/> } />
        <Route path="editevent/:id" element={<Editevent/> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
