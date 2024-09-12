import axios from 'axios';

const baseURL = "http://123.19.51.38:3000/"
let headers = {}

var instance = axios.create({
    baseURL: baseURL,
    headers,
  });


  export default instance