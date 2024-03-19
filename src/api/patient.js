import axios from "axios";

export default axios.create({
  baseURL: "https://medical-society-official.onrender.com/api/v1/patients",
});
