import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import {login} from "./../../services/user";
import logo from './logo.png';
import { Navigate } from "react-router-dom";
export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    //const { dispatch } = useContext( AuthContext );
    const navigate = useNavigate();
    const [error_msg,setError_msg] = useState("");
    const [iserror,setIserror] = useState(false);
    const handleLogin = async(e) => {
        e.preventDefault();
        console.log(email);
        console.log(password);
        try{
          const res = await login(email,password);
          localStorage.setItem("rooted-token",res.token);
          navigate("/");
        }catch(err)
        {
          setError_msg(err.error);
          setIserror(true);
          console.log(error_msg);
        }
    };
  return (
    <div className="login">
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
        <form>
          <h1>Sign In</h1>
                  <input type="email" placeholder="Email or phone number" onChange={(e) => setEmail(e.target.value)}/>
                  <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                  <button className="loginButton" onClick={handleLogin}>Sign In</button>
          <span>
            New to Rooted? <Link to="../register" className="link"><b>Sign up now.</b></Link>
          </span>
          <small>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot. <a className="learnmore" href="https://www.google.com/recaptcha/about/"><b><u>Learn More</u></b></a>.
          </small>
        </form>
      </div>
    </div>
  );
}