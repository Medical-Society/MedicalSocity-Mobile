import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Button from "../components/auth/SubmitButton";

const Spacer = () => {
  return <View style={{ margin: 10 }} />;
};

const Doctor = ({ navigation, route }) => {
  const doctor = route.params.doctor;
  const [selectedDate, setSelectedData] = useState(null);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: doctor.name,
      headerTitleAlign: "center",
      //   screen background color white
    });
  }, [doctor, navigation]);

  return (
    <ScrollView style={styles.container}>
      <View>
        <View style={styles.left}>
          <Image source={doctor.image} style={styles.image} />
          <View style={styles.doctorInfo}>
            <Text style={styles.infoText}>{doctor.name}</Text>

            <Text style={styles.infoText}>{doctor.price}LE</Text>

            <Text style={styles.address}>{doctor.address}</Text>
          </View>
        </View>
        <Spacer />
        <Spacer />
        <View>
          <Text style={styles.title}>About</Text>
          <Text style={styles.about}>{doctor.about}</Text>

          <Button
            buttonText="Reviews"
            onPress={() => navigation.navigate("Reviews", { doctor })}
            color="white"
          />
          <Button
            buttonText="Latest Work"
            onPress={() => navigation.navigate("LatestWork", { doctor })}
          />
        </View>
        <Spacer />
        <View style={styles.schedule}>
          <Text style={styles.title}>Schedule</Text>
          <FlatList
            data={doctor.schedule}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={
                  selectedDate?.id === item.id
                    ? { ...styles.date, ...styles.selectedDate }
                    : styles.date
                }
                onPress={() => setSelectedData(item)}
              >
                <Text>{item.day}</Text>
                <Text>{item.date}</Text>
              </TouchableOpacity>
            )}
            showsHorizontalScrollIndicator={false}
            horizontal
          />
          <Spacer />
          <Button
            buttonText="Book Appointment"
            onPress={() => console.log("Booked")}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  doctorInfo: {
    marginLeft: 10,
  },
  infoText: {
    fontSize: 16,
    fontFamily: "Cairo-Regular",
    color: "#060B73",
    marginBottom: 10,
  },
  left: {
    flexDirection: "row",
    marginTop: 20,
  },
  image: {
    height: 96,
    width: 72,
  },
  date: {
    padding: 13,
    paddingVertical: 20,
    borderRadius: 30,
    marginRight: 10,
    borderColor: "#7B7B7B",
    borderWidth: 1,
  },
  selectedDate: {
    borderColor: "#060B73",
    borderWidth: 2,
  },
  title: {
    fontFamily: "Cairo-Bold",
    fontSize: 17,
    color: "#060B73",
    marginBottom: 5,
  },
  about: {
    fontFamily: "Cairo-Regular",
    fontSize: 14,
    color: "#7B7B7B",
    lineHeight: 20,
  },
});

export default Doctor;
