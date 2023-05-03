import axios from 'axios';
import { getToken } from './user';
const baseUrl = process.env.REACT_APP_SERVER_URL + '/api/v1/event/';

export const getEvents = async({eventType, ratingMin, ratingMax, nativeLocation, nativeLanguage, searchTerm, username}) => {
  let endpoint = baseUrl + 'multiple?';
  
  if (eventType) {
    endpoint += `eventType=${eventType}&`;
  }
  if (ratingMin) {
    endpoint += `ratingMin=${ratingMin}&`;
  }
  if (ratingMax) {
    endpoint += `ratingMax=${ratingMax}&`;
  }
  if (nativeLocation) {
    endpoint += `nativeLocation=${nativeLocation}&`;
  }
  if (nativeLanguage) {
    endpoint += `nativeLanguage=${nativeLanguage}&`;
  }
  if (searchTerm) {
    endpoint += `searchTerm=${searchTerm}&`;
  }
  if (username) {
    endpoint += `username=${username}&`;
  }

  endpoint = endpoint.slice(0, -1);
  
  const response = await axios.get(endpoint);
  return response.data;
};

export const getEventInfo = async (eventid) => {
  const response = await axios.get(`${baseUrl}single/${eventid}`);
  return response.data;
};

export const addEvent = async ({ title, eventType, nativeLocation, nativeLanguage, 
  description, contactNumber, contactCountryCode, contactEmail }) => {
    console.log(getToken(),title);
  const newEvent = { title, eventType, nativeLocation, nativeLanguage, description,
    contactNumber, contactCountryCode, contactEmail };
  const config = {
    headers: { Authorization: getToken() },
  }
  const response = await axios.post(baseUrl, {newEvent}, config);
  return response.data;
};

//in this function, make sure that the unedited event fields are also present, otherwise they
//may be overwritten by NULL values
export const editCurrEvent = async ({ eventid, title, eventType, nativeLocation, nativeLanguage, 
  description, contactNumber, contactCountryCode, contactEmail }) => {
    console.log(title);
  const newEvent = { eventid, title, eventType, nativeLocation, nativeLanguage, description,
    contactNumber, contactCountryCode, contactEmail };
  const config = {
    headers: { Authorization: getToken() },
  }
  const response = await axios.patch(baseUrl, {newEvent}, config);
  return response.data;
};

export const deleteEvent = async (eventid) => {
  const config = {
    headers: { Authorization: getToken() },
  }
  const response = await axios.post(baseUrl+'del/', {eventid}, config);
  return response.data;
};