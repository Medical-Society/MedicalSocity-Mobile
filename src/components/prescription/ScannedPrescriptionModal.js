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
import Header from "../Header";
import ViewScannedPrescriptionScreen from "../../screens/Prescription/ViewScannedPrescriptionScreen";
import EditScannedPrescriptionScreen from "../../screens/Prescription/EditScannedPrescriptionScreen";
import SafeFlatListView from "../SafeFlatListView";
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

const ScannedPrescriptionModal = ({ navigation, route }) => {
  const prescriptionId = route.params.prescriptionId;
  const defaultMode = route.params.mode;
  const [mode, setMode] = useState(defaultMode);

  return (
    <SafeFlatListView
      header={
        <Header
          title={
            mode === "Edit"
              ? "Edit Scanned Prescription"
              : "View Scanned Prescription"
          }
          backButtonHandler={() => navigation.goBack()}
        />
      }>
      {mode === "Edit" ? (
        <EditScannedPrescriptionScreen
          prescriptionId={prescriptionId}
          setMode={setMode}
        />
      ) : (
        <ViewScannedPrescriptionScreen
          prescriptionId={prescriptionId}
          setMode={setMode}
        />
      )}
    </SafeFlatListView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default ScannedPrescriptionModal;
