import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, AppState } from "react-native";
import { ref, onValue, update } from "firebase/database";
import { database } from "../../services/firebase";

const db = database;

const HomeIotScreen = () => {
  const [data, setData] = useState({});
  const [appState, setAppState] = useState(AppState.currentState);
  const [sensorId, setSensorId] = useState("349f033c");

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
      <Text style={styles.text}>SPO2: {data.SPO2}</Text>
      <Text style={styles.text}>State: {data.state}</Text>
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
