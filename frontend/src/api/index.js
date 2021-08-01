import axios from "axios";

// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: process.env.VUE_APP_API_ENPOINT
});

export default instance;
