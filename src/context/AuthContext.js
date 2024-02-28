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
  return async (patientObject, navigation, setIsLoading) => {
    patientObject.address = "Ism";
    patientObject.email = patientObject.email.toLowerCase();
    console.log(patientObject);
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
      console.log(err.response.data);
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
  return async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      dispatch({ type: "login", payload: token });
    }
    dispatch({ type: "clear_loading" });
  };
};

const login = (dispatch) => {
  return async (patientObject, setIsLoading) => {
    patientObject.email = patientObject.email.toLowerCase();
    try {
      setIsLoading(true);
      const response = await patientApi.post("/login", patientObject);
      console.log(response.data.data);
      await AsyncStorage.setItem("token", response.data.data.token);
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
