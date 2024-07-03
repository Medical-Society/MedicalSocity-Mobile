import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../../AppStyles";

const InfoField = ({ title, value }) => {
  return (
    <View style={styles.infoFiled}>
      <Text style={styles.mainText}>{title}: </Text>
      <Text style={styles.valueText}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  infoFiled: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
  },
  mainText: {
    fontSize: 18,
    color: colors.BlueI,
    fontFamily: "Cairo-Medium",
  },
  valueText: {
    fontSize: 16,
    color: colors.GreyI,
    fontFamily: "Cairo-Medium",
  },
});

export default InfoField;
