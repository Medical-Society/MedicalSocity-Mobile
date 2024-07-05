import React, { useState } from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import SafeScrollView from "../../components/SafeScrollView";
import Header from "../../components/Header";
import { Image } from "expo-image";
import { blurhash } from "../../../AppStyles";
import InputField from "../../components/InputField";
import MultiLineTextInput from "../../components/MultiLineTextInput";
import MessagesModal from "../../components/MessagesModal";
import SubmitButton from "../../components/SubmitButton";

const ContactUs = ({ navigation }) => {
  const [patientData, setPatientData] = useState({
    name: "",
    email: "",
    writtenMessage: "",
  });

  const [message, setMessage] = useState({
    successMessage: "",
    errorMessage: "",
  });

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = () => {
    if (patientData.name && patientData.email && patientData.writtenMessage) {
      setMessage({
        successMessage:
          "Your message has been sent successfully, we will contact you soon",
      });

      if (!validateEmail(patientData.email)) {
        setMessage({ errorMessage: "Please enter a valid email" });
        return;
      }

      setPatientData({
        name: "",
        email: "",
        writtenMessage: "",
      });
    } else {
      setMessage({ errorMessage: "Please write your problem" });
    }
  };
  return (
    <SafeScrollView
      header={
        <>
          <Header title="Contact Us" backButtonHandler={navigation.goBack} />
          <KeyboardAvoidingView
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              marginHorizontal: 10,
            }}
            behavior="padding"
            enabled
            keyboardVerticalOffset={10}>
            <ScrollView
              style={{
                flex: 1,
              }}>
              <Image
                source={require("../../../assets/contactUs.png")}
                style={styles.image}
                placeholder={{ blurhash }}
                transition={500}
                contentFit="contain"
              />
              <Text style={styles.header}>
                Get in touch with us for any inquiries or support
              </Text>

              <InputField
                label="Name"
                value={patientData.name}
                onChangeText={(name) =>
                  setPatientData({ ...patientData, name })
                }
                placeholder="Enter your name"
              />
              <InputField
                label="Email"
                value={patientData.email}
                onChangeText={(email) =>
                  setPatientData({ ...patientData, email })
                }
                placeholder="Enter your email"
              />

              <MultiLineTextInput
                label="Message"
                placeholder="Write your message here"
                value={patientData.writtenMessage}
                handleTextChange={(writtenMessage) =>
                  setPatientData({ ...patientData, writtenMessage })
                }
              />

              <MessagesModal
                successMessage={message.successMessage}
                errorMessage={message.errorMessage}
                clearMessage={() =>
                  setMessage({ successMessage: "", errorMessage: "" })
                }
              />

              <SubmitButton
                buttonText="Submit"
                onPress={() => handleSubmit()}
              />
            </ScrollView>
          </KeyboardAvoidingView>
        </>
      }></SafeScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    fontSize: 18,
    marginBottom: 10,
    fontFamily: "Cairo-Bold",
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 20,
  },
  text: {
    width: "100%",
    fontSize: 16,
    fontFamily: "Cairo-Regular",
    textAlign: "justify",
  },
});

export default ContactUs;
