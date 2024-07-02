import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RadioButton } from "react-native-paper";
import { colors } from "../../AppStyles";

const GenderInput = ({ gender, handleInputChange }) => {
  return (
    <View style={styles.genderContainer}>
      <RadioButton.Group
        onValueChange={(newValue) => handleInputChange("gender", newValue)}
        value={gender}>
        <View style={styles.genderSelectors}>
          <View style={styles.radioButtonContainer}>
            <RadioButton.Android
              value="MALE"
              color={colors.Violet}
              // add text to the radio button
              label="Male"
            />
            <Text
              style={styles.radioButtonText}
              onPress={() => handleInputChange("gender", "MALE")}>
              Male
            </Text>
          </View>
          <View style={styles.radioButtonContainer}>
            <RadioButton.Android value="FEMALE" color={colors.Violet} />
            <Text
              style={styles.radioButtonText}
              onPress={() => handleInputChange("gender", "FEMALE")}>
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
