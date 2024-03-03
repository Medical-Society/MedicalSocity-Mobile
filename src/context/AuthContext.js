import createDataContext from "./createDataContext";
import patientApi from "../api/patient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext } from "react";
import { Context as userContext } from "./UserContext";
const authReducer = (state, action) => {
  switch (action.type) {
    case "login": {
      return { ...state, token: action.payload, errorMessage: "" };
    }
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
  return async (patientObject, navigation, setIsLoading) => {
    patientObject.address = "Ism";
    patientObject.email = patientObject.email.toLowerCase();
    if (patientObject.password !== patientObject.confirmPassword) {
      dispatch({
        type: "add_error",
        payload: "Password and confirm password must be same.",
      });
      return;
    }

    delete patientObject.confirmPassword;

    try {
      setIsLoading(true);
      const response = await patientApi.post("/signup", patientObject);
      dispatch({
        type: "add_success",
        payload:
          "A verification link has been sent to your email. Please verify your email to login.",
      });
      const timeTemp = setTimeout(() => {
        navigation.navigate("Login");
      }, 2000);

      return () => {
        clearTimeout(timeTemp);
      };
    } catch (err) {
      dispatch({
        type: "add_error",
        payload: err.response.data.message,
      });
    } finally {
      setIsLoading(false);
    }
  };
};

const tryLocalSignin = (dispatch) => {
  const { updateUserData } = useContext(userContext);

  return async () => {
    const token = await AsyncStorage.getItem("token");
    try {
      if (token) {
        const response = await patientApi.get("/myinfo", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        updateUserData(response.data.data.patient);
        dispatch({ type: "login", payload: token });
      }
    } catch (err) {
      if (token) {
        dispatch({ type: "login", payload: token });
      }
      const userData = await AsyncStorage.getItem("userData");
      updateUserData(JSON.parse(userData));
      dispatch({ type: "clear_loading" });
    } finally {
      dispatch({ type: "clear_loading" });
    }
  };
};

const login = (dispatch) => {
  const { updateUserData } = useContext(userContext);

  return async (patientObject, setIsLoading) => {
    patientObject.email = patientObject.email.toLowerCase();
    try {
      setIsLoading(true);
      const response = await patientApi.post("/login", patientObject);
      await AsyncStorage.setItem("token", response.data.data.token);
      await AsyncStorage.setItem(
        "userData",
        JSON.stringify(response.data.data.result)
      );
      updateUserData(response.data.data.result);
      dispatch({ type: "login", payload: response.data.data.token });
    } catch (err) {
      dispatch({
        type: "add_error",
        payload: err.response.data.message,
      });
    } finally {
      setIsLoading(false);
    }
  };
};

const forgetPassword = (dispatch) => {
  return async (personEmail, navigation) => {
    personEmail.email = personEmail.email.toLowerCase();

    try {
      const response = await patientApi.post("/forgot-password", personEmail);
      dispatch({
        type: "add_success",
        payload: "A reset password link has been sent to your email.",
      });

      const tempTime = setTimeout(() => {
        navigation.navigate("Login");
      }, 2000);

      return () => {
        clearTimeout(tempTime);
      };
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
  { signup, login, tryLocalSignin, signout, clearMessage, forgetPassword },
  { token: null, errorMessage: "", isLoading: true, successMessage: "" }
);
