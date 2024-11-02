import axios from './axios.customize';

const createUserApi = (name, username, email, password) => {
  const URL_API = 'v1/api/register';
  const data = {
    name,
    username,
    email,
    password,
  };

  return axios.post(URL_API, data);
};

const loginUserApi = (username, password) => {
  const URL_API = 'v1/api/login';
  const data = {
    username,
    password,
  };
  return axios.post(URL_API, data);
};
const getUserApi = (username) => {
  const URL_API = 'v1/api/user';
  const data = { username };
  console.log(data);
  return axios.post(URL_API, data);
};

export { createUserApi, loginUserApi, getUserApi };
