import React, { useCallback } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Share,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { colors } from "../../../AppStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import Skeleton from "../../components/Skeleton";
import { Context as UserContext } from "../../context/UserContext";
import { Context as AuthContext } from "../../context/AuthContext";
import Header from "../../components/Header";
import InfoField from "../../components/prescription/InfoField";
import MedicineField from "../../components/prescription/MedicineField";
import uuid from "react-native-uuid";
import { AntDesign } from "@expo/vector-icons";

const ViewPrescriptionScreen = ({ navigation, route }) => {
  const [prescription, setPrescription] = useState({
    doctorName: "",
    medicines: [],
    diagnose: "",
    diseases: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const { doctorName, medicines, diagnose, diseases } = prescription;

  const { state: userState } = useContext(UserContext);
  const { state: authState } = useContext(AuthContext);

  const patientId = userState.userData._id;
  const token = authState.token;

  useEffect(() => {
    getPrescriptionById(route.params.prescriptionId);
  }, [getPrescriptionById, route.params.prescriptionId]);

  const getPrescriptionById = useCallback(
    async (prescriptionId) => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://api.medical-society.fr.to/api/v1/patients/${patientId}/prescriptions/${prescriptionId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setPrescription({
          doctorName:
            response.data.data?.doctor?.englishFullName || "MSS Doctor",
          ...response.data.data,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    },
    [patientId, token]
  );

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `Prescription Details:
        Doctor Name: ${doctorName}
        Diseases: ${diseases}
        Diagnose: ${diagnose}

        Medicines:
        ${medicines.map((medicine) => {
          return `${medicine.name} - ${medicine.time}\n`;
        })}
Shared From Medical Society App.
You can view them by downloading the Medical Society app.`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Prescription"
        backButtonHandler={() => navigation.goBack()}
      />
      {isLoading ? (
        <Skeleton />
      ) : (
        <View style={styles.innerContainer}>
          <InfoField title="Doctor Name" value={doctorName} />
          <InfoField title="Diseases" value={diseases} />
          <InfoField title="Diagnose" value={diagnose} />
          <View
            style={{
              height: 10,
            }}
          />
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: colors.GreyII,
              marginTop: 10,
              marginBottom: 20,
            }}
          />
          <FlatList
            data={medicines}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => `${item.name} + ${uuid.v4()}`}
            renderItem={({ item }) => (
              <MedicineField name={item.name} nOfTimes={item.time} />
            )}
          />

          <TouchableOpacity
            onPress={handleShare}
            style={{
              position: "absolute",
              bottom: 10,
              right: 10,
            }}>
            <AntDesign name="sharealt" size={35} color="#1A4992" />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    marginHorizontal: 12,
  },
  backButton: {
    position: "absolute",
    left: 0,
  },
  infoFiled: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
  },
  mainText: {
    fontSize: 20,
    color: colors.BlueI,
    fontFamily: "Cairo-Medium",
  },
  valueText: {
    fontSize: 18,
    color: colors.GreyI,
    fontFamily: "Cairo-Medium",
  },
  editButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: colors.BlueII,
    padding: 10,
    borderRadius: 50,
  },
});

export default ViewPrescriptionScreen;
