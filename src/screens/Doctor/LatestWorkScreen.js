import React, { useCallback, useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import Work from "../../components/doctor/Work";
import axios from "axios";
import { ActivityIndicator } from "react-native-paper";
import { Context as AuthContext } from "../../context/AuthContext";
import { colors } from "../../../AppStyles";
import usePaginatedFetch from "../../hooks/usePaginatedFetch";

const LatestWorkScreen = ({ navigation, route }) => {
  const backButtonHandler = () => {
    navigation.goBack();
  };

  const doctorId = route.params.doctorId;
  const { state } = useContext(AuthContext);
  // const [posts, setPosts] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(1);
  // const [isLoading, setIsLoading] = useState(false);

  // console.log("Token: ", state.token);
  // const limit = 10;

  // useEffect(() => {
  //   fetchPosts();
  // }, [currentPage]);

  // const fetchPosts = async () => {
  //   setIsLoading(true);
  //   try {
  //     const response = await axios.get(
  //       `https://api.medical-society.fr.to/api/v1/doctors/${doctorId}/posts`,
  //       {
  //         params: {
  //           page: currentPage,
  //           limit: limit,
  //         },
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${state.token}`,
  //         },
  //       }
  //     );
  //     setPosts((posts) => [
  //       ...posts,
  //       ...response.data.data.posts.filter(
  //         (post) => !posts.find((prevPost) => prevPost._id === post._id)
  //       ),
  //     ]);
  //     setTotalPages(response.data.data.totalPages);
  //   } catch (err) {
  //     console.error(
  //       "Error fetching posts:",
  //       err.response ? err.response.data.message : err.message
  //     );
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // const handleLoadMore = useCallback(() => {
  //   if (currentPage < totalPages) {
  //     setCurrentPage(currentPage + 1);
  //   }
  // }, [currentPage, totalPages]);
  const {
    data: posts,
    isLoading,
    handleLoadMore,
  } = usePaginatedFetch(
    `https://api.medical-society.fr.to/api/v1/doctors/${doctorId}/posts`,
    "posts"
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Latest Work" backButtonHandler={backButtonHandler} />
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.White,
  },
  works: {
    flex: 1,
    marginHorizontal: 10,
  },
});

export default LatestWorkScreen;
