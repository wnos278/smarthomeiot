import axios from "axios";

const axiosBase = axios.create({
  // .. where we make our configurations
  baseURL: process.env.REACT_APP_URL,
});

export default axiosBase;
