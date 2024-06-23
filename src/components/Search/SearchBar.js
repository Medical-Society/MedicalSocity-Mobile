import React from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../../AppStyles";

const SearchBar = ({ term, onTermChange, onTermSubmit, setResults }) => {
  return (
    <View style={styles.backgroundStyle}>
      <Feather name="search" style={styles.iconStyle} />
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.inputStyle}
        placeholder="Search for doctor, lab or pharmacy"
        value={term}
        onChangeText={onTermChange}
        onEndEditing={onTermSubmit}
      />
      <TouchableOpacity
        style={{ alignSelf: "center" }}
        onPress={() => {
          onTermChange("");
          setResults([]);
        }}>
        <Feather name="x" style={styles.iconStyle} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: colors.OffWhite,
    height: 50,
    borderRadius: 5,
    marginHorizontal: 15,
    flexDirection: "row",
    marginBottom: 10,
  },
  inputStyle: {
    flex: 1,
    fontFamily: "Cairo-Regular",
    fontSize: 18,
  },
  iconStyle: {
    fontSize: 30,
    alignSelf: "center",
    marginHorizontal: 15,
  },
});

export default SearchBar;
