import React, { useEffect, useState, useContext, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from "react-native";
import Button from "../components/auth/SubmitButton";
import InputField from "../components/auth/InputField";
import HaveAccOrNot from "../components/auth/HaveAccOrNot";
import OrLine from "../components/auth/OrLine";
import { Context as AuthContext } from "../context/AuthContext";
import MessagesModal from "../components/auth/MessagesModal";

const SignUp = ({ navigation }) => {
  const { signup, clearMessage, state } = useContext(AuthContext);

  const initialSignUpData = {
    patientName: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
    address: "",
    mobile: "",
  };
  const [signUpData, setSignUpData] = useState(initialSignUpData);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      clearMessage();
      setSignUpData(initialSignUpData);
    });
    return unsubscribe;
  }, [navigation]);

  const handleInputChange = useCallback((fieldName, text) => {
    setSignUpData((prevState) => ({ ...prevState, [fieldName]: text }));
  }, []);

  const handleSignUp = useCallback(() => {
    signup(signUpData, navigation);
  }, [signup, signUpData]);

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
      value: signUpData.mobile,
      onChangeText: (text) => handleInputChange("mobile", text),
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

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.head}>SignUp</Text>
      <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
        {signupInputs}
        <Button onPress={handleSignUp} buttonText="SignUp" />
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

        {/* <OrLine /> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: StatusBar.currentHeight,
  },
  head: {
    fontSize: 25,
    textAlign: "center",
    color: "#128393",
    fontFamily: "Roboto-Medium",
  },
  form: {
    marginHorizontal: 15,
  },
  errorMessage: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
  successMessage: {
    fontSize: 16,
    color: "green",
    textAlign: "center",
  },
});

export default React.memo(SignUp);
