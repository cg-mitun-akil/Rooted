import { useRef } from "react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./register.scss";
import axios from "axios";
import logo from "./logo.png"
import { Link } from "react-router-dom";
import { signUp } from "../../services/user";
import { Grid } from "@mui/material";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName ] = useState("");
    const [lastName , setLastName ] = useState("");

    //const navigate = useNavigate();
    const emailRef = useRef();
    const usernameRef = useRef();
    const passwordRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();

    const [error_msg,setError_msg] = useState("");
    const [iserror,setIserror] = useState(false);
    const navigate = useNavigate();

    const handleFinish = async (e) => {
      console.log("finish");
        // e.preventDefault();
        // setEmail(emailRef.current.value);
        // setPassword(passwordRef.current.value);
        // setUsername(usernameRef.current.value);
        // setFirstName(firstNameRef.current.value);
        // setLastName(lastNameRef.current.value);
        // console.log(email);
        setError_msg()
        try{
          const res = await signUp(username, email, firstName, lastName, password);
          localStorage.setItem("rooted-token",res.token);
          console.log(res);
          navigate("/");
        }catch(err)
        {
          console.log(err);
          setError_msg(err.error);
          setIserror(true);
          console.log(error_msg);
        }
    };

    const send_res = () =>{
      
    }
  return (
    <div className="register">
      <div className="top">
      <Link to="../" className="Link">
          <img
            className="logo"
            src={logo}
            alt=""
          /></Link>
        <div className="wrapper">
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
       <Grid container spacing={2}>
        <Grid item xs={9} >
            <input type="email" placeholder="Email ID" onChange={(event)=> setEmail(event.target.value)} /> 
        </Grid>
        <Grid item xs={9}>
            <input type="username" placeholder="Username" onChange={(event)=> setUsername(event.target.value)}  /> 
            </Grid>
        <Grid item xs={9}>
            <input type="name" placeholder="First Name" onChange={(event)=> setFirstName(event.target.value)}  /> 
            </Grid>
        <Grid item xs={9}>
            <input type="name" placeholder="Last Name" onChange={(event)=> setLastName(event.target.value)}  />
            </Grid>
        <Grid item xs={9}>
            <input type="password" placeholder="Password" onChange={(event)=> setPassword(event.target.value)}  />
        </Grid>
        </Grid >
        <button className="registerButton" onClick={handleFinish}>
            Start
        </button>
        </form>
        
      </div>
    </div>
  );
}