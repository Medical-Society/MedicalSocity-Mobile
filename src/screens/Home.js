import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DoctorCard = ({ doctor, navigation }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("Doctor", { doctor })}
    >
      <Text style={styles.name}>{doctor.name}</Text>
      <Text style={styles.specialty}>{doctor.specialty}</Text>
      <Text style={styles.address}>{doctor.address}</Text>
      <Text style={styles.about}>{doctor.about}</Text>
      <Text style={styles.appointment}>Appointments:</Text>
      <Text style={styles.appointment}>
        Morning: {doctor.appointments.morning}
      </Text>
      <Text style={styles.appointment}>
        Evening: {doctor.appointments.evening}
      </Text>
      <Text style={styles.price}>Price: ${doctor.price}</Text>
    </TouchableOpacity>
  );
};
const Home = ({ navigation }) => {
  const doctor = {
    name: "Dr. Peter Joseph",
    specialty: "Cardiologist",
    address:
      "His Address in details His Address in details His Address in details",
    price: 200,
    about:
      "about about him about him about him about him about him about him about him about him about him about him about him about him him about him about him about him about",
    schedule: [
      {
        id: 1,
        day: "Mon",
        date: "12",
      },
      {
        id: 2,
        day: "Tue",
        date: "13",
      },
      {
        id: 3,
        day: "Wed",
        date: "14",
      },
      {
        id: 4,
        day: "Thu",
        date: "15",
      },
      {
        id: 5,
        day: "Sat",
        date: "17",
      },
      {
        id: 6,
        day: "Sun",
        date: "18",
      },
    ],
    appointments: {
      morning: "9:00 AM - 12:00 PM",
      evening: "5:00 PM - 7:00 PM",
    },
    image: require("../../assets/doctor.png"),
  };
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DoctorCard = ({ doctor, navigation }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("Doctor", { doctor })}
    >
      <Text style={styles.name}>{doctor.name}</Text>
      <Text style={styles.specialty}>{doctor.specialty}</Text>
      <Text style={styles.address}>{doctor.address}</Text>
      <Text style={styles.about}>{doctor.about}</Text>
      <Text style={styles.appointment}>Appointments:</Text>
      <Text style={styles.appointment}>
        Morning: {doctor.appointments.morning}
      </Text>
      <Text style={styles.appointment}>
        Evening: {doctor.appointments.evening}
      </Text>
      <Text style={styles.price}>Price: ${doctor.price}</Text>
    </TouchableOpacity>
  );
};
const Home = ({ navigation }) => {
  const doctor = {
    name: "Dr. Peter Joseph",
    specialty: "Cardiologist",
    address:
      "His Address in details His Address in details His Address in details",
    price: 200,
    about:
      "about about him about him about him about him about him about him about him about him about him about him about him about him him about him about him about him about",
    schedule: [
      {
        id: 1,
        day: "Mon",
        date: "12",
      },
      {
        id: 2,
        day: "Tue",
        date: "13",
      },
      {
        id: 3,
        day: "Wed",
        date: "14",
      },
      {
        id: 4,
        day: "Thu",
        date: "15",
      },
      {
        id: 5,
        day: "Sat",
        date: "17",
      },
      {
        id: 6,
        day: "Sun",
        date: "18",
      },
    ],
    appointments: {
      morning: "9:00 AM - 12:00 PM",
      evening: "5:00 PM - 7:00 PM",
    },
    image: require("../../assets/doctor.png"),
  };
  return (
    <SafeAreaView style={styles.container}>
      <DoctorCard doctor={doctor} navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  specialty: {
    fontSize: 18,
    marginBottom: 10,
  },
  address: {
    fontStyle: "italic",
    marginBottom: 10,
  },
  about: {
    marginBottom: 10,
  },
  schedule: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  appointment: {
    marginLeft: 10,
    marginBottom: 5,
  },
  price: {
    fontWeight: "bold",
    marginTop: 10,
  },
});

export default Home;