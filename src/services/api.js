/* eslint-disable prettier/prettier */
import axios from 'axios';

const api = axios.create({
  //10.0.3.2 genimotion
  baseURL:'http://localhost:3333'
});

export default api;