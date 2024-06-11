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
import Button from "../../components/SubmitButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import Skeleton from "../../components/Skeleton";
import {
  colors,
  mergeSameDays,
  removeMinute,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "../../../AppStyles";
import doctorApi from "../../api/doctor";
import Header from "../../components/Header";
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
    availableTime: {},
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
  }, []);

  useEffect(() => {
    const doctorWeekdays = { ...doctor.availableTime.weekdays };
    const removedMinutes = removeMinute(doctorWeekdays);
    const mergeSameTimeDays = mergeSameDays(removedMinutes);
    console.log(mergeSameTimeDays);
    setWeekdays(mergeSameTimeDays);
  }, [doctor]);

  const ListOfDays = () => {
    const weekDaysArray = Object.keys(weekdays);
    const weekDaysArrayValues = Object.values(weekdays);
    console.log("weekDaysArray", weekDaysArray);
    console.log("weekDaysArrayValues", weekDaysArrayValues);

    const convertHourTo12 = (hour) => {
      if (hour > 12) {
        return `${hour - 12} PM`;
      } else if (hour === 12) {
        return `${hour} PM`;
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

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Doctor" backButtonHandler={() => navigation.goBack()} />
      {loading ? (
        <Skeleton />
      ) : (
        <View style={styles.scrollViewContainer}>
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
          <View>
            <Text style={styles.title}>About</Text>
            <Text style={styles.about}>{doctor.about}</Text>
            <Button
              buttonText="Reviews"
              onPress={() => navigation.navigate("Reviews", { doctorId })}
              color="white"
            />
            <Button
              buttonText="Latest Work"
              onPress={() => navigation.navigate("LatestWork", { doctor })}
            />
          </View>
          <Spacer />

          <View style={styles.schedule}>
            <Text style={styles.title}>Doctor's Schedule</Text>

            <ListOfDays />
            <View style={styles.bookButton}>
              <Button
                buttonText="Book Appointment"
                onPress={() =>
                  navigation.navigate("Appointments", { doctorId })
                }
              />
            </View>
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
    backgroundColor: "#fff",
  },
  scrollViewContainer: {
    flex: 1,
    paddingHorizontal: responsiveWidth(20),
  },
  doctorInfo: {
    marginLeft: responsiveWidth(10),
  },
  header: {
    marginHorizontal: responsiveWidth(12),
    marginVertical: responsiveHeight(10),
    flexDirection: "row",
    justifyContent: "center",
  },
  headerTitle: {
    fontFamily: "Cairo-SemiBold",
    fontSize: responsiveFontSize(24),
    color: colors.BlueI,
  },
  iconButton: {
    position: "absolute",
    left: responsiveWidth(0),
  },
  infoText: {
    fontSize: responsiveFontSize(18),
    fontFamily: "Cairo-Regular",
    color: colors.BlueI,
    marginBottom: responsiveHeight(10),
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
    fontFamily: "Cairo-SemiBold",
    fontSize: 24,
    color: "#060B73",
    marginBottom: 5,
  },
  about: {
    fontFamily: "Cairo-Regular",
    fontSize: 18,
    color: "#7B7B7B",
    lineHeight: 20,
  },
  address: {
    fontSize: responsiveFontSize(14),
    fontFamily: "Cairo-Regular",
    color: colors.DarkGrey,
  },
  schedule: {
    flex: 1,
  },
  dayText: {
    fontFamily: "Cairo-SemiBold",
    fontSize: 20,
    color: colors.DarkGrey,
  },
  dayTimeText: {
    fontFamily: "Cairo-Regular",
    fontSize: 18,
    color: colors.DarkGrey,
    marginLeft: 10,
  },
});

export default DoctorScreen;
