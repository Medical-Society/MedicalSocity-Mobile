import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
} from "react-native";
import MessagesModal from "../MessagesModal";
import LoadingModal from "../LoadingModal";
import patientApi from "../../services/patient";
import * as ImagePicker from "expo-image-picker";
import { Context as AuthContext } from "../../context/AuthContext";
import CameraIcon from "../../../assets/camera.png";
import GalleryIcon from "../../../assets/gallery.png";
import { colors } from "../../../AppStyles";
import { Context as UserContext } from "../../context/UserContext";
import * as FileSystem from "expo-file-system";
import axios from "axios";
const createFormData = async (uri) => {
  try {
    const fileName = uri.split("/").pop(); // Get the file name from the URI
    const fileType = fileName.split(".").pop(); // Get the file extension

    const formData = new FormData();

    // Fetch the image data from URI using Expo's FileSystem module
    const fileUri = FileSystem.cacheDirectory + fileName;
    await FileSystem.downloadAsync(uri, fileUri);

    const file = {
      uri: fileUri,
      name: fileName,
      type: `image/${fileType}`,
    };

    formData.append("image", file);

    return formData;
  } catch (error) {
    console.error("Error creating FormData:", error);
    throw error; // Rethrow the error to be caught by the calling function
  }
};

const postImage = async (
  uri,
  navigation,
  setLoading,
  addError,
  token,
  patientId
) => {
  try {
    setLoading(true);
    const formData = await createFormData(uri);

    const response = await axios.post(
      `https://api-mcy9.onrender.com/api/v1/patients/${patientId}/scanned-prescriptions/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Prescription submitted successfully:", response.data);
  } catch (error) {
    console.error("Error submitting prescription:", error.response.data);
    // Handle error here
  } finally {
    setLoading(false);
  }
};

const OcrModalScreen = ({ navigation, isVisible, setModalVisible }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const [loading, setLoading] = useState(false);
  const { clearMessage, state: authState, addError } = useContext(AuthContext);
  const { errorMessage, successMessage } = authState;
  const { state: userState } = useContext(UserContext);
  const token = authState.token;
  const patientId = userState.userData._id;

  const handleGalleryUpload = async () => {
    setModalVisible(false);
    let result = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
    });
    if (!result.canceled) {
      setModalVisible(false);
      postImage(
        result.assets[0].uri,
        navigation,
        setLoading,
        addError,
        token,
        patientId
      );
      setSelectedImage(result.assets[0].uri);
    }
  };
  const handlePermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    } else {
      takeAndUploadPhotoAsync();
    }
  };

  const takeAndUploadPhotoAsync = async () => {
    let result = await ImagePicker.launchCameraAsync({
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.canceled) {
      setModalVisible(false);
      postImage(result.assets[0].uri, navigation, setLoading, addError);
      setSelectedImage(result.assets[0].uri);
    }
  };
  return (
    <View>
      {loading ? <LoadingModal loading={loading} /> : null}
      {errorMessage || successMessage ? (
        <MessagesModal
          errorMessage={errorMessage}
          successMessage={successMessage}
          clearMessage={clearMessage}
        />
      ) : null}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                flexDirection: "row",
              }}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  handlePermission();
                  // setModalVisible(false);
                }}>
                <Image source={CameraIcon} style={styles.icon} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setModalVisible(false);
                  handleGalleryUpload();
                }}>
                <Image source={GalleryIcon} style={styles.icon} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setModalVisible(false);
              }}>
              <Text style={styles.textStyle}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 50,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    paddingVertical: 30,
    alignItems: "center",
    shadowColor: colors.Black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  icon: {
    width: 50,
    height: 50,
  },
  button: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 10,
  },
});

export default OcrModalScreen;
