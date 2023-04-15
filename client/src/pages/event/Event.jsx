import "./event.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Logo from "../../images/logo.png"
import Calendar from "../../components/calendar/Calendar";

import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { Link } from "react-router-dom";

const Event = () => {
  const [slideNumber1, setSlideNumber1] = useState(0);
  const [open1, setOpen1] = useState(false);

  const [slideNumber2, setSlideNumber2 ] = useState(0);
  const [open2, setOpen2] = useState(false);

  const [isUser,setIsUser] = useState(false);

  const photos = [
    {
        src: "https://www.caleidoscope.in/wp-content/uploads/2014/10/Bootha-Kola-Photo.jpg",
      },
    {
      src: "https://images.indianexpress.com/2014/09/garba22.jpg",
    },
    {
      src: "https://lakshmianand.com/wp-content/uploads/2021/10/WhatsApp-Image-2021-10-28-at-22.05.04-1024x682.jpeg",
    },
    {
      src: "https://i.pinimg.com/originals/db/59/44/db5944ce4c10d41bd0fda5821be970db.jpg",
    },
    {
        src: "https://th-thumbnailer.cdn-si-edu.com/hpshr9aaJFlrje6KAoA4X7rYSXM=/fit-in/600x0/https://tf-cmsv2-photocontest-smithsonianmag-prod-approved.s3.amazonaws.com/59c9603c-7a0c-468b-a93b-ab1451904051.jpg",
      },
      {
        src: "https://cdn0.weddingwire.in/vendor/8873/3_2/960/jpg/4c0a9254_15_178873-160347763528309.jpeg",
      }
  ];

  const videos = [
    {
        src: 'https://static.videezy.com/system/resources/previews/000/006/996/original/MR8_8183.mp4',
      },
      {
        src: 'https://static.videezy.com/system/resources/previews/000/006/996/original/MR8_8183.mp4',
      },
      {
        src: 'https://static.videezy.com/system/resources/previews/000/006/996/original/MR8_8183.mp4',
      }
      
  ];

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
      newSlideNumber1 = slideNumber1 === 0 ? photos.length-1 : slideNumber1 - 1;
    } else {
      newSlideNumber1 = slideNumber1 === photos.length -1 ? 0 : slideNumber1 + 1;
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

  const dates = [21,23];

  const [rating, setRating] = useState(0);

  const handleClick = () => {
    const input = prompt('Enter a number:');
    if (input) {
      setRating(parseInt(input));
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

  return (
    <div className="event">
      <Link to="/" className="link">
        <img src={Logo} className="logo"/>
      </Link>
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
        { isUser ? 
          <button className="bookNow">Edit</button> : <div>
          <button onClick={handleClick} className="bookNow">Rate Now</button>
          <Rating
            name="text-feedback"
            value={rating}
            readOnly
            precision={0.1}
            emptyIcon={<StarIcon style={{ opacity: 1 }} fontSize="inherit" />}
          />
          </div>
        }
          <h1 className="hotelTitle">Event Title</h1>
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
                <video className="hotelImg" onClick={() => handleOpen2(i)} controls >
                    <source src={video.src} type="video/mp4" />
                </video>
              </div>
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">Details and Importance</h1>
              <p className="hotelDesc">
                Lly equipped kitchenette with a microwave, a flat-screen TV,
                and a private bathroom with shower and a hairdryer. A fridge is
                also ly equipped kitchenette with a microwave, a flat-screen TV,
                and a private bathroom with shower and a hairdryer. A fridge is
                also offered, as well as an electric tea pot and a coffee
                machine. Ply ly equipped kitchenette with a microwave, a flat-screen TV,
                and a private bathroom with shower and a hairdryer. A fridge is
                also offered, as well as an electric tea pot and a coffee
                machine. Popular points of interest near the apartment include
                Cloth Hall, Main Mwell as an electric tea pot and a coffee
                machine. Popular points of interest near the apartment include
                Cloth Hall, Main M Mpartments, and the property offers a paid
                airport shuttle service.
              </p>
            </div>
            <div className="hotelDetailsPrice">
              <h1>Key Note!</h1>
              <span>
                Language: English
              </span>
              <span>Estimated: <b>Cost</b> per day</span>
              <span>Contact details</span>
              <span>Email</span>
              <span>Phone Number</span>
              <div className="hotelAddress">
                <FontAwesomeIcon icon={faLocationDot} />
                <span>Event Location</span>
              </div>
            </div>
          </div>
          <div> 
                <Calendar dates={dates} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Event;