import axios from "axios";

const instance = axios.create({
  baseURL: "https://my-space-e16c5.firebaseio.com/"
});

export default instance;
