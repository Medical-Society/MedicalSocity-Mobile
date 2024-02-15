import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const InputField = ({
  value,
  label,
  placeholder,
  onChangeText,
  secureTextEntry,
}) => {
  const [showPassword, setShowPassword] = React.useState(!secureTextEntry);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputField}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={!showPassword}
        />
        {secureTextEntry ? (
          <MaterialCommunityIcons
            name={!showPassword ? "eye-off" : "eye"}
            size={24}
            color="#aaa"
            style={styles.icon}
            onPress={toggleShowPassword}
          />
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputField: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 48,
    marginBottom: 15,
  },

  label: {
    marginBottom: 10,
    fontSize: 18,
    color: "#7B7B7B",
    fontFamily: "Roboto-Medium",
  },
  icon: {
    position: "absolute",
    right: 10,
  },
  input: {
    padding: 10,
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    flex: 1,
  },
});

export default InputField;
