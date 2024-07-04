import React from "react";
import { View, Text, StyleSheet } from "react-native";
import SafeScrollView from "../../components/SafeScrollView";
import Header from "../../components/Header";
import { Image } from "expo-image";
import { blurhash } from "../../../AppStyles";

const AboutUs = ({ navigation }) => {
  return (
    <SafeScrollView
      header={
        <Header title="About Us" backButtonHandler={navigation.goBack} />
      }>
      <View style={styles.container}>
        <Image
          source={require("../../../assets/aboutUs.png")}
          style={styles.image}
          placeholder={{ blurhash }}
          transition={500}
          contentFit="contain"
        />
        <Text style={styles.text}>
          Our system transforms your medical experience by offering effortless
          online booking for doctor appointments, real-time tracking of vital
          signs like heart rate and oxygen pulse, convenient digitization of
          prescriptions, a personalized calendar for managing medications and
          appointments, seamless communication with your doctors, and an AI
          chatbot that provides instant answers to your health-related
          questions. This integrated platform not only streamlines scheduling
          and health monitoring but also facilitates direct interaction with
          healthcare providers and ensures immediate access to reliable medical
          guidance whenever you need it.
        </Text>
      </View>
    </SafeScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 20,
  },
  text: {
    width: "100%",
    fontSize: 16,
    fontFamily: "Cairo-Regular",
    textAlign: "justify",
  },
});

export default AboutUs;
