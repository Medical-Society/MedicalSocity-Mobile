import axios from "axios";

export default axios.create({
  baseURL: "https://medicalsociety.onrender.com/api/v1/doctors",
});
