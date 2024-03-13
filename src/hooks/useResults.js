import { useEffect, useState } from "react";
import doctorApi from "../api/doctor";

export default () => {
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const searchApi = async (searchTerm) => {
    const toSearchWith = searchTerm === "All" ? "" : searchTerm;
    console.log("SearchTerm: ", toSearchWith);
    try {
      const response = await doctorApi.get("/", {
        params: {
          searchTerm: toSearchWith,
        },
      });
      setResults(response.data.data.doctors);
    } catch (err) {
      console.log(err.response);
    }
  };

  return [searchApi, results, errorMessage, setResults];
};
