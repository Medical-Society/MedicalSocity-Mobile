import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import Button from "../components/auth/SubmitButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
const Spacer = () => {
  return <View style={{ margin: 10 }} />;
};

const COLORS = {
  primary: "#242760",
  secondary: "#544C4C",
  white: "#FFFFFF",
  black: "#000000",
  gray: "rgba(36, 39, 96, 0.05)",
  secondaryGray: "rgba(84, 76, 76, 0.14)",
};
const { height, width } = Dimensions.get("window");

const SIZES = {
  // global SIZES
  base: 8,
  font: 14,
  radius: 30,
  padding: 10,
  padding2: 12,
  padding3: 16,

  // font sizes
  largeTitle: 50,
  h1: 30,
  h2: 20,
  h3: 18,
  h4: 16,
  body1: 30,
  body2: 20,
  body3: 18,
  body4: 14,
  body5: 12,

  // app dimensions
  width,
  height,
};

const FONTS = {
  largeTitle: {
    fontFamily: "black",
    fontSize: SIZES.largeTitle,
    lineHeight: 55,
  },
  h1: { fontSize: SIZES.h1, lineHeight: 36 },
  h2: { fontSize: SIZES.h2, lineHeight: 30 },
  h3: { fontSize: SIZES.h3, lineHeight: 22 },
  h4: { fontSize: SIZES.h4, lineHeight: 20 },
  body1: { fontSize: SIZES.body1, lineHeight: 36 },
  body2: { fontSize: SIZES.body2, lineHeight: 30 },
  body3: { fontSize: SIZES.body3, lineHeight: 22 },
  body4: { fontSize: SIZES.body4, lineHeight: 20 },
};

const Doctor = ({ navigation, route }) => {
  console.log(route.params.doctor);
  const doctor = route.params.doctor;
  const [selectedDate, setSelectedData] = useState(null);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <View
        style={{
          marginHorizontal: 12,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: "absolute",
            left: 0,
          }}
        >
          <MaterialIcons
            name="keyboard-arrow-left"
            size={24}
            color={COLORS.black}
          />
        </TouchableOpacity>

        <Text style={{ ...FONTS.h3 }}>Doctor</Text>
      </View>
      <ScrollView style={styles.container}>
        <View>
          <View style={styles.info}>
            <Image
              source={{
                uri: doctor.avatar,
              }}
              style={styles.image}
            />
            <View style={styles.doctorInfo}>
              <Text style={styles.infoText}>{doctor.englishFullName}</Text>
              <Text style={styles.infoText}>{doctor.specialization}</Text>
              <Text style={styles.address}>{doctor.clinicAddress}</Text>
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
    </SafeAreaView>
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
    fontSize: 18,
    fontFamily: "Cairo-Regular",
    color: "#060B73",
    marginBottom: 10,
  },
  info: {
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
