import React, { useEffect, useState } from "react";
import { View, Text, Share, StyleSheet, TouchableOpacity } from "react-native";
import { colors, convertTo12HourFormat } from "../../../AppStyles";
import patientsApi from "../../services/patient";
import { Ionicons } from "@expo/vector-icons";

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
        mainColor: colors.Green,
        backgroundColor: colors.LightGrey,
      };
    case "CANCELED":
      return {
        buttonText: "Canceled",
        mainColor: colors.DarkRed,
        backgroundColor: colors.DarkRed,
      };
  }
};

const AppointmentCard = ({ appointment, onPress, goToDoctorProfile }) => {
  const { price, doctor, date, time, status } = appointment;
  const [numberOfPatientsBeforeYou, setNumberOfPatientsBeforeYou] = useState(0);

  const { buttonText, mainColor, backgroundColor } =
    buildButtonStatusBased(status);

  const [, formattedTime, formattedYMD] = convertTo12HourFormat(date);

  useEffect(() => {
    const getNumberOfPatientsBeforeYou = async () => {
      try {
        const response = await patientsApi.get(
          `/appointments/${appointment._id}/beforeYou`
        );
        setNumberOfPatientsBeforeYou(response.data.data.appointmentsBeforeYou);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    if (status === "PENDING") getNumberOfPatientsBeforeYou();
  });

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `Appointment Details:
          Doctor Name: ${doctor.englishFullName}
          Date: ${formattedYMD}
          Time: ${formattedTime}
          Price: ${price} LE

Shared From Medical Society App.
You can view them by downloading the Medical Society app.`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.doctorName} onPress={goToDoctorProfile}>
          {doctor.englishFullName}
        </Text>
        <Text style={styles.date}>{`${formattedYMD}`}</Text>
      </View>

      {appointment.status === "PENDING" && (
        <View style={styles.row}>
          <Text style={styles.patientsBefore}>
            {numberOfPatientsBeforeYou} patients before you
          </Text>
          <Text style={styles.date}>{`${formattedTime}`}</Text>
        </View>
      )}

      <View style={styles.lastRow}>
        <Text style={styles.price}>{price} LE</Text>
        <Text style={styles.time}>{time}</Text>
        {appointment.status === "PENDING" && (
          <TouchableOpacity onPress={handleShare}>
            <Ionicons
              name="notifications-outline"
              size={24}
              color={colors.BlueI}
            />
          </TouchableOpacity>
        )}
      </View>

      {appointment.status === "PENDING" && (
        <TouchableOpacity
          onPress={onPress}
          style={{
            ...styles.button,
            borderColor: mainColor,
            backgroundColor: backgroundColor,
          }}>
          <Text
            style={{
              ...styles.buttonText,
              color: mainColor,
            }}>
            {buttonText}
          </Text>
        </TouchableOpacity>
      )}
      {appointment.status !== "PENDING" && (
        <Text
          style={{
            ...styles.buttonText,
            color: mainColor,
          }}>
          {buttonText}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    justifyContent: "center",
    borderRadius: 8,
    padding: 16,
    backgroundColor: colors.White,
    borderColor: colors.GreyII,
    borderWidth: 0.3,
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
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    color: colors.DarkBlack,
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
    color: colors.DarkBlack,
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
  lastRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
});

export default AppointmentCard;
