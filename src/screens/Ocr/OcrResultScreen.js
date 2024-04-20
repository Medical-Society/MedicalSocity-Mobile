import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import ViewPrescription from "../../components/prescription/ViewPrescription";
import EditPrescription from "../../components/prescription/EditPrescription";
import Header from "../../components/Header";
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
    fontFamily: "black",
    fontSize: SIZES.largeTitle,
    lineHeight: 55,
  },
  h1: { fontSize: SIZES.h1, lineHeight: 36 },
  h2: { fontSize: SIZES.h2, lineHeight: 30 },
  h3: { fontSize: SIZES.h3, lineHeight: 22 },
  h4: { fontSize: SIZES.h4, lineHeight: 20 },
  body1: { fontSize: SIZES.body1, lineHeight: 36 },
  body2: { fontSize: SIZES.body2, lineHeight: 30 },
  body3: { fontSize: SIZES.body3, lineHeight: 22 },
  body4: { fontSize: SIZES.body4, lineHeight: 20 },
};

const medicineData = [
  {
    id: 1,
    name: "Paracetamol",
    nOfTimes: "2 times",
    note: "After meal and before sleep, this medicine is for fever and headache only",
  },
  {
    id: 2,
    name: "Ibuprofen",
    nOfTimes: "3 times",
    note: "Before meal",
  },
  {
    id: 3,
    name: "Cetirizine",
    nOfTimes: "1 times",
    note: "After meal, this medicine if when you have allergy",
  },
  {
    id: 4,
    name: "Paracetamol",
    nOfTimes: "2 times",
    note: "After meal, this medicine is for cough and cold only",
  },
  {
    id: 5,
    name: "Ibuprofen",
    nOfTimes: "3 times",
    note: "Before meal",
  },
  {
    id: 6,
    name: "Cetirizine",
    nOfTimes: "1 times",
    note: "After meal",
  },
  {
    id: 7,
    name: "Paracetamol",
    nOfTimes: "2 times",
    note: "After meal",
  },
  {
    id: 8,
    name: "Ibuprofen",
    nOfTimes: "3 times",
    note: "Before meal",
  },
  {
    id: 9,
    name: "Cetirizine",
    nOfTimes: "1 times",
    note: "After meal",
  },
  {
    id: 10,
    name: "Paracetamol",
    nOfTimes: "2 times",
    note: "This Medicine is for fever and headache only",
  },
  {
    id: 11,
    name: "Ibuprofen",
    nOfTimes: "3 times",
    note: "Before meal",
  },
  {
    id: 12,
    name: "Cetirizine",
    nOfTimes: "1 times",
    note: "After meal",
  },
];
const OcrResultScreen = ({ navigation, route }) => {
  const { drugs } = route.params;

  const drugsData = drugs.map((drug, index) => {
    return {
      id: index + 1,
      name: drug,
      nOfTimes: "",
      note: "",
    };
  });

  const [mode, setMode] = useState("Edit");
  const [prescriptionData, setPrescriptionData] = useState({
    doctorName: "",
    patientName: "",
    age: "",
    medicines: drugsData,
  });
  return (
    <SafeAreaView style={styles.container}>
      <Header title="OCR" navigation={navigation} />
      {mode === "Edit" ? (
        <EditPrescription
          prescriptionData={prescriptionData}
          setMode={setMode}
          setPrescriptionData={setPrescriptionData}
        />
      ) : (
        <ViewPrescription
          prescriptionData={prescriptionData}
          setMode={setMode}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 12,
    marginBottom: 20,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  backButton: {
    position: "absolute",
    left: 0,
  },
  headerText: {
    ...FONTS.h3,
    color: COLORS.primary,
  },
});

export default OcrResultScreen;
