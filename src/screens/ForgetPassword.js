import React, { useState, useContext, useCallback } from "react";
import { StyleSheet, View } from "react-native";

import HaveAccOrNot from "../components/auth/HaveAccOrNot";

import { Context as AuthContext } from "../context/AuthContext";
import Button from "../components/SubmitButton";

import InputField from "../components/auth/InputField";
import MessagesModal from "../components/MessagesModal";
import { colors, responsiveFontSize, responsiveHeight } from "../../AppStyles";
import SafeScrollView from "../components/SafeScrollView";
import Header from "../components/Header";
const ForgetPassword = ({ navigation }) => {
  const { state, clearMessage, forgetPassword } = useContext(AuthContext);

  const [email, setEmail] = useState("");

  const handleForget = useCallback(() => {
    forgetPassword({ email }, navigation);
  }, [email, forgetPassword, navigation]);

  return (
    <SafeScrollView header={<Header title="Forget Password" />}>
      <View style={styles.container}>
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
    </SafeScrollView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
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
