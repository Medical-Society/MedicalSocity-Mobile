import React from "react";
import { TextInput, StyleSheet } from "react-native";

const MultiLineTextInput = ({ placeholder, value, handleTextChange }) => {
  return (
    <TextInput
      style={styles.multiLineTextInput}
      placeholder={placeholder}
      value={value}
      multiline={true}
      onChangeText={handleTextChange}
    />
  );
};

const styles = StyleSheet.create({
  multiLineTextInput: {
    flex: 1,
    width: "100%",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    textAlignVertical: "top",
    padding: 10,
    paddingVertical: 20,
  },
});

export default MultiLineTextInput;
