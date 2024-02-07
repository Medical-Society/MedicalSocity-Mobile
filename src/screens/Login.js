import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  StatusBar,
} from "react-native";

import Button from "../components/auth/Button";
import InputField from "../components/auth/InputField";
import HaveAccOrNot from "../components/auth/HaveAccOrNot";
import OrLine from "../components/auth/OrLine";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Perform login logic here
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.head}>Login</Text>
      <View style={styles.form}>
        <InputField 
          label="Email" 
          placeholder="Enter your email" 
          value={email} 
          onChangeText={setEmail}
        />
        <InputField
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Text style={styles.forgetPassword}>Forget your password</Text>
        <Button onPress={handleLogin} buttonText="Login" />
        <HaveAccOrNot type="login" />
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
  form: {
    marginHorizontal: 5,
  },
  head: {
    fontSize: 25,
    textAlign: "center",
    color: "#128393",
  },
  forgetPassword: {
    textAlign: "left",
    marginBottom: 10,
    fontSize: 16,
    color: "#7B7B7B",
  },
  
});

export default Login;
