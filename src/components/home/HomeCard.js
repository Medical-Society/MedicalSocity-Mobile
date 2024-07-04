import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { responsiveFontSize } from "../../../AppStyles";
import { Image } from "expo-image";
import { blurhash } from "../../../AppStyles";

const { width } = Dimensions.get("window");

const HomeCard = ({ feature, onPress, svgIcon }) => {
  const handlePress = () => {
    if (onPress) {
      onPress();
    }
  };

  return (
    <View
      style={[
        styles.homeCard,
        {
          backgroundColor: feature.bgColor,
          flexDirection: feature.reverse ? "row-reverse" : "row",
        },
      ]}>
      <View style={styles.cardCol}>
        <Text style={styles.cardTitle}>{feature.title}</Text>
        <Text style={styles.cardText}>{feature.text}</Text>
        <TouchableOpacity
          style={styles.cardButton}
          title={feature.button}
          onPress={handlePress}>
          <Text style={{ color: "white" }}>{feature.button}</Text>
        </TouchableOpacity>
      </View>
      <View
        style={[
          styles.imgBack,
          {
            borderRadius: feature.image ? 10 : 50,
          },
        ]}>
        {feature.image ? (
          <Image
            source={feature.image}
            style={styles.image}
            placeholder={{ blurhash }}
            transition={500}
            contentFit="contain"
          />
        ) : (
          svgIcon
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  homeCard: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: "center",
    alignItems: "center",
  },
  cardCol: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    width: "60%", // Adjusted to better fit the layout
    flex: 1,
  },
  cardTitle: {
    fontSize: responsiveFontSize(14), // Adjusted for responsiveness
    fontFamily: "Cairo-Medium",
    color: "white",
    textAlign: "center",
    marginBottom: 5,
  },
  cardText: {
    textAlign: "center",
    fontSize: responsiveFontSize(14), // Adjusted for responsiveness
    fontFamily: "Cairo-Light",
    color: "white",
    marginBottom: 10,
  },
  cardButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    width: "80%",
    borderRadius: 10, // Reduced border radius for a more subtle button shape
    backgroundColor: "rgba(255, 255, 255, 0.10)",
  },
  imgBack: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(245, 245, 245, 0.10)",
    borderRadius: 10,
    marginHorizontal: 10,
    width: width * 0.29, // Smaller width for the image container
    height: width * 0.29, // Smaller height for the image container
  },
  image: {
    width: "100%",
    height: "100%",

    borderRadius: 10,
  },
});

export default HomeCard;
