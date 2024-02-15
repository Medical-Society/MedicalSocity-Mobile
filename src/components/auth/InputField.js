import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";


const InputField = ({
  value,
  label,
  placeholder,
  onChangeText,
  secureTextEntry,
}) => (
  <View>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
    />
  </View>
);

const styles = StyleSheet.create({
  label: {
    marginTop: 10,
    fontSize: 18,
    color: "#7B7B7B",
    fontWeight: "bold",
  },
  input: {
    height: 48,
    margin: 12,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 10,
    fontSize: 16,
    borderRadius: 10,
  },
});

export default InputField;
