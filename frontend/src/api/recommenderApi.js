import axios from "axios";

const recommenderApi = axios.create({
  baseURL: "http://127.0.0.1:5000", // Flask recommender service
  timeout: 10000,
});

export default recommenderApi;
