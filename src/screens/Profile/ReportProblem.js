import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ReportProblem = ({ navigation }) => {
  const backButtonHandler = () => {
    navigation.goBack();
  };

  const goToResultScreen = () => {
    navigation.navigate("OcrResult", {
      name: "Prescription",
      drugs: [
        "Paracetamol",
        "Ibuprofen",
        "Amoxicillin",
        "Ciprofloxacin",
        "Doxycycline",
        "Clindamycin",
        "Metronidazole",
        "Azithromycin",
        
      ],
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Prescriptions" backButtonHandler={backButtonHandler} />
      <TouchableOpacity
        style={styles.cardContainer}
        activeOpacity={0.7}
        onPress={goToResultScreen}>
        <View style={styles.card}>
          <Text style={styles.date}>9/12/2023 </Text>
          <View style={styles.rowOne}>
            <Text style={styles.name}>Dr/ Peter Joseph</Text>
            <Text style={styles.specialization}>Dentist</Text>
          </View>
          <View style={styles.rowOne}>
            <Text style={styles.address}>Elgish St. El-Qantara Gharb</Text>
            <Text style={styles.address}>150. LE</Text>
          </View>
        </View>
        <View style={styles.goToButton}>
          <Text style={styles.goToText}>View Details</Text>
          <MaterialIcons
            style={styles.icon}
            name="chevron-right"
            size={30}
            color="white"
          />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  cardContainer: {
    marginTop: 18,
    marginHorizontal: 24,
  },
  card: {
    justifyContent: "center",
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    padding: 16,
    backgroundColor: "#fff",
    borderColor: "#060B73",
    borderWidth: 0.5,
    shadowColor: "#000",
    elevation: 3,
  },
  rowOne: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  name: {
    fontSize: 18,
    marginBottom: 6,
    color: "#060B73",
    fontFamily: "Cairo-Medium",
  },
  date: {
    fontSize: 16,
    marginBottom: 6,
    alignSelf: "flex-end",
    color: "#AEAEAE",
    fontFamily: "Cairo-Regular",
  },
  address: {
    fontSize: 16,
    marginBottom: 6,
    color: "#7B7B7B",
    fontFamily: "Cairo-Regular",
  },
  specialization: {
    fontSize: 16,
    color: "#060B73",
    fontFamily: "Cairo-Medium",
  },
  goToButton: {
    width: "100%",
    height: 40,
    backgroundColor: "#060B73",
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  icon: {
    alignSelf: "center",
  },
  goToText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    alignSelf: "center",
    lineHeight: 40,
    fontFamily: "Cairo-Regular",
  },
});

export default ReportProblem;
