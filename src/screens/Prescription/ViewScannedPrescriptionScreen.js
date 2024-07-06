import React, { useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Share,
} from "react-native";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { colors } from "../../../AppStyles";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Skeleton from "../../components/Skeleton";
import { Context as UserContext } from "../../context/UserContext";
import { Context as AuthContext } from "../../context/AuthContext";
import uuid from "react-native-uuid";
import { AntDesign } from "@expo/vector-icons";

const InfoField = ({ title, value }) => {
  return (
    <View style={styles.infoFiled}>
      <Text style={styles.mainText}>{title}: </Text>
      <Text style={styles.valueText}>{value}</Text>
    </View>
  );
};

const MedicineField = ({ name, nOfTimes, note }) => {
  return (
    <View style={{ flexDirection: "column", marginVertical: 8 }}>
      <Text style={styles.mainText}>{name}</Text>
      <Text style={styles.valueText}>
        {nOfTimes ? nOfTimes : "X times"} a day
      </Text>
    </View>
  );
};

const ViewScannedPrescriptionScreen = ({ prescriptionId, setMode, mode }) => {
  const [prescription, setPrescription] = useState({
    doctorName: "",
    medicines: [],
    diagnose: "",
    diseases: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const { doctorName, medicines, diagnose, diseases } = prescription;

  const { state: authState } = useContext(AuthContext);
  const { state: userState } = useContext(UserContext);
  const patientId = userState.userData._id;

  const token = authState.token;

  useEffect(() => {
    const getScannedPrescriptionById = async (prescriptionId) => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://api.medical-society.fr.to/api/v1/patients/${patientId}/scanned-prescriptions/${prescriptionId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPrescription({
          doctorName: response.data.data.doctorName || "Ai",
          medicines: response.data.data.medicines || [],
          diagnose: response.data.data.diagnose || "No diagnose found",
          diseases: response.data.data.diseases || "No diseases found",
        });
      } catch (error) {
        console.log(
          "Error fetching scanned prescription:",
          error.response.data.message
        );
      } finally {
        setIsLoading(false);
      }
    };
    getScannedPrescriptionById(prescriptionId);
  }, [prescriptionId, patientId, token]);

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `Prescription Details:
          Doctor Name: ${doctorName}
          Diseases: ${diseases}
          Diagnose: ${diagnose}

          Medicines:
          ${medicines.map((medicine) => {
            return `${medicine.name} - ${
              medicine.time ? medicine.time : "X times"
            }\n`;
          })}
Shared From Medical Society App.
You can view them by downloading the Medical Society app.`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          //
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
    <View style={styles.container}>
      {isLoading ? (
        <Skeleton />
      ) : (
        <View style={styles.innerContainer}>
          <InfoField title="Doctor Name" value={doctorName} />
          <InfoField title="Diseases" value={diseases} />
          <InfoField title="Diagnose" value={diagnose} />
          <View
            style={{
              height: 20,
            }}
          />
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: colors.GreyII,
              marginVertical: 10,
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
          {setMode && (
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => setMode("Edit")}>
              <MaterialIcons name="edit" size={30} color={colors.White} />
            </TouchableOpacity>
          )}
        </View>
      )}
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
    left: 0,
    backgroundColor: colors.BlueII,
    padding: 10,
    borderRadius: 50,
  },
});

export default ViewScannedPrescriptionScreen;
