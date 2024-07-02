import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { colors } from "../../../AppStyles";
import { responsiveFontSize } from "../../../AppStyles";
const DoctorCircle = ({ doctor, navigation }) => {
  const styles = StyleSheet.create({
    doctorCircle: {
      justifyContent: "center",
      alignItems: "center",
      margin: 10,
    },
    image: {
      width: 85,
      height: 85,
      borderRadius: 100,
    },
    name: {
      fontSize: responsiveFontSize(16),
      color: colors.BlueII,
      fontFamily: "Cairo-Regular",
    },
    specialty: {
      fontSize: responsiveFontSize(14),
      marginBottom: 10,
      fontFamily: "Cairo-Regular",
      color: colors.GreyI,
    },
  });

  return (
    <View>
      <TouchableOpacity
        style={styles.doctorCircle}
        onPress={() => navigation.navigate("Doctor", { doctor })}>
        <Image source={doctor.image} style={styles.image} />
        <Text style={styles.name}>{doctor.name}</Text>
        <Text style={styles.specialty}>{doctor.specialty}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DoctorCircle;
