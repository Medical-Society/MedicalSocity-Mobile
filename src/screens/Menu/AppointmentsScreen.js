import React, { useCallback, useContext, useState } from "react";
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import Header from "../../components/Header";
import AppointmentCard from "../../components/appointment/AppointmentCard";
import SafeFlatListView from "../../components/SafeFlatListView";
import usePaginatedFetch from "../../hooks/usePaginatedFetch";
import { Context as AuthContext } from "../../context/AuthContext";
import { ActivityIndicator } from "react-native-paper";
import LoadingModal from "../../components/LoadingModal";
import MessagesModal from "../../components/MessagesModal";
import ConfirmModal from "../../components/ConfirmModal";
import patientApi from "../../services/patient";
import {
  colors,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "../../../AppStyles";

const AppointmentsScreen = ({ navigation }) => {
  const {
    data: appointments,
    isLoading: fetchingAppointmentsLoading,
    handleLoadMore,
    reFetchData: refreshAppointments,
  } = usePaginatedFetch(
    `https://api.medical-society.fr.to/api/v1/patients/appointments`,
    "appointments"
  );

  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteAppointmentId, setDeleteAppointmentId] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const [selectedState, setSelectedState] = useState("All");
  const [message, setMessage] = useState({
    successMessage: "",
    errorMessage: "",
  });

  const { state } = useContext(AuthContext);
  const { token } = state;

  const cancelAppointment = async () => {
    setIsLoading(true);
    try {
      await patientApi.delete(`/appointments/${deleteAppointmentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage({ successMessage: "Appointment canceled successfully" });
    } catch (error) {
      setMessage({ errorMessage: error.response.data.message });
    }
    setDeleteAppointmentId("");
    setIsLoading(false);
    setModalVisible(false);
  };

  const statusButtons = {
    Finished: "FINISHED",
    Canceled: "CANCELED",
    Pending: "PENDING",
    InProgress: "IN_PROGRESS",
  };

  const capitalizeFirstLetter = (string) => {
    string = string.toLowerCase().replace("_", " ");
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handlePressedButton = (status) => {
    if (status === selectedState) {
      setSelectedState("All");
    } else {
      setSelectedState(status);
    }
  };

  const ListOfStatus = () => {
    return (
      <FlatList
        horizontal
        data={Object.keys(statusButtons)}
        style={styles.statusList}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handlePressedButton(statusButtons[item])}
            style={[
              styles.status,
              selectedState === statusButtons[item] && styles.selectedStatus,
            ]}>
            <Text
              style={[
                styles.textStatus,
                selectedState === statusButtons[item] &&
                  styles.selectedTextStatus,
              ]}>
              {capitalizeFirstLetter(statusButtons[item])}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item}
      />
    );
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      refreshAppointments();
      setRefreshing(false);
    }, 2000);
  }, [refreshAppointments]);

  const goToDoctorProfile = (doctorId) => {
    navigation.navigate("DoctorStack", {
      screen: "Doctor",
      params: { doctorId },
    });
  };

  return (
    <SafeFlatListView
      header={
        <Header
          title="Appointments"
          backButtonHandler={() => navigation.goBack()}
        />
      }
      marginBottom={10}>
      <LoadingModal loading={isLoading} />
      <ConfirmModal
        visibility={modalVisible}
        content={`Are you sure you want to cancel this appointment?`}
        onConfirm={cancelAppointment}
        onCancel={() => setModalVisible(false)}
      />
      <MessagesModal
        successMessage={message.successMessage}
        errorMessage={message.errorMessage}
        clearMessage={() => {
          setMessage({ successMessage: "", errorMessage: "" });
          refreshAppointments();
        }}
      />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <ListOfStatus />
      </View>
      <FlatList
        data={
          selectedState === "All"
            ? appointments
            : appointments.filter(
                (appointment) => appointment.status === selectedState
              )
        }
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <AppointmentCard
            appointment={item}
            onPress={() => {
              setModalVisible(true);
              setDeleteAppointmentId(item._id);
            }}
            goToDoctorProfile={() => goToDoctorProfile(item.doctor._id)}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        keyExtractor={(item) => item._id}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          fetchingAppointmentsLoading && <ActivityIndicator size="large" />
        }
      />
    </SafeFlatListView>
  );
};

const styles = StyleSheet.create({
  statusList: {
    marginVertical: responsiveHeight(20),
  },
  status: {
    paddingHorizontal: responsiveWidth(10),
    paddingVertical: responsiveHeight(10),
    borderRadius: 30,
    marginRight: responsiveWidth(10),
    borderColor: colors.GreyI,
    borderWidth: 1,
  },
  selectedStatus: {
    borderColor: colors.BlueI,
    borderWidth: 1.3,
  },
  textStatus: {
    fontSize: responsiveFontSize(16),
    fontFamily: "Cairo-Regular",
    color: colors.Black,
    textAlign: "center",
  },
  selectedTextStatus: {
    color: colors.BlueI,
    fontSize: responsiveFontSize(16),
  },
});

export default AppointmentsScreen;
