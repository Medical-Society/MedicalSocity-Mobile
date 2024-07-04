import React from "react";
import { TextInput, StyleSheet, View, Text } from "react-native";
import { responsiveFontSize } from "../../AppStyles";

const MultiLineTextInput = ({
  label = "",
  placeholder,
  value,
  handleTextChange,
}) => {
  return (
    <View style={styles.multiLineTextInputContainer}>
      <Text
        style={{
          fontSize: responsiveFontSize(18),
          fontFamily: "Cairo-Regular",
          paddingBottom: 5,
        }}>
        {label}
      </Text>
      <TextInput
        style={styles.multiLineTextInput}
        placeholder={placeholder}
        value={value}
        multiline={true}
        onChangeText={handleTextChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  multiLineTextInputContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  multiLineTextInput: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    textAlignVertical: "top",
    padding: 10,
    paddingVertical: 20,
    maxHeight: 100,
  },
});

export default MultiLineTextInput;
