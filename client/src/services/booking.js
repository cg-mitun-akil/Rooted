import axios from 'axios';
import { getToken } from './user';
const baseUrl = process.env.SERVER_URL + '/api/v1/booking/';

export const getBookings = async (eventid) => {
  const response = await axios.get(baseUrl + eventid);
  return response.data;
};

export const addBooking = async (eventid, dateBooked) => {
  const config = {
    headers: { Authorization: getToken() },
  };
  const response = await axios.post(baseUrl, { eventid, dateBooked }, config);
  return response.data;
};

export const deleteBooking = async (eventid, dateBooked) => {
  const config = {
    headers: { Authorization: getToken() },
  }
  const response = await axios.delete(baseUrl, { eventid, dateBooked }, config);
  return response.data;
};