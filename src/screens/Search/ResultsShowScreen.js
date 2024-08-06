import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Platform,
  TouchableOpacity,
} from "react-native";
import ResultsList from "../../components/Search/ResultsList";
import { responsiveHeight } from "../../../AppStyles";
import Header from "../../components/Header";
import SafeFlatListView from "../../components/SafeFlatListView";
import doctorApi from "../../services/doctor";
import * as Device from "expo-device";
import * as Location from "expo-location";
import { Context as AuthContext } from "../../context/AuthContext";
import { useFocusEffect } from "@react-navigation/native";
import Skeleton from "../../components/Skeleton";

const ResultsShowScreen = ({ navigation, route }) => {
  const { term } = route.params;
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const { state } = React.useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = state;

  useEffect(() => {
    (async () => {
      let status = false;

      // isAndroidBackgroundLocationEnabled	
      // isIosBackgroundLocationEnabled	

      if (Platform.OS === "android" && !Device.isDevice) {
        setErrorMsg(
          "Oops, this will not work on Snack in an Android Emulator. Try it on your device!"
        );
        return;
      }
      if (Platform.OS === "android") {
        status = await Location.isBackgroundLocationAvailableAsync();
        console.log("isAndroidBackgroundLocationEnabled", status);
      }
      if (Platform.OS === "ios") {
        status = await Location.isBackgroundLocationAvailableAsync();
        console.log("isIosBackgroundLocationEnabled", status);
      }
      

      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      setLocation(location);
    })();
  }, []);

  const searchApi = async (searchTerm, token, searchBy = "") => {
    const toSearchWith = searchTerm === "All" ? "" : searchTerm;
    try {
      setIsLoading();
      const params = {
        searchTerm: toSearchWith,
      };

      if (searchBy === "location" && location) {
        params.location = [location.coords.longitude, location.coords.latitude];
      }

      const response = await doctorApi.get("/", {
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setResults(response.data.data.doctors);
    } catch (err) {
      setErrorMessage(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      searchApi(term, token);
    }, [])
  );

  return (
    <SafeFlatListView
      header={
        <Header
          title="Search Results"
          backButtonHandler={() => navigation.goBack()}
        />
      }>
      {isLoading ? (
        <Skeleton />
      ) : (
        <View>
          {location && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}>
              <TouchableOpacity
                onPress={() => searchApi(term, token)}
                style={{ padding: 10 }}>
                <Text style={{ textAlign: "center" }}>Search by name</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => searchApi(term, token, "location")}
                style={{ padding: 10 }}>
                <Text style={{ textAlign: "center" }}>Search by location</Text>
              </TouchableOpacity>
            </View>
          )}
          <ResultsList results={results} navigation={navigation} term={term} />
        </View>
      )}
      {isLoading === true && results.length === 0 && (
        <View style={styles.container}>
          <Text style={{ textAlign: "center" }}>
            {errorMessage || "No results found"}
          </Text>
        </View>
      )}
    </SafeFlatListView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: responsiveHeight(80),
  },
});

export default ResultsShowScreen;
