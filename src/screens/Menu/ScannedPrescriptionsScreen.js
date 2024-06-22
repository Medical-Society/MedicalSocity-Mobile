import React, { useState, useEffect, useCallback, useContext } from "react";

import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import PrescriptionCard from "../../components/prescription/PrescriptionCard";
import { ActivityIndicator } from "react-native-paper";
import usePaginatedFetch from "../../hooks/usePaginatedFetch";
import { Context as UserContext } from "../../context/UserContext";

const ScannedPrescriptionsScreen = ({ navigation }) => {
  const { state: userState } = useContext(UserContext);

  const patientId = userState.userData._id;
  const {
    data: prescriptions,
    isLoading,
    handleLoadMore,
  } = usePaginatedFetch(
    `https://api-mcy9.onrender.com/api/v1/patients/${patientId}/scanned-prescriptions/`,
    "scannedPrescriptions",
    navigation
  );
  const backButtonHandler = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Scanned Prescriptions"
        backButtonHandler={backButtonHandler}
      />
      <FlatList
        data={prescriptions}
        renderItem={({ item }) => (
          <PrescriptionCard
            prescription={item}
            handlePressedPrescription={() =>
              navigation.navigate("ViewScannedPrescription", {
                prescriptionId: item._id,
              })
            }
            isScanned={true}
          />
        )}
        keyExtractor={(item) => item._id}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={isLoading && <ActivityIndicator size="large" />}
      />
      {!isLoading && prescriptions.length === 0 && (
        <View style={styles.mainContainer}>
          <Text style={styles.mainText}>No scanned prescriptions found</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mainText: {
    fontSize: 20,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ScannedPrescriptionsScreen;
