import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import ResultsDetail from "./ResultsDetail";

const ResultsList = ({ results, navigation }) => {
  if (!results.length) {
    return null;
  }

  return (
    <View style={styles.container}>
      <FlatList
        vertical
        showsHorizontalScrollIndicator={false}
        data={results}
        keyExtractor={(result) => result._id}
        renderItem={({ item }) => {
          console.log(item);
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 50,
  },
});

export default ResultsList;
