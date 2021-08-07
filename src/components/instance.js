import axios from 'axios';

const baseURL = "http://123.19.51.38:3000/"
let headers = {}

if(localStorage.access_token) {
  headers.Authorization = "Bearer " + localStorage.access_token 
}
var instance = axios.create({
    baseURL: baseURL,
    headers,
  });

  export default instance