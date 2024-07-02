import React, { useState, useCallback, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import Review from "../../components/doctor/Review";
import { ActivityIndicator } from "react-native-paper";
import axios from "axios";
import MessagesModal from "../../components/MessagesModal";
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as UserContext } from "../../context/UserContext";
import FilledStarIcon from "../../../assets/SvgIcons.js/FilledStarIcon";
import EmptyStarIcon from "../../../assets/SvgIcons.js/EmptyStarIcon";
import usePaginatedFetch from "../../hooks/usePaginatedFetch";
import MultiLineTextInput from "../../components/MultiLineTextInput";

const DEFAULT_RATING = 0;

const ReviewsScreen = ({ navigation, route }) => {
  const doctorId = route.params.doctorId;

  const [message, setMessage] = useState({
    successMessage: "",
    errorMessage: "",
  });

  const maxRating = [1, 2, 3, 4, 5];
  const [defaultRating, setDefaultRating] = useState(DEFAULT_RATING);

  const [reviewContent, setReviewContent] = useState("");
  const { state: authState } = useContext(AuthContext);
  const { state: userState } = useContext(UserContext);

  const {
    data: reviews,
    isLoading,
    handleLoadMore,
    reFetchData: reFetchReviews,
  } = usePaginatedFetch(
    `https://api.medical-society.fr.to/api/v1/doctors/${doctorId}/reviews?patientId=${userState.userData._id}`,
    "reviews"
  );

  const isPatientReviewed = reviews.some(
    (review) => review.patient._id === userState.userData._id
  );

  const addReview = async (rating) => {
    try {
      await axios.post(
        `https://api.medical-society.fr.to/api/v1/doctors/${doctorId}/reviews`,
        {
          rating,
          comment: reviewContent,
        },
        {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        }
      );
      setMessage({ successMessage: "Review added successfully" });
      reFetchReviews();
    } catch (error) {
      setMessage({ errorMessage: error.response.data.message });
    }
    setReviewContent("");
    setDefaultRating(DEFAULT_RATING);
  };

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
      {!isPatientReviewed && (
        <>
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
          </View>
        </>
      )}

      <MessagesModal
        errorMessage={message.errorMessage}
        successMessage={message.successMessage}
        clearMessage={() => {
          setMessage({ successMessage: "", errorMessage: "" });
        }}
      />

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
    alignItems: "center",
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
