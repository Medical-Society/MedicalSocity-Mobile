import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-paper";
import SubmitButton from "../auth/SubmitButton";

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

const MedicineFields = React.memo(
  ({ id, name, nOfTimes, note, handleChange, handleDelete }) => {
    return (
      <View style={styles.medicineField}>
        <Text style={styles.headerText}>Medicine {id}</Text>
        <TextInput
          style={styles.input}
          label="Medicine Name"
          value={name}
          onChangeText={(text) => handleChange(id, "name", text)}
        />
        <TextInput
          style={styles.input}
          label="Number of Times"
          value={nOfTimes}
          onChangeText={(text) => handleChange(id, "nOfTimes", text)}
        />
        <TextInput
          style={styles.input}
          label="Note"
          value={note}
          onChangeText={(text) => handleChange(id, "note", text)}
        />
        <TouchableOpacity
          onPress={() => handleDelete(id)}
          style={{ position: "absolute", right: 0, top: 0 }}
        >
          <MaterialIcons name="delete" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    );
  }
);

const EditPrescription = ({
  prescriptionData,
  setMode,
  setPrescriptionData,
}) => {
  const [localData, setLocalData] = useState(prescriptionData);

  const handleDelete = (id) => {
    const newMedicines = localData.medicines.filter(
      (medicine) => medicine.id !== id
    );
    setLocalData({ ...localData, medicines: newMedicines });
  };

  const handleChange = (id, field, value) => {
    const newMedicines = localData.medicines.map((medicine) => {
      if (medicine.id === id) {
        return { ...medicine, [field]: value };
      }
      return medicine;
    });
    setLocalData({ ...localData, medicines: newMedicines });
  };

  const handleSubmit = () => {
    setPrescriptionData(localData);
    setMode("View");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Info</Text>

      <TextInput
        style={styles.input}
        label="Name of Doctor"
        value={localData.doctorName}
        onChangeText={(text) =>
          setLocalData({ ...localData, doctorName: text })
        }
      />
      <TextInput
        style={styles.input}
        label="Name of Patient"
        value={localData.patientName}
        onChangeText={(text) =>
          setLocalData({ ...localData, patientName: text })
        }
      />
      <TextInput
        style={styles.input}
        label="Age"
        value={localData.age}
        onChangeText={(text) => setLocalData({ ...localData, age: text })}
      />

      <FlatList
        data={localData.medicines}
		
        renderItem={({ item }) => (
          <MedicineFields
            id={item.id}
            name={item.name}
            nOfTimes={item.nOfTimes}
            note={item.note}
            handleChange={handleChange}
            handleDelete={handleDelete}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
      <SubmitButton buttonText="Save" onPress={handleSubmit} color="default" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 12,
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
  },
});

export default EditPrescription;
