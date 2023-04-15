import './App.scss';
import Login from "./pages/login/Login";
import Register from './pages/register/Register';
import Home from './pages/home/Home';
import Event from './pages/event/Event';
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="event" element={<Event />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
