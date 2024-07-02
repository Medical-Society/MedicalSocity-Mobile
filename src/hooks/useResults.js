import { useState } from "react";
import doctorApi from "../services/doctor";

export default () => {
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const searchApi = async (searchTerm, token) => {
    const toSearchWith = searchTerm === "All" ? "" : searchTerm;
    console.log("SearchTerm: ", toSearchWith);
    try {
      const response = await doctorApi.get("/", {
        params: {
          searchTerm: toSearchWith,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setResults(response.data.data.doctors);
    } catch (err) {
      setErrorMessage(err.response.data.message);
    }
  };

  return [searchApi, results, errorMessage, setResults];
};
