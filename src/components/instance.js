import axios from 'axios';

const baseURL = "http://9d2e00e0a689.ngrok.io/"
let headers = {}

if(localStorage.access_token) {
  headers.Authorization = "Bearer " + localStorage.access_token 
}
var instance = axios.create({
    baseURL: baseURL,
    headers,
  });

  export default instance