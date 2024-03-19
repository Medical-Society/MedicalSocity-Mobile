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

import * as ImagePicker from "expo-image-picker";
import { Context as UserContext } from "../../context/UserContext";
import CameraIcon from "../../../assets/camera.png";
import GalleryIcon from "../../../assets/gallery.png";
import axios from "axios";

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

const postImage = async (uri, navigation, setLoading) => {
  console.log("uri", uri);
  console.log("createFormData", createFormData(uri));
  setLoading(true);
  try {
    const data = createFormData(uri);
    const response = await axios.post(
      "https://prescriptions-ocr.azurewebsites.net/OCR",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("response", response.data);
    navigation.navigate("OcrResult", { drugs: response.data.response });
  } catch (error) {
    console.log(error.response);
    setLoading(false);
  } finally {
    setLoading(false);
  }
};

const OcrModalScreen = ({ navigation, isVisible, setModalVisible }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { state, addError, clearMessage } = useContext(UserContext);
  const { errorMessage, successMessage } = state;

  const handleGalleryUpload = async () => {
    setModalVisible(false);
    let result = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
    });
    if (!result.canceled) {
      setModalVisible(false);
      postImage(result.assets[0].uri, navigation, setLoading);
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
      postImage(result.assets[0].uri, navigation, setLoading);
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
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  handlePermission();
                  // setModalVisible(false);
                }}
              >
                <Image source={CameraIcon} style={styles.icon} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setModalVisible(false);
                  handleGalleryUpload();
                }}
              >
                <Image source={GalleryIcon} style={styles.icon} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setModalVisible(false);
              }}
            >
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
    shadowColor: "#000",
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
