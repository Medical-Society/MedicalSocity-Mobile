import React, { useState, useContext, useMemo, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import {
  responsiveFontSize,
  colors,
  responsiveHeight,
  responsiveWidth,
  convertTo12HourFormat,
} from "../../../AppStyles";
import doctorApi from "../../services/doctor";
import patientApi from "../../services/patient";
import {
  Context as AuthContext,
} from "../../context/AuthContext";
import Header from "../../components/Header";
import Button from "../../components/SubmitButton";
import MessagesModal from "../../components/MessagesModal";
import LoadingModal from "../../components/LoadingModal";
import ConfirmModal from "../../components/ConfirmModal";

const DoctorAppointmentsScreen = ({
  navigation,
  route: {
    params: { doctorId },
  },
}) => {
  const { state } = useContext(AuthContext);
  const { token } = state;
  const [weekDays, setWeekDays] = useState({});
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getDoctorAvailableTime = async () => {
      try {
        const response = await doctorApi.get(`/${doctorId}/available-times`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setWeekDays(response.data.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    getDoctorAvailableTime();
  }, []);

  const keys = useMemo(() => Object.keys(weekDays), [weekDays]);

  const bookAppointment = async (date) => {
    setLoading(true);
    try {
      await patientApi.post(
        "/appointments",
        {
          doctorId,
          date,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccessMessage("Appointment booked successfully!");
    } catch (error) {
      setErrorMessage(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Appointments"
        backButtonHandler={() => navigation.goBack()}
      />
      <View
        style={{
          marginHorizontal: responsiveWidth(20),
        }}>
        <View style={styles.flatList}>
          <Text style={styles.title}>Choose the day of your appointment</Text>
          <FlatList
            data={keys}
            horizontal
            keyExtractor={(item) => item}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => setSelectedDay(item)}
                style={[
                  styles.date,
                  selectedDay === item && styles.selectedDate,
                ]}>
                <Text
                  style={[
                    styles.textDate,
                    selectedDay === item && styles.selectedTextDate,
                  ]}>
                  {item.slice(0, 3)}.
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>

        <MessagesModal
          errorMessage={errorMessage}
          successMessage={successMessage}
          clearMessage={() => {
            setErrorMessage("");
            setSuccessMessage("");
          }}
        />

        <LoadingModal loading={loading} />

        <ConfirmModal
          visibility={modalVisible}
          handleVisibility={() => setModalVisible(false)}
          icon={
            <MaterialIcons
              name="date-range"
              size={responsiveFontSize(50)}
              color={colors.Black}
            />
          }
          content={`The appointment you want to book \n is on ${
            convertTo12HourFormat(selectedTime)[0]
          } ${convertTo12HourFormat(selectedTime)[2]} \n at ${
            convertTo12HourFormat(selectedTime)[1]
          }`}
          onCancel={() => setModalVisible(false)}
          onConfirm={() => {
            bookAppointment(selectedTime);
            setModalVisible(false);
          }}
        />

        <View>
          <Text style={styles.title}>Choose the time of your appointment</Text>
          <FlatList
            data={weekDays[selectedDay]}
            numColumns={4}
            contentContainerStyle={styles.flatListTimes}
            columnWrapperStyle={{
              justifyContent: "space-between",
            }}
            keyExtractor={(item) => item.dateNextWeekDay}
            renderItem={({ item }) => {
              const [convertedDate, convertedTime] = convertTo12HourFormat(
                item.dateNextWeekDay
              );
              return (
                <TouchableOpacity
                  onPress={() => setSelectedTime(item.dateNextWeekDay)}
                  style={[
                    styles.dateTime,
                    selectedTime === item.dateNextWeekDay &&
                      styles.selectedDate,
                  ]}>
                  <Text
                    style={[
                      styles.textDate,
                      selectedTime === item.dateNextWeekDay &&
                        styles.selectedTextDate,
                    ]}>
                    {convertedTime}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
      <View style={styles.bookButton}>
        <Button
          disabled={!selectedTime}
          buttonText="Book Appointment"
          // onPress={}
          onPress={() => setModalVisible(true)}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.White,
  },

  flatList: {
    marginVertical: responsiveHeight(10),
  },
  flatListTimes: {
    justifyContent: "center",
    alignItems: "center",
  },
  date: {
    paddingHorizontal: responsiveWidth(20),
    paddingVertical: responsiveHeight(20),
    borderRadius: 30,
    marginRight: responsiveWidth(10),
    borderColor: colors.GreyI,
    borderWidth: 1,
  },
  selectedDate: {
    borderColor: colors.BlueI,
    borderWidth: 1.3,
  },
  textDate: {
    fontSize: responsiveFontSize(16),
    fontFamily: "Cairo-Regular",
    color: colors.BlueI,
    textAlign: "center",
  },
  selectedTextDate: {
    color: colors.BlueI,
    fontSize: responsiveFontSize(16),
  },
  title: {
    fontFamily: "Cairo-SemiBold",
    fontSize: responsiveFontSize(20),
    color: colors.BlueI,
    marginBottom: responsiveHeight(10),
  },
  dateTime: {
    width: responsiveWidth(90),
    height: responsiveHeight(50),
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.Grey,
    backgroundColor: colors.White,
    justifyContent: "center",
    alignItems: "center",
    margin: responsiveWidth(5),
  },
  bookButton: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: responsiveWidth(20),
  },
});

export default DoctorAppointmentsScreen;