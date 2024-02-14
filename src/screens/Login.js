import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  StatusBar,
  Alert,
  Modal,
  TouchableOpacity,
} from "react-native";

import Button from "../components/auth/Button";
import InputField from "../components/auth/InputField";
import HaveAccOrNot from "../components/auth/HaveAccOrNot";
import OrLine from "../components/auth/OrLine";
import { Context as AuthContext } from "../context/AuthContext";
import MessagesModal from "../components/auth/MessagesModal";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { state, login, clearMessage } = useContext(AuthContext);
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      clearMessage();
      setEmail("");
      setPassword("");
    });
    return unsubscribe;
  }, [navigation]);

  const handleLogin = useCallback(() => {
    login({ email, password });
  }, [email, password, login]);

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
        {state.errorMessage ? (
          <MessagesModal
            type="error"
            errorMessage={state.errorMessage}
            clearMessage={clearMessage}
          />
        ) : null}
        <HaveAccOrNot
          type="login"
          text="Don't have an account?"
          routeName="SignUp"
          navigation={navigation}
        />
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
  errorMessage: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
});

export default React.memo(Login);
