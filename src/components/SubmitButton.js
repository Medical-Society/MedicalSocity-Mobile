import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { responsiveFontSize, responsiveHeight, colors } from "../../AppStyles";
const Button = ({
  onPress,
  buttonText,
  isLoading = false,
  color = "default",
  disabled = false,
}) => (
  <TouchableOpacity onPress={onPress} disabled={disabled || isLoading}>
    <LinearGradient
      colors={
        color === "default"
          ? [colors.BlueI, colors.BlueII]
          : [colors.White, colors.White]
      }
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[
        styles.gradientButton,
        {
          borderColor: color === "default" ? null : colors.BlueI,
          borderWidth: color === "default" ? null : 1,
        },
      ]}>
      <Text
        style={[
          styles.buttonText,
          { color: color === "default" ? colors.White : colors.BlueI },
        ]}>
        {buttonText}
      </Text>
      {isLoading && <ActivityIndicator animating={isLoading} />}
    </LinearGradient>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  gradientButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: responsiveHeight(14),
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
    fontSize: responsiveFontSize(18),
    textAlign: "center",
    fontFamily: "Cairo-SemiBold",
  },
});

export default Button;
