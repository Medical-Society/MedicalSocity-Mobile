import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  FlatList,
  TextInput,
  Platform,
  VirtualizedList,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import SubmitButton from "../../components/SubmitButton";

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
  id,
  name,
  nOfTimes,
  note,
  handleChange,
  handleDelete,
}) => {
  return (
    <View style={styles.medicineField}>
      <Text style={styles.headerText}>Medicine {id}</Text>
      <TextInput
        style={styles.input}
        placeholder="Medicine Name"
        value={name}
        onChangeText={(text) => handleChange(id, "name", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Number of Times"
        value={nOfTimes}
        onChangeText={(text) => handleChange(id, "nOfTimes", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Note"
        value={note}
        onChangeText={(text) => handleChange(id, "note", text)}
      />
      <TouchableOpacity
        onPress={() => handleDelete(id)}
        style={{ position: "absolute", right: 0, top: 0 }}>
        <MaterialIcons name="delete" size={24} color={COLORS.primary} />
      </TouchableOpacity>
    </View>
  );
};

const EditPrescriptionScreen = ({
  prescriptionData,
  setMode,
  setPrescriptionData,
}) => {
  //   copy prescriptionData to a new variable by value
  const newPrescriptionData = JSON.parse(JSON.stringify(prescriptionData));

  const [localData, setLocalData] = useState(newPrescriptionData);

  const handleDelete = (id) => {
    console.log("id", id);
    const newMedicines = localData.medicines.filter(
      (medicine) => medicine.id !== id
    );
    setLocalData({ ...localData, medicines: newMedicines });
  };

  const handleChange = (id, field, value) => {
    console.log("id", id, "field", field, "value", value);
    const newMedicines = localData.medicines.map((medicine) => {
      if (medicine.id === id) {
        return { ...medicine, [field]: value };
      }
      return medicine;
    });
    setLocalData({ ...localData, medicines: newMedicines });
  };

  const addDrug = () => {
    const newMedicines = [
      ...localData.medicines,
      {
        id: localData.medicines.length + 1,
        name: "",
        nOfTimes: "",
        note: "",
      },
    ];
    setLocalData({ ...localData, medicines: newMedicines });
  };

  const handleSubmit = () => {
    // filter out empty medicines
    const newMedicines = localData.medicines.filter(
      (medicine) => medicine.name !== ""
    );
    setPrescriptionData({ ...localData, medicines: newMedicines });
    setMode("View");
  };

  const renderItem = useCallback(
    ({ item }) => (
      <MedicineFields
        id={item.id}
        name={item.name}
        nOfTimes={item.nOfTimes}
        note={item.note}
        handleChange={handleChange}
        handleDelete={handleDelete}
      />
    ),
    [localData]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Info</Text>

      <TextInput
        style={styles.input}
        placeholder="Name of Doctor"
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
          keyExtractor={(item) => item.id.toString()}
          getItemCount={(data) => data.length}
          getItem={(data, index) => data[index]}
          showsVerticalScrollIndicator={false}
          initialNumToRender={5}
          maxToRenderPerBatch={5}
          windowSize={5}
          updateCellsBatchingPeriod={100}
        />
        <SubmitButton buttonText="Add Drug" onPress={addDrug} color="default" />
        <SubmitButton
          buttonText="Save"
          onPress={handleSubmit}
          color="default"
        />
      </KeyboardAvoidingView>
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
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    fontFamily: "Cairo-Regular",
    fontSize: SIZES.body3,
  },
});

export default EditPrescriptionScreen;
