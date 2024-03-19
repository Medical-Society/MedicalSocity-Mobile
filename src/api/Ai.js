import axios from "axios";

export default axios.create({
  baseURL: "https://medicalchatbot.azurewebsites.net/message",
});
