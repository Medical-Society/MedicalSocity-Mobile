import axios from "axios";

export default axios.create({
  baseURL: "https://api.medical-society.fr.to/api/v1/chats",
});
