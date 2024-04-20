import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Button from "../components/SubmitButton";
import InputField from "../components/auth/InputField";
import HaveAccOrNot from "../components/auth/HaveAccOrNot";
import { Context as AuthContext } from "../context/AuthContext";
import MessagesModal from "../components/MessagesModal";
import {
  colors,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "../../AppStyles";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { state, login, clearMessage } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      clearMessage();
      setEmail("");
      setPassword("");
    });
    return unsubscribe;
  }, [navigation]);

  const handleLogin = useCallback(() => {
    login({ email, password }, setIsLoading);
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
        <TouchableOpacity onPress={() => navigation.navigate("ForgetPassword")}>
          <Text style={styles.forgetPassword}>Forget your password</Text>
        </TouchableOpacity>
        <Button
          onPress={handleLogin}
          buttonText="Login"
          isLoading={isLoading}
        />
        {state.errorMessage ? (
          <MessagesModal
            type="error"
            errorMessage={state.errorMessage}
            clearMessage={clearMessage}
          />
        ) : null}
        <HaveAccOrNot
          text="Don't have an account?"
          routeName="SignUp"
          navigation={navigation}
        />
        {/* <OrLine /> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.White,
    paddingTop: StatusBar.currentHeight,
  },
  form: {
    marginHorizontal: responsiveWidth(20),
  },
  head: {
    fontSize: responsiveFontSize(30),
    textAlign: "center",
    color: colors.BlueI,
    fontFamily: "Cairo-Medium",
    marginBottom: responsiveHeight(20),
  },
  forgetPassword: {
    textAlign: "left",
    marginBottom: responsiveHeight(10),
    fontSize: responsiveFontSize(16),
    color: colors.DarkGrey,
  },
});

export default React.memo(Login);
