import React, { memo, useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import {
  responsiveFontSize,
  colors,
  responsiveHeight,
  responsiveWidth,
} from "../../../AppStyles";
import SvgIconBuilder from "../SvgIconBuilder";
import { Path } from "react-native-svg";

import { Context as AuthContext } from "../../context/AuthContext";

const FilledStarIcon = (props) => (
  <SvgIconBuilder {...props} width={25} height={25}>
    <Path
      d="M10 13.904l-3.053 2.332a.468.468 0 01-.325.102.66.66 0 01-.304-.103.485.485 0 01-.214-.581l1.169-3.814-2.96-2.132a.464.464 0 01-.209-.272.517.517 0 01.008-.317c.039-.1.1-.187.184-.26a.46.46 0 01.313-.109h3.696l1.19-3.942a.529.529 0 01.506-.39.529.529 0 01.506.39l1.189 3.942h3.696a.46.46 0 01.313.11.66.66 0 01.184.259c.036.1.038.206.008.317a.47.47 0 01-.204.272l-2.965 2.132 1.168 3.814a.485.485 0 01-.213.581.66.66 0 01-.304.104.45.45 0 01-.32-.103l-3.058-2.332z"
      fill="#6231cc"
    />
  </SvgIconBuilder>
);

const Review = memo(({ review: { patient, rating, comment } }) => {
  const [patientName, setPatientName] = useState("Peter");
  const { state } = useContext(AuthContext);
  console.log("rating", rating);

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
