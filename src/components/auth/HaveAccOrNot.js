import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

const HaveAccOrNot = ({ navigation, text, routeName, type }) => {
  return (
    <TouchableOpacity style={styles.haveAccOrNot}>
      <Text>{text}</Text>
      <Text
        style={{ color: "#128393" }}
        onPress={() => navigation.navigate(routeName)}
      >
        {routeName === "SignUp" ? " Sign Up" : " Login"}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  haveAccOrNot: {
    textAlign: "left",
    marginBottom: 10,
    fontSize: 16,
    color: "#7B7B7B",
    flexDirection: "row",
  },
});
export default HaveAccOrNot;
