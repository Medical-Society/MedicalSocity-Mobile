import React, { useState, useEffect, useCallback, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Platform,
  VirtualizedList,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import Skeleton from "../../components/Skeleton";
import { Context as UserContext } from "../../context/UserContext";
import { Context as AuthContext } from "../../context/AuthContext";
import SubmitButton from "../../components/SubmitButton";
import axios from "axios";
import uuid from "react-native-uuid";

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
  small: 4,
  base: 8,
  font: 14,
  radius: 30,
  padding: 10,
  padding2: 12,
  padding3: 16,
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
  width,
  height,
};

const FONTS = {
  largeTitle: {
    fontFamily: "Cairo-Regular",
    fontSize: SIZES.largeTitle,
    lineHeight: 55,
  },
  h1: { fontSize: SIZES.h1, lineHeight: 36, fontFamily: "Cairo-Regular" },
  h2: { fontSize: SIZES.h2, lineHeight: 30, fontFamily: "Cairo-Regular" },
  h3: { fontSize: SIZES.h3, lineHeight: 22, fontFamily: "Cairo-Regular" },
  h4: { fontSize: SIZES.h4, lineHeight: 20, fontFamily: "Cairo-Regular" },
  body1: { fontSize: SIZES.body1, lineHeight: 36, fontFamily: "Cairo-Regular" },
  body2: { fontSize: SIZES.body2, lineHeight: 30, fontFamily: "Cairo-Regular" },
  body3: { fontSize: SIZES.body3, lineHeight: 22, fontFamily: "Cairo-Regular" },
  body4: { fontSize: SIZES.body4, lineHeight: 20, fontFamily: "Cairo-Regular" },
};

const MedicineFields = ({
  name,
  id,
  time,
  handleChange,
  handleDelete,
  idx,
}) => {
  console.log("id", id);
  return (
    <View style={styles.medicineField}>
      <Text style={styles.headerText}>Medicine {idx + 1}</Text>
      <TextInput
        style={styles.input}
        placeholder="Medicine Name"
        value={name}
        onChangeText={(text) => handleChange(id, "name", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Number of Times"
        value={time}
        onChangeText={(text) => handleChange(id, "time", text)}
      />
      <TouchableOpacity
        onPress={() => handleDelete(id)}
        style={{ position: "absolute", right: 0, top: 0 }}>
        <MaterialIcons name="delete" size={24} color={COLORS.primary} />
      </TouchableOpacity>
    </View>
  );
};

const EditScannedPrescriptionScreen = ({ prescriptionId, setMode }) => {
  const prescription = {
    doctorName: "",
    medicines: [],
    diagnose: "",
    diseases: "",
  };

  useEffect(() => {
    getScannedPrescriptionById(prescriptionId);
  }, [getScannedPrescriptionById, prescriptionId]);

  const [localData, setLocalData] = useState(prescription);
  const [isLoading, setIsLoading] = useState(true);
  const { state: authState } = useContext(AuthContext);
  const { state: userState } = useContext(UserContext);
  const patientId = userState.userData._id;
  const token = authState.token;

  const getScannedPrescriptionById = useCallback(
    async (prescriptionId) => {
      console.log("prescriptionId", prescriptionId);
      console.log("patientId", patientId);
      console.log("token", token);
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
        setLocalData({
          doctorName: response.data.data.doctorName,
          medicines: response.data.data.medicines.map((medicine) => ({
            ...medicine,
            _id: uuid.v4(),
          })),
          patientName: response.data.data.patientName,
        });
      } catch (error) {
        console.log("Error fetching scanned prescription:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [patientId, token]
  );

  const handleDelete = useCallback(
    (id) => {
      console.log("id", id);
      const newMedicines = localData.medicines.filter(
        (medicine) => medicine._id !== id
      );
      setLocalData({ ...localData, medicines: newMedicines });
    },
    [localData]
  );

  const handleChange = useCallback(
    (id, field, value) => {
      console.log("id", id, "field", field, "value", value);
      const newMedicines = localData.medicines.map((medicine) => {
        if (medicine._id === id) {
          return { ...medicine, [field]: value };
        }
        return medicine;
      });
      setLocalData({ ...localData, medicines: newMedicines });
    },
    [localData]
  );

  const patchPrescription = async (newPrescription, callback) => {
    console.log("newPrescription", newPrescription);
    console.log("token", token);
    console.log("patientId", patientId);
    try {
      const response = await axios.patch(
        `https://api.medical-society.fr.to/api/v1/patients/${patientId}/scanned-prescriptions/${prescriptionId}`,
        {
          patientName: newPrescription.patientName,
          doctorName: newPrescription.doctorName,
          medicines: newPrescription.medicines,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (callback) callback();
      console.log("response", response.data);
    } catch (error) {
      console.log(
        "Error updating prescription:",

        error.response.data
      );
    }
  };

  const addDrug = () => {
    const newMedicines = [
      ...localData.medicines,
      {
        name: "",
        _id: uuid.v4(),
        time: "",
      },
    ];
    setLocalData({ ...localData, medicines: newMedicines });
  };

  const handleSubmit = () => {
    // const newMedicines = localData.medicines.filter(
    //   (medicine) => medicine.name !== ""
    // );
    // const
    // create new prescription object without id field for each medicine and remove empty medicines
    const newMedicines = localData.medicines.filter(
      (medicine) => medicine.name !== ""
    );
    const newPrescription = {
      ...localData,
      medicines: newMedicines.map(({ _id, ...rest }) => rest),
    };
    patchPrescription(newPrescription, setMode("view"));
  };

  const renderItem = useCallback(
    ({ item, index }) => {
      console.log("item", item, "index", index);
      return (
        <MedicineFields
          name={item.name}
          id={item._id}
          time={item.time}
          handleChange={handleChange}
          handleDelete={handleDelete}
          idx={index}
        />
      );
    },
    [handleChange, handleDelete]
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Skeleton />
      ) : (
        <View style={styles.innerContainer}>
          <Text style={styles.headerText}>Info</Text>
          <TextInput
            style={styles.input}
            placeholder="Doctor Name"
            value={localData.doctorName}
            onChangeText={(text) =>
              setLocalData({ ...localData, doctorName: text })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Name of Patient"
            value={localData.patientName}
            onChangeText={(text) =>
              setLocalData({ ...localData, patientName: text })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Age"
            value={localData.age}
            onChangeText={(text) => setLocalData({ ...localData, age: text })}
          />
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}>
            <VirtualizedList
              data={localData.medicines}
              renderItem={renderItem}
              keyExtractor={(item) => item._id}
              getItemCount={(data) => data.length}
              getItem={(data, index) => data[index]}
              showsVerticalScrollIndicator={false}
              initialNumToRender={5}
              maxToRenderPerBatch={5}
              windowSize={5}
              updateCellsBatchingPeriod={100}
            />
            <SubmitButton
              buttonText="Add Drug"
              onPress={addDrug}
              color="default"
            />
            <SubmitButton
              buttonText="Save"
              onPress={handleSubmit}
              color="default"
            />
          </KeyboardAvoidingView>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 12,
  },
  innerContainer: {
    flex: 1,
  },

  backButton: {
    position: "absolute",
    left: 0,
  },
  headerText: {
    ...FONTS.h2,
    color: COLORS.primary,
  },
  secondaryText: {
    ...FONTS.h3,
    color: COLORS.secondary,
    marginVertical: SIZES.small,
  },
  medicineField: {
    marginVertical: SIZES.base,
  },
  input: {
    marginVertical: SIZES.small,
    color: COLORS.primary,
    backgroundColor: COLORS.white,
    borderWidth: 0.2,
    borderColor: COLORS.primary,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    fontFamily: "Cairo-Regular",
    fontSize: SIZES.body3,
  },
});

export default EditScannedPrescriptionScreen;
