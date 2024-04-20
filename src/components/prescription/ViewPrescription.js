import React from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import SubmitButton from "../SubmitButton";

const COLORS = {
  primary: "#242760",
  secondary: "#544C4C",
  white: "#FFFFFF",
  black: "#000000",
  gray: "rgba(36, 39, 96, 0.05)",
  secondaryGray: "rgba(84, 76, 76, 0.14)",
};
const { height, width } = Dimensions.get("window");

const SIZES = {
  small: 4,
  base: 8,
  font: 14,
  radius: 30,
  padding: 10,
  padding2: 12,
  padding3: 16,
  largeTitle: 50,  
  h1: 30,
  h2: 20,
  h3: 18,
  h4: 16,
  body1: 30,
  body2: 20,
  body3: 18,
  body4: 14,
  body5: 12,
  width,
  height,
};

const FONTS = {
  largeTitle: {
    fontFamily: "Cairo-Regular",
    fontSize: SIZES.largeTitle,
    lineHeight: 55,
  },
  h1: { fontSize: SIZES.h1, lineHeight: 36, fontFamily: "Cairo-Regular" },
  h2: { fontSize: SIZES.h2, lineHeight: 30, fontFamily: "Cairo-Regular" },
  h3: { fontSize: SIZES.h3, lineHeight: 22, fontFamily: "Cairo-Regular" },
  h4: { fontSize: SIZES.h4, lineHeight: 20, fontFamily: "Cairo-Regular" },
  body1: { fontSize: SIZES.body1, lineHeight: 36, fontFamily: "Cairo-Regular" },
  body2: { fontSize: SIZES.body2, lineHeight: 30, fontFamily: "Cairo-Regular" },
  body3: { fontSize: SIZES.body3, lineHeight: 22, fontFamily: "Cairo-Regular" },
  body4: { fontSize: SIZES.body4, lineHeight: 20, fontFamily: "Cairo-Regular" },
};
const InfoField = ({ title, value }) => {
  return (
    <View style={{ flexDirection: "row", marginVertical: SIZES.base }}>
      <Text style={{ ...FONTS.h3, color: COLORS.primary }}>{title}</Text>
      <Text
        style={{
          ...FONTS.h3,
          color: COLORS.secondary,
          marginLeft: SIZES.padding,
        }}
      >
        {value}
      </Text>
    </View>
  );
};

const MedicineField = ({ name, nOfTimes, note }) => {
  return (
    <View style={{ flexDirection: "column", marginVertical: SIZES.base }}>
      <Text style={{ ...FONTS.h2, color: COLORS.primary }}>{name}</Text>
      <Text style={styles.secondaryText}>- {nOfTimes} a day</Text>
      <Text style={styles.secondaryText}>- {note}</Text>
    </View>
  );
};

const ViewPrescription = ({ prescriptionData, setMode }) => {
  const { patientName, doctorName, age, medicines } = prescriptionData;
  return (
    <View style={styles.container}>
      <InfoField
        title="Doctor Name:"
        value={doctorName ? doctorName : "No name"}
      />
      <InfoField
        title="Patient Name:"
        value={patientName ? patientName : "No name"}
      />
      <InfoField title="Age:" value={age ? age : "No age"} />
      {/* create a divider with colors primary */}
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: COLORS.primary,
          marginVertical: SIZES.base,
        }}
      />
      <FlatList
        data={prescriptionData.medicines}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MedicineField
            name={item.name}
            nOfTimes={item.nOfTimes}
            note={item.note}
          />
        )}
      />
      <SubmitButton
        buttonText="Edit Prescription"
        onPress={() => setMode("Edit")}
        color="default"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 12,
  },
  backButton: {
    position: "absolute",
    left: 0,
  },
  headerText: {
    ...FONTS.h3,
    color: COLORS.primary,
  },
  secondaryText: {
    ...FONTS.h3,
    color: COLORS.secondary,
    marginVertical: SIZES.small,
  },
});

export default ViewPrescription;
