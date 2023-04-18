import axios from 'axios';
import { getToken } from './user';
const baseUrl = process.env.SERVER_URL + '/api/v1/picvid/';

export const addPicture = async(eventid, picture) => {
  const config = {
    headers: {
      Authorization: getToken(),
      'content-type': 'multipart/form-data'
    }
  };
  const formData = new FormData();
  formData.append('eventid', eventid);
  formData.append('file', picture);
  const response = await axios.post(baseUrl + 'pic', formData, config);
  return response.data;
}

export const deletePicture = async(eventid, publicUrl) => {
  const config = {
    headers: { Authorization: getToken() },
  };
  const response = await axios.post(baseUrl + 'pic', {eventid, publicUrl}, config);
  return response.data;
}

export const addVideo = async(eventid, video) => {
  const config = {
    headers: {
      Authorization: getToken(),
      'content-type': 'multipart/form-data'
    }
  };
  const formData = new FormData();
  formData.append('eventid', eventid);
  formData.append('file', video);
  const response = await axios.post(baseUrl + 'vid', formData, config);
  return response.data;
}

export const deleteVideo = async(eventid, publicUrl) => {
  const config = {
    headers: { Authorization: getToken() },
  };
  const response = await axios.post(baseUrl + 'vid', {eventid, publicUrl}, config);
  return response.data;
}