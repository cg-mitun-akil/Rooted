import React from 'react';
import "./card.css"
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Calendar from '../calendar/Calendar';
import { useState } from 'react';
import { Link } from 'react-router-dom';
const Card = (props) => {
  return (
  <Link to="/event" className="link">
    <div class="projcard-container">
    <div class="projcard projcard-blue">
      <div class="projcard-innerbox">
        <img class="projcard-img" src={props.image} />
        <div class="projcard-textbox">
          <div class="projcard-title">{props.name}</div>
          <div class="projcard-bar"></div>
          <div class="projcard-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
          <div class="projcard-tagbox">
            <span class="projcard-tag">{props.language}</span>
            <span class="projcard-tag">RMDB {props.rating}</span>
          </div>
        </div>
      </div>
    </div>
    </div>
  </Link>
  );
};

export default Card;