import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../../../AppStyles";
import { responsiveFontSize } from "../../../AppStyles";
import { Image } from "expo-image";
import { blurhash } from "../../../AppStyles";
const DoctorCircle = ({ doctor, navigation }) => {
  const styles = StyleSheet.create({
    doctorCircle: {
      justifyContent: "center",
      alignItems: "center",
      marginHorizontal: 10,
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
        onPress={() =>
          navigation.navigate("DoctorStack", {
            screen: "Doctor",
            params: { doctorId: doctor?._id },
          })
        }>
        <Image
          source={doctor?.avatar}
          style={styles.image}
          placeholder={{ blurhash }}
          transition={500}
        />
        <Text style={styles.name}>{doctor?.englishFullName}</Text>
        <Text style={styles.specialty}>{doctor?.specialization}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DoctorCircle;
