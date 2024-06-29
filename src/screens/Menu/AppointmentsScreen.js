import React, { useContext, useState } from "react";
import { FlatList } from "react-native";
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
      setMessage({ errorMessage: "An error occurred, please try again" });
    }
    setDeleteAppointmentId("");
    setIsLoading(false);
    setModalVisible(false);
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

      <FlatList
        data={appointments.sort((a, b) => {
          const statusOrder = {
            IN_PROGRESS: 1,
            PENDING: 2,
            FINISHED: 3,
            CANCELED: 4,
          };
          if (statusOrder[a.status] !== statusOrder[b.status]) {
            return statusOrder[a.status] - statusOrder[b.status];
          } else {
            return new Date(b.date) - new Date(a.date);
          }
        })}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <AppointmentCard
            appointment={item}
            onPress={() => {
              setModalVisible(true);
              setDeleteAppointmentId(item._id);
            }}
          />
        )}
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

export default AppointmentsScreen;
