import React, { useState, useEffect, useCallback, useContext } from "react";

import { FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import PrescriptionCard from "../../components/prescription/PrescriptionCard";
import axios from "axios";
import { ActivityIndicator } from "react-native-paper";

import { Context as UserContext } from "../../context/UserContext";
import { Context as AuthContext } from "../../context/AuthContext";

const ReportProblem = ({ navigation }) => {
  const backButtonHandler = () => {
    navigation.goBack();
  };

  const [prescriptions, setPrescriptions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { state: userState } = useContext(UserContext);
  const { state: authState } = useContext(AuthContext);

  const limit = 10;

  useEffect(() => {
    fetchPrescriptions();
  }, [currentPage]);

  const patientId = userState.userData._id;

  const fetchPrescriptions = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://medical-society-official.onrender.com/api/v1/patients/${patientId}/prescriptions/`,
        {
          params: {
            searchTerm: "",
            page: currentPage,
            limit: limit,
          },
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        }
      );
      console.log("Prescriptions: ", response.data.data.prescriptions);
      setPrescriptions((prescriptions) => [
        ...prescriptions,
        ...response.data.data.prescriptions.filter(
          (prescription) =>
            !prescriptions.find(
              (prevPrescription) => prevPrescription._id === prescription._id
            )
        ),
      ]);

      setIsLoading(false);
    } catch (err) {
      console.log(
        "Error fetching prescriptions in ReportProblem.js: ",
        err.response ? err.response.data : err.message
      );
      setIsLoading(false);
    }
  };

  const handleLoadMore = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, totalPages]);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Prescriptions" backButtonHandler={backButtonHandler} />
      <FlatList
        data={prescriptions}
        renderItem={({ item }) => (
          <PrescriptionCard
            prescription={item}
            navigation={navigation}
          />
        )}
        keyExtractor={(item) => item._id}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={isLoading && <ActivityIndicator size="large" />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default ReportProblem;
