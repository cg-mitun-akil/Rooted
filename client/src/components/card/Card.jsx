import React from 'react';
import "./card.css"
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Calendar from '../calendar/Calendar';
import { useState } from 'react';
import { Link } from 'react-router-dom';
const Card = (props) => {
  return (
  <Link to={`/event/${props.id}`} className="link">
    <div class="projcard-container">
    <div class="projcard projcard-blue">
      <div class="projcard-innerbox">
        <img class="projcard-img" src={ props.images ? props.images[0] : "https://cdn.shopify.com/s/files/1/0248/0891/5029/files/RLSS_-_RAP_Artwork.jpg?v=1658371969&width=550"}/>
        <div class="projcard-textbox">
          <div class="projcard-title">{props.name}</div>
          <div class="projcard-bar"></div>
          <div class="projcard-description">{props.desc}</div>
          <div class="projcard-tagbox">
            <span class="projcard-tag"><b>{props.language}</b></span>
            <span class="projcard-tag"><b>{props.type}</b></span>
            <span class="projcard-tag"><b>RMDB</b> {props.rating}</span>
          </div>
        </div>
      </div>
    </div>
    </div>
  </Link>
  );
};

export default Card;