import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Dimensions,
  Modal,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Context as UserContext } from "../../context/UserContext";
import MessagesModal from "../../components/MessagesModal";
import LoadingModal from "../../components/LoadingModal";
import Header from "../../components/Header";

const COLORS = {
  primary: "#242760",
  secondary: "#544C4C",
  white: "#FFFFFF",
  black: "#000000",
  gray: "rgba(36, 39, 96, 0.05)",
  secondaryGray: "rgba(84, 76, 76, 0.14)",
};
const { height, width } = Dimensions.get("window");

const SIZES = {
  base: 8,
  font: 14,
  radius: 30,
  padding: 10,
  padding2: 12,
  padding3: 16,
  largeTitle: 50,
  h1: 30,
  h2: 20,
  h3: 18,
  h4: 16,
  body1: 30,
  body2: 20,
  body3: 18,
  body4: 14,
  body5: 12,
  width,
  height,
};

const FONTS = {
  largeTitle: {
    fontFamily: "black",
    fontSize: SIZES.largeTitle,
    lineHeight: 55,
  },
  h1: { fontSize: SIZES.h1, lineHeight: 36 },
  h2: { fontSize: SIZES.h2, lineHeight: 30 },
  h3: { fontSize: SIZES.h3, lineHeight: 22 },
  h4: { fontSize: SIZES.h4, lineHeight: 20 },
  body1: { fontSize: SIZES.body1, lineHeight: 36 },
  body2: { fontSize: SIZES.body2, lineHeight: 30 },
  body3: { fontSize: SIZES.body3, lineHeight: 22 },
  body4: { fontSize: SIZES.body4, lineHeight: 20 },
};

const EditProfile = ({ navigation }) => {
  const { state, updateUserDataServer, postImage, clearMessage } =
    useContext(UserContext);
  const { userData, errorMessage, successMessage } = state;

  const [selectedImage, setSelectedImage] = useState(userData?.avatar);
  const [name, setName] = useState(userData?.patientName);
  const [address, setAddress] = useState(userData?.address);
  const [phoneNumber, setPhoneNumber] = useState(userData?.phoneNumber);
  const [loading, setLoading] = useState(false);

  const handleImageSelection = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      postImage(result.assets[0].uri, navigation, setLoading);
      setSelectedImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Edit Profile"
        backButtonHandler={() => navigation.goBack()}
      />

      <LoadingModal loading={loading} />

      {errorMessage || successMessage ? (
        <MessagesModal
          errorMessage={errorMessage}
          successMessage={successMessage}
          clearMessage={clearMessage}
        />
      ) : null}

      <KeyboardAvoidingView
        style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}
        behavior="padding"
        enabled
        keyboardVerticalOffset={100}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: selectedImage }} style={styles.avatar} />
            <TouchableOpacity onPress={handleImageSelection}>
              <Text style={styles.editImageText}>Edit Image</Text>
            </TouchableOpacity>
          </View>

          <View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Name</Text>
              <View style={styles.textInputContainer}>
                <TextInput
                  value={name}
                  onChangeText={(value) => setName(value)}
                  style={styles.textInput}
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Address</Text>
              <View style={styles.textInputContainer}>
                <TextInput
                  value={address}
                  onChangeText={(value) => setAddress(value)}
                  style={styles.textInput}
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Phone Number</Text>
              <View style={styles.textInputContainer}>
                <TextInput
                  value={phoneNumber}
                  onChangeText={(value) => setPhoneNumber(value)}
                  style={styles.textInput}
                />
              </View>
            </View>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={() =>
                updateUserDataServer(
                  {
                    patientName: name,
                    address,
                    phoneNumber,
                    avatar: selectedImage,
                  },
                  navigation,
                  setLoading
                )
              }>
              <Text style={styles.saveButtonText}>Save Change</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 22,
  },
  header: {
    marginHorizontal: 12,
    flexDirection: "row",
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    left: 0,
  },
  headerText: {
    ...FONTS.h3,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: COLORS.white,
    padding: 22,
    borderRadius: 4,
    width: "80%",
    alignItems: "center",
  },
  modalText: {
    ...FONTS.h3,
  },
  imageContainer: {
    alignItems: "center",
    marginVertical: 22,
  },
  avatar: {
    height: 170,
    width: 170,
    borderRadius: 85,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  editImageText: {
    ...FONTS.body2,
    color: COLORS.primary,
    marginTop: 6,
  },
  inputContainer: {
    flexDirection: "column",
    marginBottom: 6,
  },
  label: {
    ...FONTS.h4,
  },
  textInputContainer: {
    height: 44,
    width: "100%",
    borderColor: COLORS.secondaryGray,
    borderWidth: 1,
    borderRadius: 4,
    marginVertical: 6,
    justifyContent: "center",
    paddingLeft: 8,
  },
  textInput: {
    flex: 1,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    height: 44,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  saveButtonText: {
    ...FONTS.body3,
    color: COLORS.white,
  },
});
