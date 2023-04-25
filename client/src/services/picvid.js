import axios from 'axios';
import { getToken } from './user';
const baseUrl = process.env.SERVER_URL + '/api/v1/picvid/';

export const addPicture = async(eventid, publicUrl) => {
  const config = {
    headers: { Authorization: getToken() },
  };
  const response = await axios.post(baseUrl + 'pic', {eventid, publicUrl}, config);
  return response.data;
}

export const deletePicture = async(eventid, publicUrl) => {
  const config = {
    headers: { Authorization: getToken() },
  };
  const response = await axios.delete(baseUrl + 'pic', {eventid, publicUrl}, config);
  return response.data;
}

export const addVideo = async(eventid, publicUrl) => {
  const config = {
    headers: { Authorization: getToken() },
  };
  const response = await axios.post(baseUrl + 'vid', {eventid, publicUrl}, config);
  return response.data;
}

export const deleteVideo = async(eventid, publicUrl) => {
  const config = {
    headers: { Authorization: getToken() },
  };
  const response = await axios.delete(baseUrl + 'vid', {eventid, publicUrl}, config);
  return response.data;
}