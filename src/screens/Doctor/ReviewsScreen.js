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
import FilledStarIcon from "../../../assets/SvgIcons.js/FilledStarIcon";
import EmptyStarIcon from "../../../assets/SvgIcons.js/EmptyStarIcon";

import { Path } from "react-native-svg";
import MultiLineTextInput from "../../components/MultiLineTextInput";
const DEFAULT_RATING = 3;

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
        `https://api.medical-society.fr.to/api/v1/doctors/${doctorId}/reviews?page=${currentPage}&limit=${limit}`
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
        `https://api.medical-society.fr.to/api/v1/doctors/${doctorId}/reviews`,
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
        <MultiLineTextInput
          placeholder="Write your review here"
          value={reviewContent}
          handleTextChange={handleTextChange}
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
