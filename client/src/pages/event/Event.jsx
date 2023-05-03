import "./event.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
  faSquarePhone,
  faPhone,
  faUser,
  faEnvelope,
  faPeopleRoof
} from "@fortawesome/free-solid-svg-icons";
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';
import { useEffect, useState } from "react";
import Logo from "../../images/logo.png"
import Calendar from "../../components/calendar/Calendar";
import Paper from '@mui/material/Paper';
import Carousel from 'react-material-ui-carousel';

import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { Link, useNavigate } from "react-router-dom";
import Commentbox from "../../components/commentbox/Commentbox";
import { Grid } from "@mui/material";
import { useParams } from 'react-router-dom';
import { getEventInfo } from "../../services/event";
import { addBooking, deleteBooking, getBookings } from "../../services/booking";
import { addReview, getReviews } from "../../services/review";

const Event = (props) => {
  const { id } = useParams();
  const storedUserName = localStorage.getItem('user-name');
  const [dates,setDates] = useState([]);
  const [eventdates,setEventdates] = useState([]);
  const [title, setTitle] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [nativeLocation, setNativeLocation] = useState("");
  const [nativeLanguage, setNativeLanguage] = useState("");
  const [description, setDescription] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [contactCountryCode, setContactCountryCode] = useState("");
  const [contactEmail, setContactEmail] = useState("");

  
  const [slideNumber1, setSlideNumber1] = useState(0);
  const [open1, setOpen1] = useState(false);

  const [slideNumber2, setSlideNumber2 ] = useState(0);
  const [open2, setOpen2] = useState(false);
  const [isUser,setIsUser] = useState(false);
  const [error_msg,setError_msg] = useState("");
  const [iserror,setIserror] = useState(false);

  const [year,setYear] = useState(2023);
  const [month,setMonth] = useState(4);
  const [photos,setPhotos] = useState([]);
  const [videos,setVideos] = useState([]);
  const [owner,setOwner] = useState("");

  const [rating, setRating] = useState(0);
  const [userRating,setUserRating]  = useState(0);
  const [comment, setComment] = useState("");
  const [customerReviews,setCustomerReviews] = useState([]);

  useEffect( () =>{
      const current_event = async()=>{
          const res = await getEventInfo(id);
          setTitle(res.title);
          setOwner(res.userCreated);
          setEventType(res.eventType);
          setNativeLanguage(res.nativeLanguage);
          setNativeLocation(res.nativeLocation);
          setDescription(res.description);
          setContactCountryCode(res.contactCountryCode);
          setContactNumber(res.contactNumber);
          setContactEmail(res.contactEmail);
          setRating(res.rating);
          setPhotos([]);
          res.pictures.map( picid=> {
            setPhotos((old)=>[...old,{ src: picid }]);
          })
          setVideos([]);
          res.videos.map( picid=> {
            setVideos((old)=>[...old,{ src: picid }]);
          })
          //console.log("videos",videos);
          
      }
      current_event();
      const event_dates = async()=>{
        const res = await getBookings(id);
        res.bookings.map( bookie => {
          setEventdates( (old) => [...old,bookie.dateBooked.split("T")[0]])
        })
      }
      event_dates();
      const event_review = async()=>{ 
        const res = await getReviews(id);
        setCustomerReviews(res.reviews);
      }
      event_review();
  }, [] );

  useEffect( ()=>{
    setDates([]);
    //console.log("photos",photos);
    eventdates.map( (date)=>{
      if( date.split("-")[0] == year && date.split("-")[1] == month )
      {
          setDates((oldArray) => [...oldArray, parseInt(date.split("-")[2]) ]);
      }
    })
  }, [eventdates])

  const renderDates=()=>{
    eventdates.map( (date)=>{
      if( date.split("-")[0] == 2023 && date.split("-")[1] == 4 )
      {
          setDates((oldArray) => [...oldArray, parseInt(date.split("-")[2]) ]);
      }
    })
  }

  // const photos = [
  //   {
  //       src: "https://www.caleidoscope.in/wp-content/uploads/2014/10/Bootha-Kola-Photo.jpg",
  //     },
  //   {
  //     src: "https://images.indianexpress.com/2014/09/garba22.jpg",
  //   },
  //   {
  //     src: "https://lakshmianand.com/wp-content/uploads/2021/10/WhatsApp-Image-2021-10-28-at-22.05.04-1024x682.jpeg",
  //   },
  //   {
  //     src: "https://i.pinimg.com/originals/db/59/44/db5944ce4c10d41bd0fda5821be970db.jpg",
  //   },
  //   {
  //       src: "https://th-thumbnailer.cdn-si-edu.com/hpshr9aaJFlrje6KAoA4X7rYSXM=/fit-in/600x0/https://tf-cmsv2-photocontest-smithsonianmag-prod-approved.s3.amazonaws.com/59c9603c-7a0c-468b-a93b-ab1451904051.jpg",
  //     },
  //     {
  //       src: "https://cdn0.weddingwire.in/vendor/8873/3_2/960/jpg/4c0a9254_15_178873-160347763528309.jpeg",
  //     }
  // ];

  // const videos = [
  //   {
  //       src: 'https://static.videezy.com/system/resources/previews/000/006/996/original/MR8_8183.mp4',
  //     },
  //     {
  //       src: 'https://static.videezy.com/system/resources/previews/000/006/996/original/MR8_8183.mp4',
  //     },
  //     {
  //       src: 'https://static.videezy.com/system/resources/previews/000/006/996/original/MR8_8183.mp4',
  //     }
      
  // ];

  const handleOpen1 = (i) => {
    setSlideNumber1(i);
    setOpen1(true);
  };

  const handleOpen2 = (i) => {
    setSlideNumber2(i);
    setOpen2(true);
  }

  const handleMove1 = (direction) => {
    let newSlideNumber1;

    if (direction === "l") {
      newSlideNumber1 = slideNumber1 === 0 ? photos.length - 1: slideNumber1 - 1;
    } else {
      newSlideNumber1 = slideNumber1 === photos.length - 1 ? 0 : slideNumber1 + 1;
    }

    setSlideNumber1(newSlideNumber1)
  };

  const handleMove2 = (direction) => {
    let newSlideNumber2;

    if (direction === "l") {
      newSlideNumber2 = slideNumber2 === 0 ? videos.length-1 : slideNumber2 - 1;
    } else {
      newSlideNumber2 = slideNumber2 === videos.length -1 ? 0 : slideNumber2 + 1;
    }

    setSlideNumber2(newSlideNumber2)
  };

  const comments = [
    {
      author: "John",
      text: "Great post, thanks for sharing!"
    },
    {
      author: "Jane",
      text: "I disagree with your points, but appreciate the discussion."
    },
    {
      author: "Bob",
      text: "This was very helpful, I learned a lot from reading this!"
    },
    {
      author: "Alice",
      text: "I have a question about one of the points you made, can you clarify?"
    },
    {
      author: "Mike",
      text: "I love this topic, can you recommend any additional resources on it?"
    },
    {
      author: "Mike",
      text: "I love this topic, can you recommend any additional resources on it?"
    },
    {
      author: "Mike",
      text: "I love this topic, can you recommend any additional resources on it?"
    },
    {
      author: "Jane",
      text: "I disagree with your points, but appreciate the discussion."
    },
    {
      author: "Bob",
      text: "This was very helpful, I learned a lot from reading this!"
    },
    {
      author: "Alice",
      text: "I have a question about one of the points you made, can you clarify?"
    },
    {
      author: "Mike",
      text: "I love this topic, can you recommend any additional resources on it?"
    },
    {
      author: "Mike",
      text: "I love this topic, can you recommend any additional resources on it?"
    }
  ];
  
  useEffect(()=>{
    try{
      addReview({eventid:id,stars:(userRating>5)?5:userRating ,comment });
    }catch(err)
    {
      ;
    }
  }, [comment] );

  const handleClick = () => {
    const input = prompt('Rate us:');
    const comment = prompt('Comment');
    if (input) {
      setUserRating(parseInt(input));
      setComment(comment);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      const input = event.target.value;
      if (input) {
        setRating(parseInt(input));
      }
    }
  };

  const mystyle = {
      //width: '800vw',
      //height: '100vh',
      //objectFit: 'cover',
  };

  const ms1 = {
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
  };

  const ms2 = {
    flexBasis: 'calc(33.33% - 4px)',
    maxWidth: 'calc(33.33% - 4px)',
    margin: '2px',
    position: 'relative',
  };

  const navigate = useNavigate();

  return (
    <div className="event">
      <Link to="/" className="link">
        <img src={Logo} className="logo"/>
      </Link>
      <h1 className="hotelTitle">{title}</h1>
      { (storedUserName == owner) ? 
          <button className="bookNow" onClick={()=> navigate(`../editevent/${id}`)}>Edit</button> : <div>
          <button onClick={handleClick} className="bookNow">Rate Now</button>
          <Rating
            name="text-feedback"
            value={rating==0?1:rating}
            readOnly
            precision={0.1}
            emptyIcon={<StarIcon style={{ opacity: 1 }} fontSize="inherit" />}
          />
          </div>
        }
      <div className="hotelContainer">
        {open1 && (
          <div className="slider">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="close"
              onClick={() => setOpen1(false)}
            />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="arrow"
              onClick={() => handleMove1("l")}
            />
            <div className="sliderWrapper">
              <img src={photos[slideNumber1].src} alt="" className="sliderImg" />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleMove1("r")}
            />
        </div>
        )}
        {open2 && (
          <div className="slider">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="close"
              onClick={() => setOpen2(false)}
            />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="arrow"
              onClick={() => handleMove2("l")}
            />
            <div className="sliderWrapper">
              <video src={videos[slideNumber2].src}width="750" height="500" controls>
              </video>
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleMove2("r")}
            />
          </div>
        )}
        <div className="hotelWrapper">
        
          <div className="hotelImages">
            {photos.map((photo, i) => (
              <div className="hotelImgWrapper" key={i}>
                <img
                  onClick={() => handleOpen1(i)}
                  src={photo.src}
                  alt=""
                  className="hotelImg"
                />
              </div>
            ))}
          </div>
          <div className="hotelImages">
            {videos.map((video, i) => (
              <div className="hotelImgWrapper" key={i}>
                <iframe
                  width="400"
                  height="300"
                  src={video.src}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Embedded youtube"
                />
              </div>
            ))}
          </div>
          {/* <div className="hotelImages">
          <Carousel 
              swipe={true}
              navButtonsAlwaysVisible={true}
              animation="slide"
              indicators={false}
              autoPlay={false}
              interval={5000} 
          >
            {photos.map((url,i) => {
              const endIndex = i + 3;
              const items = photos.slice(i, endIndex);
              return (
                <Paper key={i}>
                  <div style={ms1}>
                    {items.map((url, i) => (
                      <div style={ms2} key={i}>
                        <img src={url.src} alt="carousel item" />
                      </div>
                    ))}
                  </div>
                </Paper>
              );
            })}
          </Carousel>
          </div> */}
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">Details and Importance</h1>
              <p className="hotelDesc">
               {description}
              </p>
            </div>
            <div className="hotelDetailsPrice">
              <h1>Key Note!</h1>
              <span>
                Language:<b>&nbsp;{nativeLanguage}</b>
              </span>
              <span>
                Event type:<b>&nbsp;{eventType}</b>
              </span>
              <div className="hotelAddress">
              <FontAwesomeIcon icon={faUser} />
              <span><b>{owner}</b></span>
              </div>
              <span><b>Contact details</b></span>
              
              <div className="hotelAddress">
              <FontAwesomeIcon icon={faEnvelope} beat />
              <span>{contactEmail}</span>
              </div>
              <div className="hotelAddress">
              <FontAwesomeIcon icon={faPhone} fade />
                <span >{`   +${contactCountryCode} ${contactNumber}`}</span>
              </div>
              <div className="hotelAddress">
                <FontAwesomeIcon icon={faLocationDot} />
                <span>{nativeLocation}</span>
              </div>
            </div>
          </div>
          <div> 
            <Grid container spacing={2}>
              <Grid item xs={12} sm={8.5}>
                <Commentbox comments={customerReviews} />
              </Grid>
              <Grid item xs={12} sm={3.5}>
              <Calendar month = {month} year = {year} setMonth = {setMonth} setYear = {setYear} highlightedDays={dates} eventdates={eventdates} setEventdates={setEventdates} />
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Event;