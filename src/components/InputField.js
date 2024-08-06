import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  colors,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "../../AppStyles";

// eslint-disable-next-line react/display-name
const InputField = React.memo(
  ({
    value,
    label,
    onChangeText,
    secureTextEntry,
    editable,
    placeholder,
    lastField = false,
  }) => {
    const [showPassword, setShowPassword] = useState(!secureTextEntry);

    const toggleShowPassword = () => {
      setShowPassword((prev) => !prev);
    };
    return (
      <View
        style={
          lastField
            ? { ...styles.container, marginBottom: responsiveHeight(10) }
            : { ...styles.container, marginBottom: responsiveHeight(15) }
        }>
        <Text
          style={{
            fontSize: responsiveFontSize(18),
            fontFamily: "Cairo-Regular",
            paddingBottom: 5,
          }}>
          {label}
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputField}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={!showPassword}
            placeholder={placeholder}
            placeholderTextColor="#A9A9A9"
            editable={editable}
            autoCapitalize="none"
            autoCorrect={false}
            underlineColor="transparent"
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
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    justifyContent: "center",
    width: "100%",
  },
  inputField: {
    flex: 1,
    paddingHorizontal: responsiveWidth(10),
    height: responsiveHeight(60),
    color: colors.Black,
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: colors.White,
    fontSize: responsiveFontSize(16),
  },
  inputContainer: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
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
