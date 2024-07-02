import createDataContext from "./createDataContext";
import patientApi from "../services/patient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext } from "react";
import { Context as userContext } from "./UserContext";
import io from "socket.io-client";

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        token: action.payload,
        socket: io("https://api.medical-society.fr.to/", {
          extraHeaders: {
            Authorization: `bearer ${action.payload}`,
          },
        }),
        errorMessage: "",
      };
    case "SIGNOUT":
      return { ...state, token: null, errorMessage: "" };
    case "ADD_ERROR":
      return { ...state, errorMessage: action.payload };
    case "ADD_SUCCESS":
      return { ...state, errorMessage: "", successMessage: action.payload };
    case "CLEAR_MESSAGE":
      return { ...state, errorMessage: "", successMessage: "" };
    case "CLEAR_LOADING":
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

const signup = (dispatch) => {
  return async (patientObject, navigation, setIsLoading) => {
    patientObject.email = patientObject.email.toLowerCase();
    if (patientObject.password !== patientObject.confirmPassword) {
      dispatch({
        type: "ADD_ERROR",
        payload: "Password and confirm password must be the same.",
      });
      return;
    }

    delete patientObject.confirmPassword;

    try {
      setIsLoading(true);
      await patientApi.post("/signup", patientObject);
      dispatch({
        type: "ADD_SUCCESS",
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
      console.log(err.response.data);
      dispatch({
        type: "ADD_ERROR",
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
        console.log(response.data.data.patient);
        dispatch({ type: "LOGIN", payload: token });
      }
    } catch (_) {
      if (token) {
        dispatch({ type: "LOGIN", payload: token });
      }
      const userData = await AsyncStorage.getItem("userData");
      console.log("userData: ", userData);
      updateUserData(JSON.parse(userData));
      dispatch({ type: "CLEAR_LOADING" });
    } finally {
      dispatch({ type: "CLEAR_LOADING" });
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
      console.log(response.data.data);
      await AsyncStorage.setItem("token", response.data.data.token);
      await AsyncStorage.setItem(
        "userData",
        JSON.stringify(response.data.data.result)
      );
      updateUserData(response.data.data.result);
      dispatch({ type: "LOGIN", payload: response.data.data.token });
    } catch (err) {
      dispatch({
        type: "ADD_ERROR",
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
      await patientApi.post("/forgot-password", personEmail);
      dispatch({
        type: "ADD_SUCCESS",
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
        type: "ADD_ERROR",
        payload: err.response.data.message,
      });
    }
  };
};

const signout = (dispatch) => {
  return async () => {
    await AsyncStorage.removeItem("token");
    dispatch({ type: "SIGNOUT" });
  };
};

const clearMessage = (dispatch) => {
  return () => {
    console.log("clearing message");
    dispatch({ type: "CLEAR_MESSAGE" });
  };
};

const addError = (dispatch) => {
  return (message) => {
    dispatch({ type: "ADD_ERROR", payload: message });
  };
};

export const { Provider, Context } = createDataContext(
  authReducer,
  {
    signup,
    login,
    tryLocalSignin,
    signout,
    clearMessage,
    forgetPassword,
    addError,
  },
  {
    token: null,
    errorMessage: "",
    isLoading: true,
    successMessage: "",
    socket: null,
  }
);
