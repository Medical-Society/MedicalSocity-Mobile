import React, { useContext } from "react";

import { FlatList, StyleSheet, Text, View } from "react-native";
import Header from "../../components/Header";
import { ActivityIndicator } from "react-native-paper";
import usePaginatedFetch from "../../hooks/usePaginatedFetch";
import { Context as UserContext } from "../../context/UserContext";
import SafeFlatListView from "../../components/SafeFlatListView";
import ScannedPrescriptionCard from "../../components/prescription/ScannedPrescriptionCard";
import patientApi from "../../services/patient";
import { Context as AuthContext } from "../../context/AuthContext";

const ScannedPrescriptionsScreen = ({ navigation }) => {
  const { state: userState } = useContext(UserContext);

  const patientId = userState.userData._id;

  const {
    data: prescriptions,
    isLoading,
    handleLoadMore,
    reFetchData: reFetchPrescriptions,
  } = usePaginatedFetch(
    `https://api.medical-society.fr.to/api/v1/patients/${patientId}/scanned-prescriptions/`,
    "scannedPrescriptions"
  );

  const backButtonHandler = () => {
    navigation.goBack();
  };

  const { state } = useContext(AuthContext);
  const { token } = state;
  const handleDeletePrescription = async (prescriptionId) => {
    try {
      await patientApi.delete(
        `/${patientId}/scanned-prescriptions/${prescriptionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      reFetchPrescriptions();
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <SafeFlatListView
      header={
        <Header
          title="Scanned Prescriptions"
          backButtonHandler={backButtonHandler}
        />
      }
      marginBottom={10}>
      <FlatList
        data={prescriptions}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ScannedPrescriptionCard
            prescription={item}
            handlePressedPrescription={() =>
              navigation.navigate("ScannedPrescriptionModal", {
                prescriptionId: item._id,
                mode: "View",
              })
            }
            handleDeletePrescription={() => handleDeletePrescription(item._id)}
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
    </SafeFlatListView>
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
