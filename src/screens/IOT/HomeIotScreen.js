import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Modal } from "react-native";
import { Context as IotContext } from "../../context/IotContext";
import { Context as UserContext } from "../../context/UserContext";
import SafeScrollView from "../../components/SafeScrollView";
import Header from "../../components/Header";
import { ref, onValue } from "firebase/database";
import { database } from "../../services/firebase";
import HeartRateIcon from "../../../assets/SvgIcons/HeartRateIcon";
import { colors } from "../../../AppStyles";

const db = database;

const handleCase = (age, bpm) => {
  const mensRestingHeartRateChart = {
    ageGroups: [
      {
        range: "18-25",
        athlete: "49-55",
        excellent: "56-61",
        good: "62-65",
        aboveAverage: "66-70",
        average: "70-73",
        belowAverage: "74-81",
        poor: "82+",
      },
      {
        range: "26-35",
        athlete: "49-54",
        excellent: "55-61",
        good: "62-65",
        aboveAverage: "66-70",
        average: "71-74",
        belowAverage: "75-81",
        poor: "82+",
      },
      {
        range: "36-45",
        athlete: "50-56",
        excellent: "57-62",
        good: "63-66",
        aboveAverage: "67-70",
        average: "71-75",
        belowAverage: "76-82",
        poor: "83+",
      },
      {
        range: "46-55",
        athlete: "50-57",
        excellent: "58-63",
        good: "64-67",
        aboveAverage: "68-71",
        average: "72-76",
        belowAverage: "77-83",
        poor: "84+",
      },
      {
        range: "56-65",
        athlete: "51-56",
        excellent: "58-63",
        good: "64-67",
        aboveAverage: "68-71",
        average: "72-75",
        belowAverage: "76-81",
        poor: "82+",
      },
      {
        range: "65+",
        athlete: "50-55",
        excellent: "56-61",
        good: "62-65",
        aboveAverage: "66-69",
        average: "70-73",
        belowAverage: "74-79",
        poor: "80+",
      },
    ],
  };

  function getHeartRateCategory(age, bpm) {
    const ageGroup = mensRestingHeartRateChart.ageGroups.find((group) => {
      const [minAge, maxAge] = group.range.split("-").map(Number);
      return age >= minAge && (maxAge ? age <= maxAge : true);
    });

    if (!ageGroup) {
      return "Age out of range";
    }

    for (const [category, range] of Object.entries(ageGroup)) {
      if (category === "range") continue;

      const [minBpm, maxBpm] = range.split("-").map(Number);
      if (
        (maxBpm && bpm >= minBpm && bpm <= maxBpm) ||
        (!maxBpm && bpm >= minBpm)
      ) {
        return category.charAt(0).toUpperCase() + category.slice(1);
      }

      if (category === "poor" && bpm > maxBpm) {
        return "Poor";
      }
    }

    return "Out of range";
  }

  const category = getHeartRateCategory(age, bpm);
  return category;
};

const HomeIotScreen = ({ navigation }) => {
  const { state: iotState } = useContext(IotContext);
  const { state: userState } = useContext(UserContext);

  const { sensorId } = iotState;
  const { userData } = userState;

  const birthdate = new Date(userData.birthdate);
  const age = new Date().getFullYear() - birthdate.getFullYear();

  const [data, setData] = useState(null);
  const [prevData, setPrevData] = useState(null);

  useEffect(() => {
    const dbRef = ref(db, sensorId);
    const unsubscribe = onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      setData(data);
    });

    return () => {
      unsubscribe(); // Unsubscribe from Firebase listener
    };
  }, [sensorId]);

  useEffect(() => {
    if (data !== prevData) {
      setPrevData(data);
    }
  }, [data, prevData]);

  return (
    <SafeScrollView
      header={
        <Header
          title="Home Iot"
          backButtonHandler={() => navigation.goBack()}
        />
      }
      alignItems="center"
      justifyContent="center"
      marginBottom={0}>
      <View style={styles.container}>
        <HeartRateIcon />
        {/* <Text style={styles.titleText}>Your Heart Rate</Text> */}
        <Text style={styles.text}>
          {data?.Finger === "No finger?"
            ? ""
            : data?.Finger === "Finger" && data?.BPM === 49
            ? ""
            : "Your Heart Rate"}
        </Text>

        <Text style={styles.text}>
          {data?.Finger === "No finger?"
            ? "Please put your finger on the sensor"
            : data?.Finger === "Finger" && data?.BPM === 49
            ? "Calculating your heart rate"
            : data?.BPM}
        </Text>
        <Text>
          {data?.Finger === "No finger?"
            ? ""
            : data?.Finger === "Finger" && data?.BPM === 49
            ? ""
            : handleCase(age, data?.BPM)}
        </Text>
      </View>
    </SafeScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    padding: 16,
  },
  titleText: {
    color: colors.DarkBlack,
    textAlign: "center",
    fontFamily: "Cairo-Medium",
    fontSize: 28,
    lineHeight: 52,
  },
  text: {
    color: colors.BlueI,
    textAlign: "center",
    fontFamily: "Cairo-Medium",
    fontSize: 32,
    lineHeight: 52,
  },
});

export default HomeIotScreen;
