import React from "react";
import { StyleSheet } from "react-native";
import ResultsList from "../../components/Search/ResultsList";
import { SafeAreaView } from "react-native-safe-area-context";
import { responsiveHeight } from "../../../AppStyles";
import Header from "../../components/Header";

const ResultsShowScreen = ({ navigation, route }) => {
  const { results } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Search Results"
        backButtonHandler={() => navigation.goBack()}
      />
      <ResultsList
        results={results}
        title="Search Results"
        navigation={navigation}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: responsiveHeight(80),
  },
  image: {
    height: 200,
    width: 300,
  },
});

export default ResultsShowScreen;
