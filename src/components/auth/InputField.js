import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
            color="#aaa"
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
    borderRadius: 20,
    paddingHorizontal: 10,
    height: 60,
    color: "#000",
    borderColor: "#AEAEAE",
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: 15,
    backgroundColor: "#ffffff",
  },
  icon: {
    position: "absolute",
    right: 20,
  },
  input: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    flex: 1,
  },
});

export default InputField;
