import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, Button, AppState } from "react-native";
import { ref, onValue, update } from "firebase/database";
import { database } from "../../services/firebase";
import { Context as UserContext } from "../../context/UserContext";

const db = database;

const handleCase = () => {
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
    }

    return "Out of range";
  }

  // Example usage:
  const age = 19; // User's age
  const bpm = 50; // User's BPM
  const category = getHeartRateCategory(age, bpm);

  return category;
};

const HomeIotScreen = () => {
  const [data, setData] = useState({});
  const [appState, setAppState] = useState(AppState.currentState);
  const [sensorId, setSensorId] = useState("349f033c");

  const { state } = useContext(UserContext);

  const { userData } = state;

  const { age } = userData;

  console.log("age", age);

  useEffect(() => {
    const dbRef = ref(db, sensorId);
    const unsubscribe = onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      setData(data);
    });

    return () => {
      // Cleanup on unmount
      update(dbRef, { state: 1 }); // Reset state to 1 in the database
      unsubscribe(); // Unsubscribe from Firebase listener
    };
  }, []);

  const handleButtonClick = () => {
    const dbRef = ref(db, sensorId);
    update(dbRef, { state: 0 });
  };

  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === "background" || nextAppState === "inactive") {
        const dbRef = ref(db, sensorId);
        update(dbRef, { state: 1 });
        setAppState(nextAppState);
      }
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      subscription && subscription.remove(); // Cleanup AppState listener
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>BPM: {data.BPM}</Text>
      <Text style={styles.text}>Finger: {data.Finger}</Text>
      <Button
        title={`Set State to ${data.state === 0 ? 1 : 0}`}
        onPress={handleButtonClick}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  text: {
    fontSize: 18,
    marginVertical: 8,
  },
});

export default HomeIotScreen;
