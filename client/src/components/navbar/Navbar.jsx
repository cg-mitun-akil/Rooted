import { ArrowDropDown, Notifications, Search  } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import { useContext, useState } from "react";
import "./navbar.scss";
import { Link, Navigate, useNavigate } from "react-router-dom";
import logo from '../../images/logo.png';
import Searchbox from "../searchbox/Searchbox"
import { logout } from '../../services/user';

const Navbar = (props) => {

  const [isScrolled,setIsScrolled] = useState(false);
  const isLogged = localStorage.getItem("user-name");
    //const { dispatch } = useContext(AuthContext);

  window.onscroll = () =>{
    setIsScrolled( window.pageYOffset === 0 ? false : true );
    return ()=>( window.onscroll = null );
  };

  const onSearchChange = (event) => {
    props.setEventName(event.target.value.toLocaleLowerCase());
    console.log(props.eventName);
  };

  const handleUsername = () => {
    const storedUserName = localStorage.getItem('user-name');
    if (storedUserName) {
      props.setUserName(storedUserName);
    }
    console.log(props.userName);
  };

  const refreshEnv = () => {
    props.setEventName("");
    props.setEventType("");
    props.setNativeLanguage("");
    props.setMinRating(0);
    props.setMaxRating(5);
    props.setUserName("");
    window.location.reload();
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    try{
      localStorage.setItem("rooted-token","");
      localStorage.setItem("user-name","");
      logout();
      Navigate("/login");
    }catch(err){
      navigate("/login");
    }
  };

  

  return (
    <div className={isScrolled ?'navbar scrolled' : 'navbar' }>
      <div className="container">
        <div className="left">
          <Link reloadDocument to="/" className="link"  >
            <img src={logo}/>   
          </Link> 
            <Link reloadDocument to="/" className="link" >
                <span >Homepage</span>
            </Link>
            {/*<Link to="/series" className="link">*/}
                <span onClick = {handleUsername} className="navbarmainLinks">My Events</span>
            {/*</Link>*/}
            {/*<Link to="/movies" className="link">
                <span className="navbarmainLinks">Movies</span>
            {/*</Link>*/}
            <Link to="/addevent" className="link">
              <span>New Event</span>
            </Link>
            <select
                      name="Event Type"
                      id="genre"
                      onChange={(e) => {
                        props.setEventType(e.target.value)
                        console.log(e.target.value)
                      }}
                  >
                    <option value="" >Event Type</option>
                    <option value="dance">Dance</option>
                    <option value="drama">Drama</option>
                    <option value="musical">Musical</option>
                    <option value="streetPlay">Street Play</option>
                    <option value="painting">Painting</option>
            </select>
            <select
                      name="Native Language"
                      id="genre"
                      onChange={(e) => {
                        props.setNativeLanguage(e.target.value)
                        console.log(e.target.value)
                      }}
                  >
                    <option value="" >Native</option>
                    <option value="odiya">Odiya</option>
                    <option value="assamese">Assamese</option>
                    <option value="tamil">Tamil</option>
                    <option value="gujarathi">Gujarathi</option>
                    <option value="telugu">Telugu</option>
                    <option value="malayalam">Malayalam</option>
                    <option value="kannada">Kannada</option>
                    <option value="rajasthani">Rajasthani</option>
                    <option value="marathi">Marathi</option>
            </select>
            <span>Min</span>
            <select
                      name="Min Rating"
                      id="genre"
                      onChange={(e) => {
                        props.setMinRating(e.target.value)
                        console.log(e.target.value)
                      }}
                  >
                    <option value={0}>0.0</option>
                    <option value={1}>1.0</option>
                    <option value={2}>2.0</option>
                    <option value={3}>3.0</option>
                    <option value={4}>4.0</option>
                    <option value={5}>5.0</option>
            </select>
            <span>Max</span>
            <select
                      name="Max Rating"
                      id="genre"
                      onChange={(e) => {
                        props.setMaxRating(e.target.value)
                        console.log(e.target.value)
                      }}
                  >
                    <option value={0}>0.0</option>
                    <option value={1}>1.0</option>
                    <option value={2}>2.0</option>
                    <option value={3}>3.0</option>
                    <option value={4}>4.0</option>
                    <option value={5} selected >5.0</option>
            </select>

        </div>
        <div className="right">
            <Searchbox
              className = 'search-event'  
              onChangeHandler = { onSearchChange }
              placeHolder = 'Search Events'
            />
            <Avatar className="icons" src="/broken-image.jpg" />
            <div className="profile">
              <ArrowDropDown className="icons" />
              {( isLogged != "" )?
              <div className="options">
                <span onClick={handleLogout}>Logout</span>
              </div> :
              <div className="options">
              <span onClick={handleLogout}>Login</span>
            </div>
              }
            </div>
            

        </div>
      </div>
    </div>
  )
}

export default Navbar