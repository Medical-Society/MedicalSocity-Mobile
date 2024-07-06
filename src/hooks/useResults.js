import { useState, useEffect } from "react";
import doctorApi from "../services/doctor";
import { Platform, Text, View, StyleSheet } from "react-native";
import * as Device from "expo-device";
import * as Location from "expo-location";

export default () => {
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS === "android" && !Device.isDevice) {
        setErrorMsg(
          "Oops, this will not work on Snack in an Android Emulator. Try it on your device!"
        );
        return;
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      setLocation(location);
    })();
  }, []);

  const searchApi = async (searchTerm, token) => {
    const toSearchWith = searchTerm === "All" ? "" : searchTerm;
    try {
      console.log("Location", location);

      const params = {
        searchTerm: toSearchWith,
      };

      if (location) {
        params.location = [location.coords.longitude, location.coords.latitude];
      }

      const response = await doctorApi.get("/", {
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Response", response.data.data.doctors);
      setResults(response.data.data.doctors);
    } catch (err) {
      setErrorMessage(err.response.data.message);
    }
  };

  return [searchApi, results, errorMessage, setResults];
};
