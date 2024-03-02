import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  PixelRatio,
  Dimensions,
  Platform,
} from "react-native";
import { useContext } from "react";
import { Context as UserContext } from "../context/UserContext";
import SearchBar from "../components/Search/SearchBar";
import useResults from "../hooks/useResults";
import ResultsList from "../components/Search/ResultsList";
import { SafeAreaView } from "react-native-safe-area-context";
const DoctorCard = ({ doctor, navigation }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("Doctor", { doctor })}
    >
      <Text style={styles.name}>{doctor.name}</Text>
      <Text style={styles.specialty}>{doctor.specialty}</Text>
      <Text style={styles.address}>{doctor.address}</Text>
      <Text style={styles.about}>{doctor.about}</Text>
      <Text style={styles.appointment}>Appointments:</Text>
      <Text style={styles.appointment}>
        Morning: {doctor.appointments.morning}
      </Text>
      <Text style={styles.appointment}>
        Evening: {doctor.appointments.evening}
      </Text>
      <Text style={styles.price}>Price: ${doctor.price}</Text>
    </TouchableOpacity>
  );
};

const DoctorCircle = ({ doctor, navigation }) => {
  const styles = StyleSheet.create({
    doctorCircle: {
      justifyContent: "center",
      alignItems: "center",
      margin: 10,
    },
    image: {
      width: 85,
      height: 85,
      borderRadius: 100,
    },
    name: {
      fontSize: normalize(16),
      color: "#041E3F",
      fontFamily: "Cairo-Regular",
    },
    specialty: {
      fontSize: normalize(14),
      marginBottom: 10,
      fontFamily: "Cairo-Regular",
      color: "#7B7B7B",
    },
  });

  return (
    <View>
      <TouchableOpacity
        style={styles.doctorCircle}
        onPress={() => navigation.navigate("Doctor", { doctor })}
      >
        <Image source={doctor.image} style={styles.image} />
        <Text style={styles.name}>{doctor.name}</Text>
        <Text style={styles.specialty}>{doctor.specialty}</Text>
      </TouchableOpacity>
    </View>
  );
};

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const scale = SCREEN_WIDTH / 320;
const normalize = (size) => {
  const newSize = size * scale;
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};
const HomeCard = ({ feature, navigation }) => {
  const styles = StyleSheet.create({
    homeCard: {
      flexDirection: "row",
      justifyContent: "space-around",
      paddingVertical: 30,
      borderRadius: 10,
      flex: 1,
      marginBottom: 10,
    },
    cardCol: {
      justifyContent: "center",
      alignItems: "center",
      marginHorizontal: 10,

      width: "70%",
    },
    cardTitle: {
      fontSize: normalize(14),
      fontFamily: "Cairo-Medium",
      color: "white",
      textAlign: "center",
    },
    cardText: {
      textAlign: "center",
      fontSize: normalize(14),
      fontFamily: "Cairo-Light",
      color: "white",
      marginBottom: 10,
    },
    cardButton: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 12,
      width: "90%",
      borderRadius: 20,
      backgroundColor: "rgba(255, 255, 255, 0.10)",
    },
    imgBack: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(245, 245, 245, 0.10)",
      borderRadius: 10,
      marginRight: 10,
      width: 100,
      height: 100,
    },
    image: {
      borderRadius: 10,
    },
  });

  return (
    <View style={[styles.homeCard, { backgroundColor: feature.bgColor }]}>
      <View style={styles.cardCol}>
        <Text style={styles.cardTitle}>{feature.title}</Text>
        <Text style={styles.cardText}>{feature.text}</Text>
        <TouchableOpacity
          style={styles.cardButton}
          title={feature.button}
          onPress={() => navigation.navigate(feature.screen)}
        >
          <Text style={{ color: "white" }}>{feature.button}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.imgBack}>
        <Image source={feature.image} style={styles.image} />
      </View>
    </View>
  );
};

const Home = ({ navigation }) => {
  const [term, setTerm] = useState("");
  const [searchApi, results, errorMessage] = useResults();

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
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <SearchBar
        term={term}
        onTermChange={setTerm}
        onTermSubmit={() => searchApi(term)}
      />
      {results.length === 0 || term === "" ? (
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <View>
            <View>
              <View style={styles.headBestDoctorsSection}>
                <Text style={styles.headBestDoctors}>Best Doctors</Text>
                <Text style={styles.headAllDoctors}>All Doctors</Text>
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
                screen: "Search",
                image: require("../../assets/AiCardImg.png"),
                bgColor: "#041E3F",
              }}
              navigation={navigation}
            />
            <HomeCard
              feature={{
                title: "Try our bracelet and track your health",
                text: " Your heart rate and oxygen pulse",
                button: "Shop now",
                screen: "Search",
                image: require("../../assets/brecletCardImg.png"),
                bgColor: "#440A05",
              }}
              navigation={navigation}
            />
            <HomeCard
              feature={{
                title: "Scan your prescriptions",
                text: "Convert your hard copy prescriptions to digital form",
                button: "Try it now",
                screen: "Search",
                image: require("../../assets/Ocr.png"),
                bgColor: "#503453",
              }}
              navigation={navigation}
            />
            <HomeCard
              feature={{
                title: "Ask a specific doctor or our doctors in public",
                text: "It would be answered in 24 hours",
                button: "Try it now",
                screen: "Search",
                image: require("../../assets/AiCardImg.png"),
                bgColor: "#3F3114",
              }}
              navigation={navigation}
            />
          </View>
        </ScrollView>
      ) : (
        <ResultsList
          results={results}
          title="Search Results"
          navigation={navigation}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: "#fff",
    marginBottom: 60,
  },
  headBestDoctorsSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginVertical: 10,
  },
  headBestDoctors: {
    fontSize: normalize(16),
    fontFamily: "Cairo-Bold",
    color: "#041E3F",
  },
  headAllDoctors: {
    fontSize: normalize(15),
    color: "#060B73",
    fontFamily: "Cairo-Regular",
  },
});

export default Home;
