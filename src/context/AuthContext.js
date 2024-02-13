import createDataContext from "./createDataContext";
import patientApi from "../api/patient";
import AsyncStorage from "@react-native-async-storage/async-storage";

const authReducer = (state, action) => {
  switch (action.type) {
    case "login":
      return { ...state, token: action.payload, errorMessage: "" };
    case "signout":
      return { ...state, token: null, errorMessage: "" };
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "clear_message":
      return { ...state, errorMessage: "", successMessage: "" };
    case "add_success":
      return { ...state, successMessage: action.payload };
    case "clear_loading":
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

const signup = (dispatch) => {
  return async (patientObject, navigation) => {
    patientObject.age = "21";
    patientObject.gender = "male";
    patientObject.address = "Ism";
    patientObject.mobile = "01211036617";

    try {
      const response = await patientApi.post("/signup", patientObject);
      dispatch({
        type: "add_success",
        payload:
          "A verification link has been sent to your email. Please verify your email to login.",
      });
      // wait for 3 seconds
      setTimeout(() => {
        navigation.navigate("Login");
      }, 3000);
    } catch (err) {
      dispatch({
        type: "add_error",
        payload: err.response.data.message,
      });
    }
  };
};

const tryLocalSignin = (dispatch) => {
  return async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      dispatch({ type: "login", payload: token });
    }
    dispatch({ type: "clear_loading" });
  };
};

const login = (dispatch) => {
  return async (patientObject) => {
    try {
      const response = await patientApi.post("/login", patientObject);
      await AsyncStorage.setItem("token", response.data.data.token);
      dispatch({ type: "login", payload: response.data.data.token });
    } catch (err) {
      dispatch({
        type: "add_error",
        payload: err.response.data.message,
      });
    }
  };
};

const signout = (dispatch) => {
  return async () => {
    await AsyncStorage.removeItem("token");
    dispatch({ type: "signout" });
  };
};

const clearMessage = (dispatch) => () => {
  dispatch({ type: "clear_message" });
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signup, login, tryLocalSignin, signout, clearMessage },
  { token: null, errorMessage: "", isLoading: true }
);
