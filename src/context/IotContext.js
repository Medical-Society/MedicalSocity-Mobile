import createDataContext from "./createDataContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ref, onValue } from "firebase/database";
import { database } from "../services/firebase";

const db = database;

const iotReducer = (state, action) => {
  switch (action.type) {
    case "SET_SENSOR_ID":
      return { ...state, sensorId: action.payload };
    case "SET_DATA":
      return { ...state, data: action.payload };
    case "SET_ERROR_MESSAGE":
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

const loginWithSensorId = (dispatch) => {
  return async (sensorId) => {
    const dbRef = ref(db, sensorId);
    onValue(dbRef, async (snapshot) => {
      const data = snapshot.val();
      console.log("Data from Firebase", data);
      if (data) {
        dispatch({ type: "SET_ERROR_MESSAGE", payload: "" });
        try {
          await AsyncStorage.setItem("sensorId", sensorId);
          dispatch({ type: "SET_SENSOR_ID", payload: sensorId });
        } catch (error) {
          console.log("Error saving sensor ID to local storage", error);
        }
      } else {
        dispatch({
          type: "SET_ERROR_MESSAGE",
          payload: "Sensor ID is wrong, please try again.",
        });
      }
    });
  };
};

const loadSensorIdFromStorage = (dispatch) => {
  return async () => {
    try {
      const sensorId = await AsyncStorage.getItem("sensorId");
      if (sensorId) {
        dispatch({ type: "SET_SENSOR_ID", payload: sensorId });
      }
    } catch (error) {
      console.log("Error loading sensor ID from local storage", error);
    }
  };
};

export const { Context, Provider } = createDataContext(
  iotReducer,
  { loginWithSensorId, loadSensorIdFromStorage },
  { sensorId: "", data: {}, errorMessage: "" }
);
