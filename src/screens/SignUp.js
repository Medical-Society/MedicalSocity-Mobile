import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, StatusBar } from "react-native";
import Button from "../components/auth/Button";
import InputField from "../components/auth/InputField";
import HaveAccOrNot from "../components/auth/HaveAccOrNot";
import OrLine from "../components/auth/OrLine";

const SignUp = () => {

  const [signUpData, setSignUpData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (fieldName, text) => {
    setSignUpData({ ...signUpData, [fieldName]: text });
  };

  const handleSignUp = () => {
    // logic
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.head}>SignUp</Text>
      <View style={styles.form}>
        <InputField 
          label="Username" 
          placeholder="Enter your username" 
          value={signUpData.username} 
          onChangeText={(text) => handleInputChange("username", text)}
        />
        <InputField 
          label="Email" 
          placeholder="Enter your email" 
          value={signUpData.email} 
          onChangeText={(text) => handleInputChange("email", text)}
        />
        <InputField
          label="Password"
          placeholder="Enter your password"
          value={signUpData.password}
          onChangeText={(text) => handleInputChange("password", text)}
          secureTextEntry
        />
        <InputField
          label="Confirm Password"
          placeholder="Enter your password again"
          value={signUpData.confirmPassword}
          onChangeText={(text) => handleInputChange("confirmPassword", text)}
          secureTextEntry
        />
        <Button onPress={handleSignUp} buttonText="SignUp" />
        <HaveAccOrNot type="signup" />
        <OrLine />
      </View>
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
  },
  form: {
    marginHorizontal: 5,
  },
});

export default SignUp;
