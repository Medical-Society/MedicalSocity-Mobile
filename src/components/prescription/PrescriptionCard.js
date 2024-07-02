import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors, formattedDYM } from "../../../AppStyles";

const PrescriptionCard = ({ prescription, handlePressedPrescription }) => {
  const date = formattedDYM(prescription?.createdAt);
  const doctorName = prescription?.doctor?.englishFullName || "Dr. Unknown";
  const specialization = prescription?.doctor?.specialization || "Unknown";
  const address = prescription?.doctor?.clinicAddress || "Unknown";

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      activeOpacity={0.7}
      onPress={handlePressedPrescription}>
      <View style={styles.card}>
        <Text style={styles.date}>{date}</Text>
        <View style={styles.rowOne}>
          <Text style={styles.name}>Dr/ {doctorName}</Text>
          <Text style={styles.specialization}>{specialization}</Text>
        </View>
        <View style={styles.rowOne}>
          <Text style={styles.address}>
            {address?.length > 30 ? `${address?.substring(0, 30)}...` : address}
          </Text>
        </View>
      </View>
      <View style={styles.goToButton}>
        <Text style={styles.goToText}>View Details</Text>
        <MaterialIcons
          style={styles.icon}
          name="chevron-right"
          size={30}
          color="white"
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginTop: 18,
  },
  card: {
    justifyContent: "center",
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    padding: 16,
    backgroundColor: colors.White,
    borderColor: colors.BlueI,
    borderWidth: 0.5,
    shadowColor: colors.Black,
    elevation: 3,
  },
  rowOne: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  name: {
    fontSize: 18,
    marginBottom: 6,
    color: colors.BlueI,
    fontFamily: "Cairo-Medium",
  },
  date: {
    fontSize: 16,
    marginBottom: 6,
    alignSelf: "flex-end",
    color: colors.GreyII,
    fontFamily: "Cairo-Regular",
  },
  address: {
    fontSize: 16,
    marginBottom: 6,
    color: colors.GreyI,
    fontFamily: "Cairo-Regular",
  },
  specialization: {
    fontSize: 16,
    color: colors.BlueI,
    fontFamily: "Cairo-Medium",
  },
  goToButton: {
    width: "100%",
    height: 40,
    backgroundColor: colors.BlueI,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  icon: {
    alignSelf: "center",
  },
  goToText: {
    color: colors.White,
    textAlign: "center",
    fontSize: 18,
    alignSelf: "center",
    lineHeight: 40,
    fontFamily: "Cairo-Regular",
  },
});

export default PrescriptionCard;
