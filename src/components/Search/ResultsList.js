import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import ResultsDetail from "./ResultsDetail";

const ResultsList = ({ results, navigation }) => {
  return (
    <FlatList
      vertical
      showsVerticalScrollIndicator={false}
      data={results}
      keyExtractor={(result) => result._id}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate("DoctorStack", {
                screen: "Doctor",
                params: { doctorId: item._id },
              })
            }>
            <ResultsDetail doctor={item} />
          </TouchableOpacity>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 50,
  },
});

export default ResultsList;
