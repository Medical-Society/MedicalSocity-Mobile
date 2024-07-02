import React, { useContext } from "react";

import { FlatList, StyleSheet, View, Text } from "react-native";
import Header from "../../components/Header";
import PrescriptionCard from "../../components/prescription/PrescriptionCard";
import { ActivityIndicator } from "react-native-paper";

import { Context as UserContext } from "../../context/UserContext";
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
    backgroundColor: colors.White,
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

export default PrescriptionsScreen;
