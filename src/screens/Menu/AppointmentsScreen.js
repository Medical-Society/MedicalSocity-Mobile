import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../../AppStyles";
import Header from "../../components/Header";
import AppointmentCard from "../../components/appointment/AppointmentCard";

const AppointmentsScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Appointments"
        backButtonHandler={() => navigation.goBack()}
      />
      <View style={styles.cardsContainer}>
        <AppointmentCard />
        <AppointmentCard />
        <AppointmentCard />
        <AppointmentCard />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.White,
  },
  cardsContainer: {
    margin: 16,
  },
});

export default AppointmentsScreen;
