import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors, formattedDYM } from "../../../AppStyles";
import patientsApi from "../../services/patient";
const buildButtonStatusBased = (status) => {
  switch (status) {
    case "PENDING":
      return {
        buttonText: "Cancel appointment",
        mainColor: colors.DarkRed,
        backgroundColor: colors.White,
      };
    case "IN_PROGRESS":
      return {
        buttonText: "In progress",
        mainColor: colors.BlueI,
        backgroundColor: colors.LightGrey,
      };
    case "FINISHED":
      return {
        buttonText: "Finished",
        mainColor: colors.BlueI,
        backgroundColor: colors.LightGrey,
      };
    case "CANCELED":
      return {
        buttonText: "Canceled",
        mainColor: colors.White,
        backgroundColor: colors.DarkRed,
      };
  }
};

const AppointmentCard = ({ appointment, onPress }) => {
  const { price, doctor, date, time, status, description } = appointment;
  const [numberOfPatientsBeforeYou, setNumberOfPatientsBeforeYou] = useState(0);

  const { buttonText, mainColor, backgroundColor } =
    buildButtonStatusBased(status);

  useEffect(() => {
    getNumberOfPatientsBeforeYou();
  }, [getNumberOfPatientsBeforeYou]);

  const getNumberOfPatientsBeforeYou = useCallback(async () => {
    try {
      // /appointments/:appointmentId/beforeYou
      const response = await patientsApi.get(
        `/appointments/${appointment._id}/beforeYou`
      );
      console.log(response.data.data.appointmentsBeforeYou);
      setNumberOfPatientsBeforeYou(response.data.data.appointmentsBeforeYou);
    } catch (error) {
      console.log(error.response.data.message);
    }
  }, [appointment._id]);

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor:
            status === "PENDING" ? colors.White : colors.LightGrey,
        },
      ]}>
      <View style={styles.header}>
        <Text style={styles.doctorName}>{doctor.englishFullName}</Text>
        <Text style={styles.date}>{formattedDYM(date)}</Text>
      </View>

      {appointment.status === "PENDING" && (
        <View style={styles.row}>
          <Text style={styles.patientsBefore}>
            {numberOfPatientsBeforeYou} patients before you
          </Text>
        </View>
      )}

      <View style={styles.row}>
        <Text style={styles.price}>{price} LE</Text>
        <Text style={styles.time}>{time}</Text>
      </View>

      <Text style={styles.description}>{description}</Text>
      <TouchableOpacity
        onPress={onPress}
        style={{
          ...styles.button,
          borderColor: mainColor,
          backgroundColor: backgroundColor,
        }}
        disabled={status !== "PENDING"}>
        <Text
          style={{
            ...styles.buttonText,
            color: mainColor,
          }}>
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
  disabledButton: {
    alignItems: "center",
    borderColor: "#7A7A7A",
    borderRadius: 5,
    borderWidth: 1,
    paddingVertical: 16,
  },
});

export default AppointmentCard;
