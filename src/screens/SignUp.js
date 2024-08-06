import React, { useEffect, useState, useContext, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import Button from "../components/SubmitButton";
import InputField from "../components/InputField";
import HaveAccOrNot from "../components/auth/HaveAccOrNot";
import { Context as AuthContext } from "../context/AuthContext";
import MessagesModal from "../components/MessagesModal";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  colors,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "../../AppStyles";
import GenderInput from "../components/GenderInput";
import SafeScrollView from "../components/SafeScrollView";
import Header from "../components/Header";
import { useFocusEffect } from "@react-navigation/native";

const SignUp = ({ navigation }) => {
  const { signup, clearMessage, state } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const initialSignUpData = React.useMemo(
    () => ({
      patientName: "",
      email: "",
      password: "",
      confirmPassword: "",
      birthdate: new Date(),
      gender: "",
      address: "",
      phoneNumber: "",
    }),
    []
  );
  const [signUpData, setSignUpData] = useState(initialSignUpData);

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener("focus", () => {
  //     clearMessage();
  //     setSignUpData(initialSignUpData);
  //   });
  //   return unsubscribe;
  // }, [navigation, initialSignUpData]);

  useFocusEffect(
    useCallback(() => {
      clearMessage();
      setSignUpData(initialSignUpData);
    }, [])
  );

  const handleInputChange = useCallback((fieldName, text) => {
    setSignUpData((prevState) => ({ ...prevState, [fieldName]: text }));
  }, []);

  const handleSignUp = useCallback(() => {
    console.log("signUpData", signUpData);
    signup(signUpData, navigation, setIsLoading);
  }, [signup, signUpData, navigation]);

  const inputsData = [
    {
      label: "Name",
      placeholder: "Enter your name",
      value: signUpData.patientName,
      onChangeText: (text) => handleInputChange("patientName", text),
    },
    {
      label: "Email",
      placeholder: "Enter your email",
      value: signUpData.email,
      onChangeText: (text) => handleInputChange("email", text),
    },
    {
      label: "Password",
      placeholder: "Enter your password",
      value: signUpData.password,
      onChangeText: (text) => handleInputChange("password", text),
      secureTextEntry: true,
    },
    {
      label: "Confirm Password",
      placeholder: "Enter your password again",
      value: signUpData.confirmPassword,
      onChangeText: (text) => handleInputChange("confirmPassword", text),
      secureTextEntry: true,
    },
    {
      label: "Phone Number",
      placeholder: "Enter your phone number",
      value: signUpData.phoneNumber,
      onChangeText: (text) => handleInputChange("phoneNumber", text),
    },
    {
      label: "Address",
      placeholder: "Enter your address",
      value: signUpData.address,
      onChangeText: (text) => handleInputChange("address", text),
    },
  ];

  const signupInputs = inputsData.map((input, index) => {
    return (
      <InputField
        key={index}
        label={input.label}
        placeholder={input.placeholder}
        value={input.value}
        onChangeText={input.onChangeText}
        secureTextEntry={input.secureTextEntry}
      />
    );
  });

  const [isPickerShow, setIsPickerShow] = useState(false);
  const showPicker = () => {
    setIsPickerShow((prev) => !prev);
  };

  const onChange = (event, value) => {
    if (event.type === "set") {
      if (Platform.OS === "android") setIsPickerShow(false);
      setSignUpData((prevState) => ({ ...prevState, birthdate: value }));
    } else if (Platform.OS !== "ios") {
      setIsPickerShow(false);
    }
  };

  const DatePicker = () => {
    return (
      <View style={styles.mainDateContainer}>
        <Text style={styles.label}>Birthdate:</Text>
        <View style={styles.pickedDateContainer}>
          <TouchableOpacity style={styles.pickedDate} onPress={showPicker}>
            <Text style={styles.dateText}>
              {signUpData.birthdate
                .toDateString()
                .split(" ")
                .slice(1)
                .join(" ")}
            </Text>
          </TouchableOpacity>
        </View>

        {isPickerShow && (
          <DateTimePicker
            value={signUpData.birthdate}
            mode={"date"}
            display={Platform.OS === "ios" ? "spinner" : "default"}
            is24Hour={true}
            onChange={onChange}
            style={styles.datePicker}
          />
        )}
      </View>
    );
  };

  return (
    <SafeScrollView
      marginBottom={0}
      header={
        <>
          <Header
            title="SignUp"
            backButtonHandler={() => navigation.goBack()}
          />
          <KeyboardAvoidingView
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              marginHorizontal: 10,
            }}
            behavior="padding"
            enabled
            keyboardVerticalOffset={20}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{
                flex: 1,
              }}>
              {signupInputs}
              <GenderInput
                gender={signUpData.gender}
                handleInputChange={handleInputChange}
              />
              <DatePicker />
              <Button
                onPress={handleSignUp}
                buttonText="SignUp"
                isLoading={isLoading}
              />

              <HaveAccOrNot
                text="Already have an account?"
                routeName="Login"
                navigation={navigation}
              />
              {state.errorMessage || state.successMessage ? (
                <MessagesModal
                  errorMessage={state.errorMessage}
                  successMessage={state.successMessage}
                  clearMessage={clearMessage}
                />
              ) : null}
            </ScrollView>
          </KeyboardAvoidingView>
        </>
      }></SafeScrollView>
  );
};

const styles = StyleSheet.create({
  mainDateContainer: {
    margin: 10,
    justifyContent: "center",
  },
  label: {
    fontSize: responsiveFontSize(18),
    fontFamily: "Cairo-Regular",
    paddingBottom: 5,
  },
  pickedDateContainer: {
    paddingHorizontal: responsiveWidth(10),

    height: responsiveHeight(60),
    color: colors.Black,
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: colors.White,
    fontSize: responsiveFontSize(16),
    justifyContent: "center",
  },
  pickedDate: {
    fontSize: 18,
    color: "black",
  },

  dateText: {
    fontSize: 18,
    color: "black",
  },
});

export default React.memo(SignUp);
