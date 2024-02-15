import axios from "axios";

export default axios.create({
  baseURL: "https://medicalsociety.azurewebsites.net/api/v1/patients",
});
