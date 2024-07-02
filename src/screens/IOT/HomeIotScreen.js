import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Context as IotContext } from "../../context/IotContext";
import SafeScrollView from "../../components/SafeScrollView";
import Header from "../../components/Header";
import { ref, onValue } from "firebase/database";
import { database } from "../../services/firebase";

const db = database;

const HomeIotScreen = ({ navigation }) => {
  const { state } = useContext(IotContext);
  const { sensorId } = state;
  const [data, setData] = useState(null);

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

  return (
    <SafeScrollView
      header={
        <Header
          title="Home Iot"
          backButtonHandler={() => navigation.goBack()}
        />
      }>
      <View>
        <Text style={styles.text}>BPM: {data?.BPM}</Text>
        <Text style={styles.text}>Finger: {data?.Finger}</Text>
      </View>
    </SafeScrollView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    marginVertical: 8,
  },
});

export default HomeIotScreen;
