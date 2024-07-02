import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { colors, responsiveHeight } from "../../../AppStyles";
const ResultsDetail = ({ doctor }) => {
  return (
    <View style={styles.info}>
      <Image
        source={{
          uri: doctor.avatar,
        }}
        style={styles.image}
      />
      <View style={styles.doctorInfo}>
        <Text style={styles.infoText}>{doctor.englishFullName}</Text>

        <Text style={styles.infoText}>{doctor.price}250 LE</Text>

        <Text style={styles.address}>{doctor.clinicAddress}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  info: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 10,

    borderRadius: 10,
    backgroundColor: colors.White,
    margin: 10,
    padding: 10,
    marginBottom: responsiveHeight(10),
  },

  doctorInfo: {
    flex: 1,
    marginLeft: 10,
  },
  infoText: {
    fontSize: 16,
    fontFamily: "Cairo-Regular",
    color: colors.BlueI,
  },
  image: {
    height: 96,
    width: 72,
  },
  address: {
    fontSize: 14,
    fontFamily: "Cairo-Regular",
    color: colors.BlueI,
  },
});

export default ResultsDetail;
