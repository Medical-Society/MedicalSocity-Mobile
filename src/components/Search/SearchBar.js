import React from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { colors, responsiveFontSize } from "../../../AppStyles";

const SearchBar = ({
  term,
  onTermChange,
  placeholder,
  onTermSubmit,
  setResults,
}) => {
  return (
    <View style={styles.backgroundStyle}>
      <Feather name="search" style={styles.iconStyle} />
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.inputStyle}
        placeholder={placeholder}
        value={term}
        onChangeText={onTermChange}
        onEndEditing={onTermSubmit}
      />
      {term !== "" && (
        <TouchableOpacity
          style={{ alignSelf: "center" }}
          onPress={() => {
            onTermChange("");
            setResults([]);
          }}>
          <Feather name="x" style={styles.iconStyle} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: colors.WhiteI,
    height: 40,
    borderRadius: 5,
    marginHorizontal: 10,
    flexDirection: "row",
    borderColor: colors.LightGrey,
    borderWidth: 1,
    marginBottom: 5,
  },
  inputStyle: {
    flex: 1,
    fontFamily: "Cairo-Regular",
    fontSize: responsiveFontSize(16),
    color: colors.DarkGrey,
  },
  iconStyle: {
    fontSize: 25,
    alignSelf: "center",
    marginHorizontal: 15,
    color: colors.DarkGrey,
  },
});

export default SearchBar;
