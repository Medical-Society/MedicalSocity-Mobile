import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

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
  container: {
    marginLeft: 15,
  },

  info: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "#FFF",
    margin: 10,
    padding: 10,
    marginBottom: 10,
  },

  doctorInfo: {
    marginLeft: 10,
    flex: 1,
  },
  infoText: {
    fontSize: 16,
    fontFamily: "Cairo-Regular",
    color: "#060B73",
  },
  image: {
    height: 96,
    width: 72,
  },
  address: {
    fontSize: 14,
    fontFamily: "Cairo-Regular",
    color: "#060B73",
  },
});

export default ResultsDetail;
