import axios from 'axios';
const baseUrl = process.env.SERVER_URL + '/api/v1/user/';

let token = null;

export const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

export const getToken = () => {
  return token;
};

export const login = async(username, password) => {
  const credentials = {username, password};
  try{
    const response = await axios.post(baseUrl, {credentials});
    setToken(response.data.token);
    return response.data;
  }catch(e){
    throw new Error(e);
  }
};

export const signIn = async(username, email, firstname, lastname, password) => {
  const credentials = {username, email, firstname, lastname, password};
  try{
    const response = await axios.post(baseUrl, {credentials});
    setToken(response.data.token);
    return response.data;
  }catch(e){
    throw new Error(e);
  }
};

export const logout = () => {
  token = null;
};