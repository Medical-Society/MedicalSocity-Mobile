import React, { useState } from "react";
import Header from "../Header";
import ViewScannedPrescriptionScreen from "../../screens/Prescription/ViewScannedPrescriptionScreen";
import EditScannedPrescriptionScreen from "../../screens/Prescription/EditScannedPrescriptionScreen";
import SafeFlatListView from "../SafeFlatListView";

const ScannedPrescriptionModal = ({ navigation, route }) => {
  const prescriptionId = route.params.prescriptionId;
  const defaultMode = "View";
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
          editMode={mode}
        />
      ) : (
        <ViewScannedPrescriptionScreen
          prescriptionId={prescriptionId}
          setMode={setMode}
          editMode={mode}
        />
      )}
    </SafeFlatListView>
  );
};

export default ScannedPrescriptionModal;
