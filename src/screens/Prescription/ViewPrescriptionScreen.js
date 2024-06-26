import React from "react";
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
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import SubmitButton from "../../components/SubmitButton";
import { colors } from "../../../AppStyles";
import { MaterialIcons } from "@expo/vector-icons";
import Header from "../../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import Skeleton from "../../components/Skeleton";
import { Context as UserContext } from "../../context/UserContext";
import { Context as AuthContext } from "../../context/AuthContext";
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
    <View style={{ flexDirection: "column", marginVertical: SIZES.base }}>
      <Text style={styles.mainText}>{name}</Text>
      <Text style={styles.valueText}>
        {nOfTimes ? nOfTimes : "X times"} a day
      </Text>
    </View>
  );
};

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
  }, []);

  const getPrescriptionById = async (prescriptionId) => {
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
        doctorName: response.data.data.doctor.englishFullName,
        ...response.data.data,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log(prescription);
  }, [prescription]);

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
              height: 20,
            }}
          />
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: COLORS.primary,
              marginVertical: SIZES.base,
            }}
          />
          <FlatList
            data={medicines}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <MedicineField name={item.name} nOfTimes={item.time} />
            )}
          />
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
  headerText: {
    ...FONTS.h3,
    color: COLORS.primary,
  },
  secondaryText: {
    ...FONTS.h3,
    color: COLORS.secondary,
    marginVertical: SIZES.small,
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
