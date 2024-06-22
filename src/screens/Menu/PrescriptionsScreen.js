import React, { useState, useEffect, useCallback, useContext } from "react";

import { FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import PrescriptionCard from "../../components/prescription/PrescriptionCard";
import axios from "axios";
import { ActivityIndicator } from "react-native-paper";

import { Context as UserContext } from "../../context/UserContext";
import { Context as AuthContext } from "../../context/AuthContext";
import usePaginatedFetch from "../../hooks/usePaginatedFetch";
import { colors } from "../../../AppStyles";

const PrescriptionsScreen = ({ navigation }) => {
  const backButtonHandler = () => {
    navigation.goBack();
  };
  const { state: userState } = useContext(UserContext);

  const patientId = userState.userData._id;
  const {
    data: prescriptions,
    isLoading,
    handleLoadMore,
  } = usePaginatedFetch(
    `https://api-mcy9.onrender.com/api/v1/patients/${patientId}/prescriptions/`,
    "prescriptions"
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Prescriptions" backButtonHandler={backButtonHandler} />
      <FlatList
        data={prescriptions}
        renderItem={({ item }) => (
          <PrescriptionCard
            prescription={item}
            handlePressedPrescription={() =>
              navigation.navigate("ViewPrescription", {
                prescriptionId: item._id,
              })
            }
          />
        )}
        keyExtractor={(item) => item._id}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={isLoading && <ActivityIndicator size="large" />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.White,
  },
});

export default PrescriptionsScreen;
