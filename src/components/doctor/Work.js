import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { colors } from "../../../AppStyles";

const Album = ({ beforeImage, afterImage }) => {
  return (
    <View style={styles.album}>
      {beforeImage ? (
        <View style={styles.imageContainer}>
          <Image source={{ uri: beforeImage }} style={styles.image} />
        </View>
      ) : null}
      {afterImage ? (
        <View style={styles.imageContainer}>
          <Image source={{ uri: afterImage }} style={styles.image} />
        </View>
      ) : null}
    </View>
  );
};

const Work = ({ beforeImage, afterImage, description }) => {
  return (
    <View>
      <Album beforeImage={beforeImage} afterImage={afterImage} />
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  album: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 5,
  },
  imageContainer: {
    flex: 1,
    marginVertical: 5,
  },
  image: {
    width: "100%",
    height: 260,
  },
  description: {
    marginTop: 6,
    fontSize: 16,
    color: colors.BlueII,
    fontFamily: "Cairo-Regular",
    lineHeight: 24,
  },
  title: {
    fontSize: 18,
    color: colors.BlueI,
    fontFamily: "Cairo-Bold",
    textAlign: "center",
    marginBottom: 10,
  },
});

export default Work;
