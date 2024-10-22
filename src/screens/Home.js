import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  Image,
  Platform,
} from "react-native";
import { useContext } from "react";
import { Context as AuthContext } from "../context/AuthContext";
import SearchBar from "../components/Search/SearchBar";
import useResults from "../hooks/useResults";
import OcrModal from "../components/Ocr/OcrModal";
import { colors, responsiveFontSize } from "../../AppStyles";
import SafeScrollView from "../components/SafeScrollView";
import HomeCard from "../components/home/HomeCard";
import DoctorCircle from "../components/home/DoctorCircle";
import DoctorIcon from "../../assets/SvgIcons/DoctorIcon";
import usePaginatedFetch from "../hooks/usePaginatedFetch";
import { useFocusEffect } from "@react-navigation/native";
import * as Location from "expo-location";
import * as Device from "expo-device";

const Home = ({ navigation }) => {
  const [term, setTerm] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  // const [searchApi, results, , setResults] = useResults();
  const token = useContext(AuthContext).state.token;
  const [errorMsg, setErrorMsg] = useState(null);

  const { data: doctors, reFetchData: reFetchDoctors } = usePaginatedFetch(
    "https://api.medical-society.fr.to/api/v1/doctors",
    "doctors"
  );

  useEffect(() => {
    (async () => {
      if (Platform.OS === "android" && !Device.isDevice) {
        setErrorMsg(
          "Oops, this will not work on Snack in an Android Emulator. Try it on your device!"
        );
        return;
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setTerm("");
      reFetchDoctors();
    }, [])
  );

  return (
    <SafeScrollView
      header={
        <>
          <Text style={styles.appTitle}>Medical Society</Text>
          <OcrModal
            navigation={navigation}
            isVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
        </>
      }>
      <SearchBar
        term={term}
        onTermChange={setTerm}
        onTermSubmit={() =>
          navigation.navigate("ResultsShow", {
            term,
          })
        }
        placeholder={"Search for Doctor, Address and Specialization."}
      />
      {doctors && doctors.length > 0 && (
        <View style={styles.headBestDoctorsSection}>
          <Text style={styles.headBestDoctors}>Best Doctors</Text>
        </View>
      )}
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={doctors}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return <DoctorCircle doctor={item} navigation={navigation} />;
        }}
        style={styles.doctorsList}
      />
      <HomeCard
        feature={{
          title: "You can ask AI chat bot",
          text: "It would be answered immediately",
          button: "Try it now",
          screen: "AiChatbot",
          image: require("../../assets/AiCardImg.png"),
          bgColor: colors.BlueII,
        }}
        onPress={() => navigation.navigate("AiChatbot", { isFromStack: true })}
      />
      <HomeCard
        feature={{
          title: "Try our IOT and track your health",
          text: " Your heart rate",
          button: "Try it now",
          screen: "Search",
          image: require("../../assets/brecletCardImg.png"),
          bgColor: "#440A05",
        }}
        onPress={() => navigation.navigate("IotStack")}
      />
      <HomeCard
        feature={{
          title: "Scan your prescriptions",
          text: "Convert your hard copy prescriptions to digital form",
          button: "Try it now",
          screen: "Search",
          image: require("../../assets/Ocr.png"),
          bgColor: "#5A0542",
          reverse: true,
        }}
        onPress={() => setModalVisible(true)}
      />

      <HomeCard
        feature={{
          title: "Ask Your Doctor in Chat",
          text: "It would be answered in 24 hours",
          button: "Try it now",
          screen: "Search",
          bgColor: "#005A68",
          reverse: true,
        }}
        onPress={() => navigation.navigate("Chats")}
        svgIcon={<DoctorIcon />}
      />
    </SafeScrollView>
  );
};

const styles = StyleSheet.create({
  appTitle: {
    color: colors.BlueI,
    fontSize: 18,
    alignSelf: "center",
    fontFamily: "Cinzel",
    lineHeight: 22,
    marginVertical: 16,
  },
  headBestDoctorsSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  headBestDoctors: {
    fontSize: responsiveFontSize(18),
    fontFamily: "Cairo-Medium",
    color: colors.BlueII,
    lineHeight: 34,
  },
  headAllDoctors: {
    fontSize: responsiveFontSize(15),
    color: "#060B73",
    fontFamily: "Cairo-Regular",
  },
  doctorsList: {
    marginBottom: 10,
  },
});

export default Home;
