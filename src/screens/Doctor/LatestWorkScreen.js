import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import Work from "../../components/doctor/Work";
import { ActivityIndicator } from "react-native-paper";
import { colors } from "../../../AppStyles";
import usePaginatedFetch from "../../hooks/usePaginatedFetch";
import SafeFlatListView from "../../components/SafeFlatListView";

const LatestWorkScreen = ({ navigation, route }) => {
  const backButtonHandler = () => {
    navigation.goBack();
  };

  const doctorId = route.params.doctorId;

  const {
    data: posts,
    isLoading,
    handleLoadMore,
  } = usePaginatedFetch(
    `https://api.medical-society.fr.to/api/v1/doctors/${doctorId}/posts`,
    "posts"
  );

  return (
    <SafeFlatListView
      header={
        <Header title="Latest Work" backButtonHandler={backButtonHandler} />
      }
      marginBottom={10}>
      <View style={styles.works}>
        <FlatList
          data={posts}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            const { images, description } = item;
            let post = {
              beforeImage: images.length > 0 ? images[0] : null,
              afterImage: images.length > 1 ? images[1] : null,
              description: description,
            };
            return <Work {...post} />;
          }}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          ListFooterComponent={
            isLoading ? (
              <ActivityIndicator size="large" color={colors.BlueI} />
            ) : null
          }
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeFlatListView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.White,
  },
  works: {
    flex: 1,
  },
});

export default LatestWorkScreen;
