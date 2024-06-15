import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const formatDate = (date) => {
  const newDate = new Date(date);
  return `${newDate.getDate()}/${
    newDate.getMonth() + 1
  }/${newDate.getFullYear()}`;
};

const PrescriptionCard = ({ prescription, navigation }) => {
  const date = formatDate(prescription.createdAt);
  const doctorName = prescription.doctor.englishFullName;
  const specialization = prescription.doctor.specialization;
  const address = prescription.doctor.clinicAddress;
  const price = prescription?.price || 150;
  const medicines = prescription.medicines;
  const diseases = prescription.diseases;
  const diagnose = prescription.diagnose;
  const ToViewPrescription = {
    medicines,
    diseases,
    diagnose,
    doctorName,
  };

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      activeOpacity={0.7}
      onPress={() =>
        navigation.navigate("ViewPrescription", {
          prescription: ToViewPrescription,
        })
      }>
      <View style={styles.card}>
        <Text style={styles.date}>{date}</Text>
        <View style={styles.rowOne}>
          <Text style={styles.name}>{doctorName}</Text>
          <Text style={styles.specialization}>{specialization}</Text>
        </View>
        <View style={styles.rowOne}>
          <Text style={styles.address}>
            {address.length > 30 ? `${address.substring(0, 30)}...` : address}
          </Text>
          <Text style={styles.address}>{`${price} EGP`}</Text>
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
    marginHorizontal: 24,
  },
  card: {
    justifyContent: "center",
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    padding: 16,
    backgroundColor: "#fff",
    borderColor: "#060B73",
    borderWidth: 0.5,
    shadowColor: "#000",
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
    color: "#060B73",
    fontFamily: "Cairo-Medium",
  },
  date: {
    fontSize: 16,
    marginBottom: 6,
    alignSelf: "flex-end",
    color: "#AEAEAE",
    fontFamily: "Cairo-Regular",
  },
  address: {
    fontSize: 16,
    marginBottom: 6,
    color: "#7B7B7B",
    fontFamily: "Cairo-Regular",
  },
  specialization: {
    fontSize: 16,
    color: "#060B73",
    fontFamily: "Cairo-Medium",
  },
  goToButton: {
    width: "100%",
    height: 40,
    backgroundColor: "#060B73",
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
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    alignSelf: "center",
    lineHeight: 40,
    fontFamily: "Cairo-Regular",
  },
});

export default PrescriptionCard;
