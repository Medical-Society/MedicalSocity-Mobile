import React, { useContext } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../../AppStyles";
import Header from "../../components/Header";
import AppointmentCard from "../../components/appointment/AppointmentCard";
import SafeScrollView from "../../components/SafeScrollView";
import SafeFlatListView from "../../components/SafeFlatListView";
import usePaginatedFetch from "../../hooks/usePaginatedFetch";
import { Context as AuthContext } from "../../context/AuthContext";
import { ActivityIndicator } from "react-native-paper";
const AppointmentsScreen = ({ navigation }) => {
  /*
  const doctorName = "Dr. Ahmed";
  const price = 200;
  const noPatientBeforeMe = 2;
  const address = "Cairo, Egypt";
  const date = "3/3/2024";
  const time = "10:00 AM";
  const status = "finished";
  const description = "This is a description for the appointment";
  const buttonText =
    status === "finished" ? "View Prescription" : "Cancel appointment";
  const buttonColor = status === "finished" ? colors.BlueI : colors.DarkRed;

  convert the above data to an object and pass it to the AppointmentCard component

  */

  const {
    data: appointments,
    isLoading,
    handleLoadMore,
  } = usePaginatedFetch(
    `https://api.medical-society.fr.to/api/v1/patients/appointments`,
    "appointments"
  );

  return (
    <SafeFlatListView
      header={
        <Header
          title="Appointments"
          backButtonHandler={() => navigation.goBack()}
        />
      }
      marginBottom={10}>
      <FlatList
        data={
          // sort appointments by status (PENDING, IN_PROGRESS, FINISHED, CANCELED) then by date
          appointments.sort((a, b) => {
            const statusOrder = {
              PENDING: 1,
              IN_PROGRESS: 2,
              FINISHED: 3,
              CANCELED: 4,
            };
            if (statusOrder[a.status] !== statusOrder[b.status]) {
              return statusOrder[a.status] - statusOrder[b.status];
            } else {
              return new Date(a.createdAt) - new Date(b.createdAt);
            }
          })
        }
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <AppointmentCard appointment={item} navigation={navigation} />
        )}
        keyExtractor={(item) => item._id}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={isLoading && <ActivityIndicator size="large" />}
      />
    </SafeFlatListView>
  );
};

export default AppointmentsScreen;
