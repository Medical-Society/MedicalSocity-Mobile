import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  colors,
  responsiveFontSize,
  responsiveHeight,
} from "../../../AppStyles";

const HaveAccOrNot = ({ navigation, text, routeName }) => {
  return (
    <TouchableOpacity style={styles.haveAccOrNot}>
      <Text>{text}</Text>
      <Text style={styles.text} onPress={() => navigation.navigate(routeName)}>
        {routeName === "SignUp" ? " Sign Up" : " Login"}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  haveAccOrNot: {
    textAlign: "left",
    marginTop: responsiveHeight(10),
    fontSize: responsiveFontSize(16),
    color: colors.LightGrey,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: colors.BlueI,
    fontSize: responsiveFontSize(16),
    fontWeight: "bold",
  },
});
export default HaveAccOrNot;
