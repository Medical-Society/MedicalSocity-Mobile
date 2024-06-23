// Header.js

import React, { memo } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import {
  responsiveFontSize,
  colors,
  responsiveHeight,
  responsiveWidth,
} from "../../AppStyles";

const Header = ({ title, backButtonHandler }) => {
  return (
    <View style={styles.header}>
      {backButtonHandler && (
        <TouchableOpacity onPress={backButtonHandler} style={styles.iconButton}>
          <MaterialIcons
            name="keyboard-arrow-left"
            size={responsiveFontSize(30)}
            color={colors.Black}
          />
        </TouchableOpacity>
      )}
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  header: {
    marginHorizontal: responsiveWidth(12),
    marginVertical: responsiveHeight(10),
    flexDirection: "row",
    justifyContent: "center",
  },
  headerTitle: {
    fontFamily: "Cairo-SemiBold",
    fontSize: responsiveFontSize(24),
    color: colors.BlueI,
  },
  iconButton: {
    position: "absolute",
    left: responsiveWidth(0),
  },
});

export default memo(Header);
