import axios from "./axios.customize";

const createUserApi = (name, username, email, password) => {
  const URL_API = "v1/api/register";
  const data = {
    name,
    username,
    email,
    password,
  };

  return axios.post(URL_API, data);
};

const loginUserApi = (username, password) => {
  const URL_API = "v1/api/login";
  const data = {
    username,
    password,
  };
  return axios.post(URL_API, data);
};
const getUserApi = (username) => {
  const URL_API = "v1/api/user";
  const data = { username };
  return axios.post(URL_API, data);
};

const getAllProductApi = () => {
  const URL_API = "v1/api/getallProduct";
  return axios.get(URL_API);
};

const selectProductApi = (userId, productId) => {
  const URL_API = "v1/api/selectProduct";
  const data = {
    userId,
    productId,
  };
  return axios.post(URL_API, data);
};

const updateUserApi = (userId, data) => {
  const URL_API = "v1/api/updateUser";
  const reqData = {
    userId,
    data,
  };
  return axios.post(URL_API, reqData);
};

export {
  createUserApi,
  loginUserApi,
  getUserApi,
  updateUserApi,
  getAllProductApi,
  selectProductApi,
};
