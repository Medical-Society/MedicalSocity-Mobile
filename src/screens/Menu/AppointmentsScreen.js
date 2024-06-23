import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../../AppStyles";
import Header from "../../components/Header";
import AppointmentCard from "../../components/appointment/AppointmentCard";
import SafeScrollView from "../../components/SafeScrollView";

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
  const appointment1 = {
    doctorName: "Dr. Ahmed",
    price: 200,
    date: "3/3/2024",
    noPatientBeforeMe: 2,
    address: "Cairo, Egypt",
    time: "10:00 AM",
    status: "finished",
  };

  const appointment2 = {
    doctorName: "Dr. Mohamed",
    price: 300,
    date: "4/3/2024",
    noPatientBeforeMe: 3,
    address: "Giza, Egypt",
    time: "11:00 AM",
    status: "upcoming",
  };

  return (
    <SafeScrollView
      header={
        <Header
          title="Appointments"
          backButtonHandler={() => navigation.goBack()}
        />
      }>
      <AppointmentCard
        appointment={appointment1}
        onPress={() => console.log("Appointment Pressed")}
      />
      <AppointmentCard
        appointment={appointment2}
        onPress={() => console.log("Appointment Pressed")}
      />
    </SafeScrollView>
  );
};

export default AppointmentsScreen;
