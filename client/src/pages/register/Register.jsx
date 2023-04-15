import { useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.scss";
import axios from "axios";
import logo from "./logo.png"
import { Link } from "react-router-dom";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    //const navigate = useNavigate();
    const emailRef = useRef();
    const usernameRef = useRef();
    const passwordRef = useRef();

    const handleFinish = async (e) => {
      console.log("finish");
        e.preventDefault();
        setEmail(emailRef.current.value);
        setPassword(passwordRef.current.value);
        setUsername(usernameRef.current.value);
        try {
            await axios.post("auth/register", { email, username, password });
            //navigate('/login');
        } catch (err) { }
    };
  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src={logo}
            alt=""
          />
        </div>
      </div>
      <div className="container">
        <h1>One Stop Location for your Events</h1>
        <p>
          Ready to dive in? Enter Details below
        </p>
        <Link to="../login" className="Link"><p>
          Already a member? <u>Click here!</u>
        </p></Link>
       <form className="input">
            <input type="email" placeholder="Email ID" ref={emailRef} /> 
            <input type="username" placeholder="Username" ref={usernameRef} /> 
            <input type="name" placeholder="First Name" /> 
            <input type="name" placeholder="Last Name" />
            <input type="password" placeholder="Password" ref={passwordRef} />
        </form>
        <button className="registerButton" onClick={handleFinish}>
            Start
        </button>
      </div>
    </div>
  );
}