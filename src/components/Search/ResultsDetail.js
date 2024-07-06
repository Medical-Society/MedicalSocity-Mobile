import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { colors, responsiveHeight } from "../../../AppStyles";
import FilledStarIcon from "../../../assets/SvgIcons/FilledStarIcon";
const ResultsDetail = ({ doctor }) => {
  const ratingBuilder = (rating) => {
    let ratingArray = [];
    for (let i = 0; i < rating; i++) {
      ratingArray.push(<FilledStarIcon key={i} />);
    }
    return ratingArray;
  };

  let doctorDistance = doctor?.distance ? doctor.distance / 1000 : "Not";

  let doctorDistanceText = "";
  if (doctorDistance !== "Not") {
    doctorDistanceText = doctorDistance.toFixed(2) + " KM away";
  }
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
        <Text style={styles.address}>{doctor.clinicAddress}</Text>
        {doctor.averageReview !== 0 && (
          <View style={styles.rating}>
            {ratingBuilder(doctor.averageReview)}
          </View>
        )}
        {doctorDistanceText !== "" && (
          <Text style={styles.infoText}>{doctorDistanceText}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  info: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.White,
    borderRadius: 10,
    borderColor: colors.GreyII,
    borderWidth: 0.3,
    marginVertical: 5,
    marginBottom: responsiveHeight(10),
    padding: 8,
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
    height: 86,
    width: 62,
    margin: 5,
    borderRadius: 5,
    borderColor: colors.GreyII,
    borderWidth: 1,
  },
  address: {
    fontSize: 14,
    fontFamily: "Cairo-Regular",
    color: colors.DarkBlack,
    marginVertical: 5,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default ResultsDetail;
