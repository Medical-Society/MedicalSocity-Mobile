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
import SafeFlatListView from "../../components/SafeFlatListView";

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
    `https://api.medical-society.fr.to/api/v1/patients/${patientId}/prescriptions/`,
    "prescriptions"
  );

  return (
    <SafeFlatListView
      header={
        <Header title="Prescriptions" backButtonHandler={backButtonHandler} />
      }
      marginBottom={10}>
      <FlatList
        data={prescriptions}
        showsVerticalScrollIndicator={false}
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
        onEndReachedThreshold={0.5}
        ListFooterComponent={isLoading && <ActivityIndicator size="large" />}
      />
    </SafeFlatListView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.White,
  },
});

export default PrescriptionsScreen;
