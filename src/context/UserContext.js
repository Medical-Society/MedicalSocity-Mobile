import createDataContext from "./createDataContext";
import patientApi from "../services/patient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createFormData } from "../../AppStyles";

const userReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_USER_DATA":
      return { ...state, userData: action.payload };
    case "POST_IMAGE":
      return {
        ...state,
        userData: { ...state.userData, avatar: action.payload },
      };
    case "ADD_ERROR_MESSAGE":
      return { ...state, successMessage: "", errorMessage: action.payload };
    case "ADD_SUCCESS_MESSAGE":
      return { ...state, errorMessage: "", successMessage: action.payload };
    case "CLEAR_MESSAGE":
      return { ...state, errorMessage: "", successMessage: "" };

    default:
      return state;
  }
};

const postImage = (dispatch) => {
  return async (uri, setLoading) => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");
      const data = await createFormData(uri);
      const response = await patientApi.post("/avatar", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const avatar = response.data.data.avatar;
      console.log("Recieved Data", response.data.data);
      dispatch({ type: "POST_IMAGE", payload: avatar });
      const userData = await AsyncStorage.getItem("userData");
      const parsedUserData = JSON.parse(userData);
      parsedUserData.avatar = avatar;
      await AsyncStorage.setItem("userData", JSON.stringify(parsedUserData));

      dispatch({
        type: "ADD_SUCCESS_MESSAGE",
        payload: "Image uploaded successfully",
      });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: "ADD_ERROR_MESSAGE",
        payload: error.response.data.message,
      });
    } finally {
      setLoading(false);
    }
  };
};

const updateUserDataServer = (dispatch) => {
  return async (userData, navigation, setLoading) => {
    setLoading(true);
    try {
      const { patientName, address, phoneNumber } = userData;

      if (!patientName || !address || !phoneNumber) {
        dispatch({
          type: "ADD_ERROR_MESSAGE",
          payload: "Please fill all the fields",
        });
        setLoading(false);
        return;
      }

      const token = await AsyncStorage.getItem("token");
      const response = await patientApi.patch(
        "/updateMe",
        { patientName, address, phoneNumber },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const updatedPatientData = response.data.data.patient;
      const userDataFromStorage = await AsyncStorage.getItem("userData");
      const parsedUserData = JSON.parse(userDataFromStorage);
      parsedUserData.patientName = patientName;
      parsedUserData.address = address;
      parsedUserData.phoneNumber = phoneNumber;
      await AsyncStorage.setItem("userData", JSON.stringify(parsedUserData));
      dispatch({ type: "UPDATE_USER_DATA", payload: updatedPatientData });

      dispatch({
        type: "ADD_SUCCESS_MESSAGE",
        payload: "Profile updated successfully",
      });
    } catch (error) {
      console.log(error.response.data);
      dispatch({
        type: "ADD_ERROR_MESSAGE",
        payload: error.response.data.message,
      });
    } finally {
      setLoading(false);
    }
  };
};

const updateUserData = (dispatch) => {
  return async (userData) => {
    try {
      await AsyncStorage.setItem("userData", JSON.stringify(userData));
      dispatch({ type: "UPDATE_USER_DATA", payload: userData });
    } catch (error) {
      console.log(error);
    }
  };
};

const clearMessage = (dispatch) => {
  return () => {
    dispatch({ type: "CLEAR_MESSAGE" });
  };
};

const addError = (dispatch) => {
  return (errorMessage) => {
    dispatch({ type: "ADD_ERROR_MESSAGE", payload: errorMessage });
  };
};

export const { Provider, Context } = createDataContext(
  userReducer,
  { updateUserDataServer, updateUserData, postImage, clearMessage, addError },
  { userData: {}, errorMessage: "", successMessage: "" }
);
