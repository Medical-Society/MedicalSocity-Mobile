import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { responsiveFontSize } from "../../../AppStyles";

const HomeCard = ({ feature, onPress }) => {
  const handlePress = () => {
    if (onPress) {
      onPress();
    }
  };

  return (
    <View style={[styles.homeCard, { backgroundColor: feature.bgColor }]}>
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
      <View style={styles.imgBack}>
        <Image source={feature.image} style={styles.image} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  homeCard: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 30,
    borderRadius: 10,
    flex: 1,
    marginBottom: 10,
  },
  cardCol: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    width: "70%",
  },
  cardTitle: {
    fontSize: responsiveFontSize(14),
    fontFamily: "Cairo-Medium",
    color: "white",
    textAlign: "center",
  },
  cardText: {
    textAlign: "center",
    fontSize: responsiveFontSize(14),
    fontFamily: "Cairo-Light",
    color: "white",
    marginBottom: 10,
  },
  cardButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    width: "90%",
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.10)",
  },
  imgBack: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(245, 245, 245, 0.10)",
    borderRadius: 10,
    marginRight: 10,
    width: 100,
    height: 100,
  },
  image: {
    borderRadius: 10,
  },
});

export default HomeCard;
