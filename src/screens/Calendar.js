import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import SafeScrollView from "../components/SafeScrollView";
import Header from "../components/Header";
import patientApi from "../services/patient";
import { Context as AuthContext } from "../context/AuthContext";

function convertTimestamp(timestamp) {
  const dt = new Date(timestamp);
  const optionsHour = { hour: "numeric", minute: "numeric", hour12: true };
  const hour = dt.toLocaleTimeString("en-US", optionsHour).toLowerCase();
  const optionsDay = { weekday: "short", day: "numeric" };
  const day = dt.toLocaleDateString("en-US", optionsDay).replace(",", "");

  return {
    hour: hour,
    day: day,
  };
}

const Calendar = ({ navigation }) => {
  const [PendingAppointments, setPendingAppointments] = useState([]);
  const { state } = useContext(AuthContext);
  const { token } = state;

  const fetchAppointments = async () => {
    try {
      const response = await patientApi.get("/appointments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const appointments = response.data.data.appointments;
      setPendingAppointments(
        appointments.filter((appointment) => appointment.status === "PENDING")
      );
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const appointments = PendingAppointments.map((appointment) => {
    const { hour, day } = convertTimestamp(appointment.date);
    return {
      time: hour,
      day: day,
      doctor: appointment.doctor.englishFullName,
    };
  });

  useEffect(() => {
    // when screen us unfocused, and then focused again, fetch appointments
    const unsubscribe = navigation.addListener("focus", () => {
      fetchAppointments();
    });

    return unsubscribe;
  }, [navigation]);
  return (
    <SafeScrollView
      header={<Header title="Calendar" navigation={navigation} />}>
      <View style={styles.scheduleItem}>
        <Text style={styles.title}>Time</Text>
        <Text style={styles.title}>Appointments</Text>
        <Text style={styles.title}>Day</Text>
      </View>

      <View style={styles.scheduleContainer}>
        {appointments.map((item, index) => (
          <View key={index} style={styles.scheduleItem}>
            <Text style={styles.text}>{item.time}</Text>
            <Text style={styles.text}>{item.doctor}</Text>
            <Text style={styles.text}>{item.day}</Text>
          </View>
        ))}
      </View>
    </SafeScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    marginBottom: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },

  day: {
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    marginHorizontal: 4,
  },
  activeDay: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#cce5ff",
  },
  text: {
    fontSize: 16,
    textAlign: "center",
  },
  scheduleContainer: {
    flexDirection: "column",
  },
  scheduleItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  title: {
    fontSize: 18,
    flex: 1,
    fontFamily: "Cairo-Bold",
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    flex: 1,
    fontFamily: "Cairo-Regular",
    textAlign: "center",
  },
});

export default Calendar;
