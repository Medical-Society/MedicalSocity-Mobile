import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { RadioButton } from "react-native-paper";
import {
  colors,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "../../AppStyles";

const GenderInput = ({ gender, handleInputChange }) => {
  return (
    <View style={styles.genderContainer}>
      <Text style={styles.label}>Gender</Text>
      <View style={styles.mainContainer}>
        <TouchableOpacity
          onPress={() => {
            handleInputChange("gender", "MALE");
          }}
          style={[styles.status, gender === "MALE" && styles.selectedStatus]}>
          <Text
            style={[
              styles.textStatus,
              // selectedState === statusButtons[item] &&
              gender === "MALE" && styles.selectedTextStatus,
            ]}>
            Male
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handleInputChange("gender", "FEMALE");
          }}
          style={[
            styles.status,
            // selectedState === item && styles.selectedStatus,
            gender === "FEMALE" && styles.selectedStatus,
          ]}>
          <Text
            style={[
              styles.textStatus,
              // selectedState === statusButtons[item] &&
              gender === "FEMALE" && styles.selectedTextStatus,
            ]}>
            Female
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  genderContainer: {
    marginVertical: responsiveHeight(10),
    justifyContent: "center",
  },
  mainContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: responsiveFontSize(18),
    fontFamily: "Cairo-Regular",
    paddingBottom: 5,
  },
  status: {
    flex: 1,
    paddingVertical: responsiveHeight(20),
    borderRadius: 10,
    marginRight: responsiveWidth(10),
    borderColor: colors.GreyI,
    borderWidth: 1,
  },
  selectedStatus: {
    borderColor: colors.BlueI,
    borderWidth: 1.3,
  },
  textStatus: {
    fontSize: responsiveFontSize(16),
    fontFamily: "Cairo-Regular",
    color: colors.GreyI,
    textAlign: "center",
  },
  selectedTextStatus: {
    color: colors.BlueI,
    fontSize: responsiveFontSize(16),
  },
});

export default GenderInput;
