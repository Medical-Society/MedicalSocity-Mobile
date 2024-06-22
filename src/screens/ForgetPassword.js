import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  Alert,
  Modal,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import HaveAccOrNot from "../components/auth/HaveAccOrNot";

import { Context as AuthContext } from "../context/AuthContext";
import Button from "../components/SubmitButton";

import InputField from "../components/auth/InputField";
import MessagesModal from "../components/MessagesModal";
import { colors, responsiveFontSize, responsiveHeight } from "../../AppStyles";
const ForgetPassword = ({ navigation }) => {
  const { state, clearMessage, forgetPassword } = useContext(AuthContext);

  const [email, setEmail] = useState("");

  const handleForget = useCallback(() => {
    forgetPassword({ email }, navigation);
  }, [email, forgetPassword]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.head}>Forget Password</Text>
      <View style={styles.form}>
        <InputField
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
        />
        <Button onPress={handleForget} buttonText="Forget Password" />
        {state.errorMessage || state.successMessage ? (
          <MessagesModal
            errorMessage={state.errorMessage}
            successMessage={state.successMessage}
            clearMessage={clearMessage}
          />
        ) : null}
        <HaveAccOrNot
          type="login"
          text="Already have an account?"
          routeName="Login"
          navigation={navigation}
        />
      </View>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.White,
    paddingTop: StatusBar.currentHeight,
    justifyContent: "center",
  },
  form: {
    marginHorizontal: 15,
  },
  head: {
    fontSize: responsiveFontSize(30),
    textAlign: "center",
    color: colors.BlueI,
    fontFamily: "Cairo-Medium",
    marginBottom: responsiveHeight(20),
  },
});

//make this component available to the app
export default React.memo(ForgetPassword);
