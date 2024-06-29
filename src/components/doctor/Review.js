import React, { memo, useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import {
  responsiveFontSize,
  colors,
  responsiveHeight,
  responsiveWidth,
} from "../../../AppStyles";

import { Context as AuthContext } from "../../context/AuthContext";
import FilledStarIcon from "../../../assets/SvgIcons.js/FilledStarIcon";

const Review = memo(({ review: { patient, rating, comment } }) => {
  const [patientName, setPatientName] = useState("Peter");
  const { state } = useContext(AuthContext);
  useEffect(() => {
    setPatientName(patient.patientName);
  }, []);

  const ratingBuilder = (rating) => {
    let ratingArray = [];
    for (let i = 0; i < rating; i++) {
      ratingArray.push(<FilledStarIcon key={i} />);
    }
    return ratingArray;
  };
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.name}>{patientName}</Text>
        <View style={styles.rating}>{ratingBuilder(rating)}</View>
      </View>
      {comment.length > 0 && (
        <View style={styles.reviewContent}>
          <Text style={styles.reviewText}>{comment}</Text>
        </View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 12,
    marginVertical: 6,
  },
  name: {
    fontSize: 20,
    color: colors.BlueI,
    fontFamily: "Cairo-Medium",
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
  },
  reviewContent: {
    marginHorizontal: responsiveWidth(12),
    marginVertical: responsiveHeight(10),
    borderWidth: 1,
    borderColor: colors.Grey,
    borderRadius: 10,
    padding: 10,
  },
  reviewText: {
    fontFamily: "Cairo-Regular",
    fontSize: responsiveFontSize(16),
    color: colors.DarkGrey,
  },
});

export default Review;
