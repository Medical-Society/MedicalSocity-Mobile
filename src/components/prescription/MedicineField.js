import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../../AppStyles";

const MedicineField = ({ name, nOfTimes }) => {
  return (
    <View style={{ flexDirection: "column", marginVertical: 8 }}>
      <Text style={styles.mainText}>{name}</Text>
      <Text style={styles.valueText}>
        {nOfTimes ? nOfTimes : "X times"} a day
      </Text>
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
    fontSize: 20,
    color: colors.BlueI,
    fontFamily: "Cairo-Medium",
  },
  valueText: {
    fontSize: 18,
    color: colors.GreyI,
    fontFamily: "Cairo-Medium",
  },
});

export default MedicineField;
