import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../../AppStyles";

const OrLine = () => {
  return (
    <View style={styles.lineContainer}>
      <View style={styles.line} />
      <Text style={styles.orText}>or login using</Text>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  lineContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.GreyI,
    margin: 10,
  },
  orText: {
    color: colors.GreyI,
  },
});

export default OrLine;