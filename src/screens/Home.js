import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, FlatList } from "react-native";
import { useContext } from "react";
import { Context as AuthContext } from "../context/AuthContext";
import SearchBar from "../components/Search/SearchBar";
import useResults from "../hooks/useResults";
import OcrModal from "../components/Ocr/OcrModal";
import { colors, responsiveFontSize } from "../../AppStyles";
import SafeScrollView from "../components/SafeScrollView";
import HomeCard from "../components/home/HomeCard";
import DoctorCircle from "../components/home/DoctorCircle";
import DoctorIcon from "../../assets/SvgIcons.js/DoctorIcon";

const Home = ({ navigation }) => {
  const [term, setTerm] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [searchApi, results, , setResults] = useResults();
  const token = useContext(AuthContext).state.token;

  const doctors = [
    {
      name: "Dr. Peter Joseph",
      specialty: "Cardiologist",
      address:
        "His Address in details His Address in details His Address in details",
      price: 200,
      about:
        "about about him about him about him about him about him about him about him about him about him about him about him about him him about him about him about him about",
      schedule: [
        {
          id: 1,
          day: "Mon",
          date: "12",
        },
        {
          id: 2,
          day: "Tue",
          date: "13",
        },
        {
          id: 3,
          day: "Wed",
          date: "14",
        },
        {
          id: 4,
          day: "Thu",
          date: "15",
        },
        {
          id: 5,
          day: "Sat",
          date: "17",
        },
        {
          id: 6,
          day: "Sun",
          date: "18",
        },
      ],
      appointments: {
        morning: "9:00 AM - 12:00 PM",
        evening: "5:00 PM - 7:00 PM",
      },
      image: require("../../assets/doctor2.png"),
    },
  ];

  // make on the screen focus, setResults to empty array
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setResults([]);
    });
    return unsubscribe;
  }, [navigation, setResults]);

  useEffect(() => {
    if (results.length !== 0) {
      navigation.navigate("ResultsShow", { results });
    }
  }, [results, navigation]);

  return (
    <SafeScrollView
      header={
        <>
          <SearchBar
            term={term}
            onTermChange={setTerm}
            setResults={setResults}
            onTermSubmit={() => searchApi(term, token)}
            placeholder={"Search for doctors, clinics, etc."}
          />
          <OcrModal
            navigation={navigation}
            isVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
        </>
      }>
      <View>
        <View style={styles.headBestDoctorsSection}>
          <Text style={styles.headBestDoctors}>Best Doctors</Text>
          {/* <Text style={styles.headAllDoctors}>All Doctors</Text> */}
        </View>
      </View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={doctors}
        key={Math.random().toString(36).substring(7)}
        renderItem={({ item }) => {
          return <DoctorCircle doctor={item} navigation={navigation} />;
        }}
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
          title: "Try our bracelet and track your health",
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
  headBestDoctorsSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginVertical: 10,
  },
  headBestDoctors: {
    fontSize: responsiveFontSize(16),
    fontFamily: "Cairo-Bold",
    color: colors.BlueII,
  },
  headAllDoctors: {
    fontSize: responsiveFontSize(15),
    color: "#060B73",
    fontFamily: "Cairo-Regular",
  },
});

export default Home;
