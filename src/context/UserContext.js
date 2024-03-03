import createDataContext from "./createDataContext";
import patientApi from "../api/patient";
import AsyncStorage from "@react-native-async-storage/async-storage";

const userReducer = (state, action) => {
  switch (action.type) {
    case "update_user_data":
      return { ...state, userData: action.payload };
    case "get_user_data":
      return state.userData;
    case "post_image":
      return {
        ...state,
        userData: { ...state.userData, avatar: action.payload },
      };
    default:
      return state;
  }
};

const createFormData = (uri) => {
  const fileName = uri?.split("/")?.pop();
  const fileType = fileName?.split(".")?.pop();
  const formData = new FormData();
  formData.append("image", {
    name: fileName,
    uri,
    type: `image/${fileType}`,
  });
  return formData;
};

const postImage = (dispatch) => {
  return async (uri, setLoading) => {
    console.log("uri: ", uri);
    const data = createFormData(uri);
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");
      const response = await patientApi.post("/avatar", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch({ type: "post_image", payload: response.data.data.avatar });
      console.log("response: ", response.data);
      const userData = await AsyncStorage.getItem("userData");
      const parsedUserData = JSON.parse(userData);
      parsedUserData.avatar = response.data.data.avatar;
      await AsyncStorage.setItem("userData", JSON.stringify(parsedUserData));
    } catch (err) {
      console.log(err.response);
    } finally {
      setLoading(false);
    }
  };
};

const updateUserDataServer = (dispatch) => {
  return async (userData, navigation) => {
    console.log("userData: ", userData);
    const { patientName, address, phoneNumber, avatar } = userData;
    try {
      // setIsLoading(true);
      const token = await AsyncStorage.getItem("token");
      const response = await patientApi.patch(
        "/updateMe",
        {
          patientName,
          address,
          phoneNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const userData = await AsyncStorage.getItem("userData");
      const parsedUserData = JSON.parse(userData);
      parsedUserData.patientName = patientName;
      parsedUserData.address = address;
      parsedUserData.phoneNumber = phoneNumber;
      await AsyncStorage.setItem("userData", JSON.stringify(parsedUserData));

      dispatch({
        type: "update_user_data",
        payload: response.data.data.patient,
      });
    } catch (err) {
      console.log(err.response.data);
    } finally {
      // setIsLoading(false);
    }
  };
};

const updateUserData = (dispatch) => {
  return async (userData) => {
    await AsyncStorage.setItem("userData", JSON.stringify(userData)); //if error here
    dispatch({ type: "update_user_data", payload: userData });
  };
};

export const { Provider, Context } = createDataContext(
  userReducer,
  {
    updateUserDataServer,
    updateUserData,
    postImage,
  },
  {
    userData: {},
  }
);
