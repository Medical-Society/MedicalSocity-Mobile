import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { ActivityIndicator } from "react-native-paper";

const Button = ({
  onPress,
  buttonText,
  isLoading = false,
  color = "default",
}) => (
  <TouchableOpacity onPress={onPress}>
    <LinearGradient
      colors={color === "default" ? ["#060B73", "#040740"] : ["#fff", "#fff"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[
        styles.gradientButton,
        {
          borderColor: color === "default" ? null : "#060B73",
          borderWidth: color === "default" ? null : 1,
        },
      ]}
    >
      <Text
        style={[
          styles.buttonText,
          { color: color === "default" ? "#fff" : "#060B73" },
        ]}
      >
        {buttonText}
      </Text>
      {isLoading && <ActivityIndicator animating={isLoading} />}
    </LinearGradient>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  gradientButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    marginVertical: 5,

    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
});

export default Button;
