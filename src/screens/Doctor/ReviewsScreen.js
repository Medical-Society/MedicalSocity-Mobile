import React, { useState, useEffect, useCallback, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import Review from "../../components/doctor/Review";
import { ActivityIndicator } from "react-native-paper";
import axios from "axios";
import MessagesModal from "../../components/MessagesModal";
import { Context as AuthContext } from "../../context/AuthContext";
import SvgIconBuilder from "../../components/SvgIconBuilder";

import { Path } from "react-native-svg";
const DEFAULT_RATING = 3;

const EmptyStarIcon = (props) => (
  <SvgIconBuilder {...props} width={25} height={25}>
    <Path
      d="M10 13.275l.304.231 3.056 2.33a.156.156 0 00.052-.021l.009-.006a.156.156 0 00-.003-.009L10 13.275zm0 0l-.303.232-3.05 2.329-.002.001a.155.155 0 01-.056-.022h0l-.009-.006.003-.009 1.168-3.814.105-.342-.29-.21-2.96-2.132-.011-.008-.012-.007a.153.153 0 01.027-.037h4.066l.108-.355 1.188-3.94v-.002a.112.112 0 01.011-.026A.065.065 0 0110 4.92h0s0 0 0 0a.015.015 0 01.003 0s.006.001.016.008a.11.11 0 01.01.027l1.19 3.94.107.356h4.066c.012.013.02.025.027.038 0 0 0 0 0 0v.003s0 0 0 0l-.01.005-.007.006-2.965 2.132-.291.21.105.342 1.168 3.814L10 13.275zM4.586 9.303h0zm-.481.133h0z"
      stroke="#AEAEAE"
    />
  </SvgIconBuilder>
);

const FilledStarIcon = (props) => (
  <SvgIconBuilder {...props} width={25} height={25}>
    <Path
      d="M10 13.904l-3.053 2.332a.468.468 0 01-.325.102.66.66 0 01-.304-.103.485.485 0 01-.214-.581l1.169-3.814-2.96-2.132a.464.464 0 01-.209-.272.517.517 0 01.008-.317c.039-.1.1-.187.184-.26a.46.46 0 01.313-.109h3.696l1.19-3.942a.529.529 0 01.506-.39.529.529 0 01.506.39l1.189 3.942h3.696a.46.46 0 01.313.11.66.66 0 01.184.259c.036.1.038.206.008.317a.47.47 0 01-.204.272l-2.965 2.132 1.168 3.814a.485.485 0 01-.213.581.66.66 0 01-.304.104.45.45 0 01-.32-.103l-3.058-2.332z"
      fill="#6231cc"
    />
  </SvgIconBuilder>
);

const ReviewsScreen = ({ navigation, route }) => {
  const doctorId = route.params.doctorId;

  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const { state } = useContext(AuthContext);
  const [defaultRating, setDefaultRating] = useState(0);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
  const [reviewContent, setReviewContent] = useState("");
  const starImageFilled = require("../../../assets/star_filled.png");
  const starImageCorner = require("../../../assets/star_corner.png");

  const limit = 10;

  useEffect(() => {
    fetchReviews();
  }, [currentPage]);

  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://medical-society-official.onrender.com/api/v1/doctors/${doctorId}/reviews?page=${currentPage}&limit=${limit}`
      );

      const { data } = response.data;
      setReviews((prevReviews) => [
        ...prevReviews,
        ...data.reviews.filter(
          (review) =>
            !prevReviews.find((prevReview) => prevReview._id === review._id)
        ),
      ]);

      setTotalPages(data.totalPages);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setIsLoading(false);
    }
  };

  const addReview = async (rating) => {
    try {
      const response = await axios.post(
        `https://medical-society-official.onrender.com/api/v1/doctors/${doctorId}/reviews`,
        {
          rating,
          comment: reviewContent,
        },
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      setSuccessMessage("Review added successfully");
      fetchReviews();
      setReviewContent("");
      setDefaultRating(DEFAULT_RATING);
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  const handleLoadMore = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, totalPages]);

  const handleTextChange = useCallback((text) => {
    setReviewContent(text);
  }, []);

  const backButtonHandler = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  useEffect(() => {
    console.log("defaultRating", defaultRating);
  }, [defaultRating]);

  const CustomRatingBar = () => {
    return (
      <View style={styles.customRatingBarStyle}>
        {maxRating.map((item) => (
          <TouchableOpacity
            activeOpacity={0.7}
            key={item}
            onPress={() => {
              setDefaultRating(item);
              addReview(item);
            }}>
            {item <= defaultRating ? <FilledStarIcon /> : <EmptyStarIcon />}
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Reviews" backButtonHandler={backButtonHandler} />
      <View style={styles.addReviewContainer}>
        <TextInput
          style={styles.addReviewText}
          placeholder="Add a review"
          value={reviewContent}
          multiline={true}
          onChangeText={handleTextChange}
        />
      </View>
      <View style={styles.rateContainer}>
        <Text style={styles.rateText}>Tap to rate</Text>
        <CustomRatingBar />
        {successMessage && (
          <MessagesModal
            successMessage={successMessage}
            clearMessage={() => setSuccessMessage("")}
          />
        )}
      </View>
      <FlatList
        data={reviews}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <Review review={item} />}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          isLoading ? <ActivityIndicator size="large" color="blue" /> : null
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  addReviewContainer: {
    height: 100,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 10,
  },
  addReviewText: {
    flex: 1,
    width: "100%",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    textAlignVertical: "top",
    padding: 10,
  },
  customRatingBarStyle: {
    justifyContent: "center",
    alignSelf: "center",
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 10,
  },
  starImageStyle: {
    width: 25,
    height: 25,
    resizeMode: "cover",
  },
  rateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  rateText: {
    fontSize: 18,
    fontFamily: "Cairo-Medium",
    color: "#060B73",
  },
});

export default ReviewsScreen;
