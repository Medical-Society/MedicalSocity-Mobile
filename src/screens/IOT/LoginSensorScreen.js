import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { ref, onValue } from "firebase/database";
import { database } from "../../services/firebase";
import { Context as UserContext } from "../../context/UserContext";
import SafeScrollView from "../../components/SafeScrollView";
import Header from "../../components/Header";
import InputField from "../../components/auth/InputField";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Context as IotContext } from "../../context/IotContext";
import Button from "../../components/SubmitButton";

const LoginSensorScreen = ({ navigation }) => {
  const { loginWithSensorId } = useContext(IotContext);

  const [sensorId, setSensorId] = useState("");
  return (
    <SafeScrollView
      header={
        <Header
          title="Login Iot"
          backButtonHandler={() => navigation.goBack()}
        />
      }>
      <InputField
        label="Sensor ID"
        value={sensorId}
        onChangeText={(text) => setSensorId(text)}
      />
      <Button
        buttonText="Login"
        onPress={() => {
          loginWithSensorId(sensorId);
        }}
      />
    </SafeScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  text: {
    fontSize: 18,
    marginVertical: 8,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});

export default LoginSensorScreen;
