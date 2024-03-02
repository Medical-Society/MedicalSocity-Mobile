import { useEffect, useState } from "react";
import doctorApi from "../api/doctor";

export default () => {
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const searchApi = async (searchTerm) => {
    if (searchTerm === "") {
      return;
    }
    try {
      const response = await doctorApi.get("/search", {
        params: {
          specialization: "",
          englishFullName: searchTerm,
          clinicAddress: "",
        },
      });
      setResults(response.data.data.doctors);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return [searchApi, results, errorMessage];
};
