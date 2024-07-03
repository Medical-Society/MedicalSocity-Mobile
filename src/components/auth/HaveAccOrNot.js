import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  colors,
  responsiveFontSize,
} from "../../../AppStyles";

const HaveAccOrNot = ({ navigation, text, routeName }) => {
  return (
    <TouchableOpacity style={styles.haveAccOrNot}>
      <Text
        style={[
          styles.text,
          {
            color: colors.DarkGrey,
            fontSize: responsiveFontSize(16),
          },
        ]}>
        {text}
      </Text>
      <Text style={styles.text} onPress={() => navigation.navigate(routeName)}>
        {routeName === "SignUp" ? " Sign Up" : " Login"}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  haveAccOrNot: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: colors.BlueI,
    fontFamily: "Cairo-Regular",
    lineHeight: 30,
    alignSelf: "center",
    fontSize: responsiveFontSize(16),
  },
});
export default HaveAccOrNot;
