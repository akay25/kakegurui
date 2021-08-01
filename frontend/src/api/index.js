import axios from "axios";

// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: process.env.VUE_APP_API_ENPOINT
});

// Alter defaults after instance has been created
instance.defaults.headers.common["Authorization"] = "random stirng";

export default instance;
