import React from "react";
import { StyleSheet } from "react-native";
import ResultsList from "../../components/Search/ResultsList";
import { responsiveHeight } from "../../../AppStyles";
import Header from "../../components/Header";
import SafeFlatListView from "../../components/SafeFlatListView";

const ResultsShowScreen = ({ navigation, route }) => {
  const { results } = route.params;
  return (
    <SafeFlatListView
      header={
        <Header
          title="Search Results"
          backButtonHandler={() => navigation.goBack()}
        />
      }>
      <ResultsList
        results={results}
        title="Search Results"
        navigation={navigation}
      />
    </SafeFlatListView>
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
