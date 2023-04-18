import axios from 'axios';
import { getToken } from './user';
const baseUrl = process.env.SERVER_URL + '/api/v1/review/';

export const getReviews = async (eventid) => {
  const response = await axios.get(baseUrl + eventid);
  return response.data;
};

export const addReview = async ({ eventid, stars, comment }) => {
  const config = {
    headers: { Authorization: getToken() },
  };
  const response = await axios.post(baseUrl, { eventid, stars, comment }, config);
  return response.data;
};

export const deleteReview = async (eventid) => {
  const config = {
    headers: { Authorization: getToken() },
  }
  const response = await axios.delete(baseUrl, {eventid}, config);
  return response.data;
};