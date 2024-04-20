import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RadioButton } from "react-native-paper";

const GenderInput = ({ gender, handleInputChange }) => {
  return (
    <View style={styles.genderContainer}>
      <RadioButton.Group
        onValueChange={(newValue) => handleInputChange("gender", newValue)}
        value={gender}>
        <View style={styles.genderSelectors}>
          <View style={styles.radioButtonContainer}>
            <RadioButton.Android
              value="Male"
              color="#6200EE"
              // add text to the radio button
              label="Male"
            />
            <Text
              style={styles.radioButtonText}
              onPress={() => handleInputChange("gender", "Male")}>
              Male
            </Text>
          </View>
          <View style={styles.radioButtonContainer}>
            <RadioButton.Android value="Female" color="#6200EE" />
            <Text
              style={styles.radioButtonText}
              onPress={() => handleInputChange("gender", "Female")}>
              Female
            </Text>
          </View>
        </View>
      </RadioButton.Group>
    </View>
  );
};

const styles = StyleSheet.create({
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  radioContainerHeader: {
    fontSize: 25,
    marginBottom: 10,
    fontWeight: "bold",
    alignSelf: "center",
  },
  radioButtonText: {
    fontSize: 16,
    marginLeft: 8,
  },
  genderSelectors: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  genderContainer: {
    marginTop: 20,
  },
});

export default GenderInput;
