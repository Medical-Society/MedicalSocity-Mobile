import axios from "axios";

export default axios.create({
  baseURL: "https://prescriptions-ocr.azurewebsites.net/OCR",
});
