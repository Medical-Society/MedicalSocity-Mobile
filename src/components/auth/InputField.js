import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  colors,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "../../../AppStyles";

// eslint-disable-next-line react/display-name
const InputField = React.memo(
  ({ value, label, onChangeText, secureTextEntry, editable }) => {
    const [showPassword, setShowPassword] = useState(!secureTextEntry);

    const toggleShowPassword = () => {
      setShowPassword((prev) => !prev);
    };

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.inputField}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={!showPassword}
          label={label}
          editable={editable}
        />
        {secureTextEntry && (
          <MaterialCommunityIcons
            name={!showPassword ? "eye-off" : "eye"}
            size={24}
            color={colors.LightGrey}
            style={styles.icon}
            onPress={toggleShowPassword}
          />
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 70,
    justifyContent: "center",
    marginBottom: 15,
    width: "100%",
  },
  inputField: {
    paddingHorizontal: responsiveWidth(10),
    height: responsiveHeight(60),
    color: colors.Black,
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: colors.White,
  },
  icon: {
    position: "absolute",
    right: responsiveWidth(20),
  },
  input: {
    flex: 1,
    fontSize: responsiveFontSize(16),
    fontFamily: "Cairo-Regular",
  },
});

export default InputField;
