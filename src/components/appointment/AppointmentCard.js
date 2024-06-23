import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors, formatDateForAppointment } from "../../../AppStyles";

const AppointmentCard = ({ appointment, onPress }) => {
  // create a dummy data for the appointment card of the previous appointment
  //   const doctorName = "Dr. Ahmed";
  //   const price = 200;
  //   const noPatientBeforeMe = 2;
  //   const address = "Cairo, Egypt";
  //   const date = "3/3/2024";
  //   const time = "10:00 AM";
  //   const status = "finished";
  //   const description = "This is a description for the appointment";

  const {
    doctorName,
    price,
    noPatientBeforeMe,
    address,
    date,
    time,
    status,
    description,
  } = appointment;

  const buttonText =
    status === "finished" ? "View Prescription" : "Cancel appointment";
  const buttonColor = status === "finished" ? colors.BlueI : colors.DarkRed;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.doctorName}>{doctorName}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.price}>{price} LE</Text>
        <Text style={styles.time}>{time}</Text>
      </View>
      <Text style={styles.patientsBefore}>
        {noPatientBeforeMe} patients before you
      </Text>
      <Text style={styles.description}>{description}</Text>
      <TouchableOpacity style={{ ...styles.button, borderColor: buttonColor }}>
        <Text style={{ ...styles.buttonText, color: buttonColor }}>
          {buttonText}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    justifyContent: "center",
    borderRadius: 8,
    padding: 16,
    backgroundColor: colors.White,
    borderColor: colors.LightGrey,
    borderWidth: 0.3,
    shadowColor: colors.Black,
    elevation: 3,
    marginVertical: 5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  doctorName: {
    color: "#060B73",
    fontSize: 18,
    flex: 1,
    fontFamily: "Cairo-Medium",
    lineHeight: 34,
  },
  date: {
    color: "#7A7A7A",
    fontSize: 14,
    fontFamily: "Cairo-Regular",
    lineHeight: 26,
  },
  row: {
    flexDirection: "row",
  },
  price: {
    color: "#060B73",
    fontSize: 16,
    flex: 1,
    fontFamily: "Cairo-Regular",
    lineHeight: 30,
  },
  time: {
    color: "#060B73",
    fontSize: 14,
  },
  patientsBefore: {
    color: "#060B73",
    fontSize: 16,
    lineHeight: 30,
  },
  description: {
    color: "#1E1E1E",
    fontSize: 14,
    lineHeight: 26,
    width: 334,
  },
  button: {
    alignItems: "center",
    borderColor: "#900F06",
    borderRadius: 5,
    borderWidth: 1,
    paddingVertical: 16,
  },
  buttonText: {
    color: "#900F06",
    fontSize: 14,
  },
});

export default AppointmentCard;
