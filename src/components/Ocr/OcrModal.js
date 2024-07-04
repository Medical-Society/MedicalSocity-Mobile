import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";
import MessagesModal from "../MessagesModal";
import LoadingModal from "../LoadingModal";
import * as ImagePicker from "expo-image-picker";
import { Context as AuthContext } from "../../context/AuthContext";
import CameraIcon from "../../../assets/camera.png";
import GalleryIcon from "../../../assets/gallery.png";
import { colors } from "../../../AppStyles";
import { Context as UserContext } from "../../context/UserContext";
import { createFormData } from "../../../AppStyles";
import axios from "axios";
import { Image } from "expo-image";
import { blurhash } from "../../../AppStyles";

const postImage = async (
  uri,
  navigation,
  setLoading,
  setMessage,
  token,
  patientId
) => {
  try {
    setLoading(true);
    const formData = await createFormData(uri);

    const response = await axios.post(
      `https://api.medical-society.fr.to/api/v1/patients/${patientId}/scanned-prescriptions/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setMessage({
      errorMessage: "",
      successMessage: "Prescription submitted successfully",
    });
    navigation.navigate("ScannedPrescriptionModal", {
      prescriptionId: response.data.data._id,
      mode: "Edit",
    });
    setMessage({
      errorMessage: "",
      successMessage: "",
    });
  } catch (_) {
    setMessage({
      errorMessage: "Error submitting prescription",
      successMessage: "",
    });
  } finally {
    setLoading(false);
  }
};

const OcrModalScreen = ({ navigation, isVisible, setModalVisible }) => {
  const [loading, setLoading] = useState(false);
  const { state: authState } = useContext(AuthContext);

  const [message, setMessage] = useState({
    errorMessage: "",
    successMessage: "",
  });

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
        setMessage,
        token,
        patientId
      );
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
      postImage(
        result.uri,
        navigation,
        setLoading,
        setMessage,
        token,
        patientId
      );
    }
  };
  return (
    <View>
      <LoadingModal loading={loading} />

      <MessagesModal
        errorMessage={message.errorMessage}
        successMessage={message.successMessage}
        clearMessage={() =>
          setMessage({ errorMessage: "", successMessage: "" })
        }
      />

      <Modal animationType="fade" transparent={true} visible={isVisible}>
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
                }}>
                <Image
                  source={CameraIcon}
                  style={styles.icon}
                  placeholder={{ blurhash }}
                  transition={500}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setModalVisible(false);
                  handleGalleryUpload();
                }}>
                <Image
                  source={GalleryIcon}
                  style={styles.icon}
                  placeholder={{ blurhash }}
                  transition={500}
                />
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
