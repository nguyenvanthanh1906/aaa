import axios from 'axios';

const baseURL = "http://55cb8965cf3e.ap.ngrok.io/"
let headers = {}

if(localStorage.access_token) {
  headers.Authorization = "Bearer " + localStorage.access_token 
}
var instance = axios.create({
    baseURL: baseURL,
    headers,
  });

  export default instance