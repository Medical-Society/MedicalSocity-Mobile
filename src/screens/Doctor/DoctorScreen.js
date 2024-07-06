import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  Linking,
  TouchableOpacity,
  Platform,
} from "react-native";
import Button from "../../components/SubmitButton";
import * as Device from "expo-device";
import * as Location from "expo-location";
import { SafeAreaView } from "react-native-safe-area-context";
import Skeleton from "../../components/Skeleton";
import Entypo from "@expo/vector-icons/Entypo";

import {
  blurhash,
  colors,
  mergeSameDays,
  removeMinute,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "../../../AppStyles";
import doctorApi from "../../services/doctor";
import Header from "../../components/Header";
import { Image } from "expo-image";
const Spacer = () => {
  return <View style={{ margin: 10 }} />;
};

const DoctorScreen = ({ navigation, route }) => {
  const doctorId = route.params.doctorId;
  const [loading, setLoading] = useState(true);

  const [doctor, setDoctor] = useState({
    _id: "",
    name: "",
    email: "",
    specialization: "",
    clinicAddress: "",
    nationalID: "",
    phoneNumber: "",
    birthdate: "",
    gender: "",
    status: "",
    avatar: "",
    about: "",
    price: 0,
    availableTime: {},
    location: {},
  });
  const [weekdays, setWeekdays] = useState([]);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await doctorApi.get(`/${doctorId}`);
        setDoctor(response.data.data.doctor);
        setLoading(false);
      } catch (err) {
        console.log(err.response);
      }
    };
    fetchDoctor();
  }, [doctorId]);

  useEffect(() => {
    const doctorWeekdays = { ...doctor?.availableTime.weekdays };
    const removedMinutes = removeMinute(doctorWeekdays);
    const mergeSameTimeDays = mergeSameDays(removedMinutes);
    setWeekdays(mergeSameTimeDays);
  }, [doctor]);

  const ListOfDays = () => {
    const weekDaysArray = Object.keys(weekdays);
    const weekDaysArrayValues = Object.values(weekdays);

    const convertHourTo12 = (hour) => {
      if (hour === 0) {
        return "12 AM";
      } else if (hour === 12) {
        return "12 PM";
      } else if (hour > 12) {
        return `${hour - 12} PM`;
      } else {
        return `${hour} AM`;
      }
    };

    return (
      <FlatList
        data={weekDaysArray}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item}
        renderItem={({ item, index }) => {
          return (
            <View>
              <Text style={styles.dayText}>{item}</Text>
              <Text style={styles.dayTimeText}>
                {`\u2022 From: ${convertHourTo12(
                  weekDaysArrayValues[index].from.hour
                )}`}
              </Text>
              <Text style={styles.dayTimeText}>
                {`\u2022 To: ${convertHourTo12(
                  weekDaysArrayValues[index].to.hour
                )}`}
              </Text>
            </View>
          );
        }}
      />
    );
  };

  const getUriOfLocation = () => {
    const location = doctor?.location;
    const lat = location?.coordinates[1];
    const long = location?.coordinates[0];
    const scheme = Platform.select({
      ios: "maps://0,0?q=",
      android: "geo:0,0?q=",
    });
    const latlong = `${lat},${long}`;
    const label = "Doctor Location";

    const url = Platform.select({
      ios: `${scheme}${label}@${latlong}`,
      android: `${scheme}${latlong}(${label})`,
    });
    return url;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Doctor" backButtonHandler={() => navigation.goBack()} />
      {loading ? (
        <Skeleton />
      ) : (
        <View style={styles.scrollViewContainer}>
          <View style={styles.info}>
            <Image
              source={doctor?.avatar}
              style={styles.image}
              placeholder={{ blurhash }}
              transition={500}
            />

            <Spacer />
            <View style={styles.doctorInfo}>
              <View style={styles.mainInfo}>
                <View style={styles.leftInfo}>
                  <Text style={styles.infoText}>{doctor?.englishFullName}</Text>
                  <Text style={styles.specialization}>
                    {doctor?.specialization}
                  </Text>
                </View>
                <View style={styles.rightInfo}>
                  <TouchableOpacity
                    onPress={() => Linking.openURL(getUriOfLocation())}>
                    <Entypo name="location" size={24} color={colors.BlueI} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.oneRow}>
                <Text style={{ ...styles.infoText, flex: 1 }}>
                  {doctor?.clinicAddress}
                </Text>
                <Text style={{ ...styles.infoText, flex: 1 / 3 }}>
                  {doctor?.availableTime.price} LE
                </Text>
              </View>
            </View>
          </View>
          <Spacer />
          <View>
            <Button
              buttonText="Reviews"
              onPress={() => navigation.navigate("Reviews", { doctorId })}
              color="white"
            />
            <Button
              buttonText="Latest Work"
              onPress={() => navigation.navigate("LatestWork", { doctorId })}
            />
          </View>
          <Spacer />

          <View style={styles.schedule}>
            <Text style={styles.title}>Doctor's Schedule</Text>

            <ListOfDays />
            <Button
              buttonText="Book Appointment"
              onPress={() =>
                navigation.navigate("DoctorAppointments", { doctorId })
              }
            />
            <Spacer />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.White,
    paddingHorizontal: responsiveWidth(20),
  },
  scrollViewContainer: {
    flex: 1,
    marginTop: responsiveHeight(10),
  },
  doctorInfo: {
    marginLeft: responsiveWidth(10),
    flex: 1,
    marginHorizontal: responsiveWidth(10),
  },
  infoText: {
    fontSize: responsiveFontSize(18),
    fontFamily: "Cairo-Regular",
    color: colors.BlueI,
    lineHeight: 34,
  },
  specialization: {
    fontSize: responsiveFontSize(16),
    fontFamily: "Cairo-Regular",
    color: colors.DarkGrey,
    marginBottom: responsiveHeight(10),
  },
  info: {
    flexDirection: "row",
  },
  image: {
    height: responsiveHeight(96),
    width: responsiveHeight(72),
    borderRadius: 5,
    borderColor: colors.GreyII,
    borderWidth: 1,
  },
  title: {
    fontFamily: "Cairo-SemiBold",
    fontSize: responsiveFontSize(18),
    color: colors.BlueI,
    marginBottom: 5,
  },
  schedule: {
    flex: 1,
  },
  dayText: {
    fontFamily: "Cairo-SemiBold",
    fontSize: responsiveFontSize(16),
    color: colors.DarkGrey,
  },
  dayTimeText: {
    fontFamily: "Cairo-Regular",
    fontSize: responsiveFontSize(16),
    color: colors.DarkGrey,
    marginLeft: 10,
  },
  oneRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  mainInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftInfo: {
    flex: 1,
  },
  rightInfo: {
    flex: 1 / 3,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default DoctorScreen;
