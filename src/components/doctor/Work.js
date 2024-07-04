import React, { useState } from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";
import { blurhash, colors } from "../../../AppStyles";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Image } from "expo-image";

const Album = ({ beforeImage, afterImage }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState("");

  return (
    <View style={styles.album}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        style={styles.modal}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}>
          <AntDesign name="close" size={24} color={colors.White} />
        </TouchableOpacity>

        <Image
          source={image}
          style={styles.clickedImage}
          contentFit="contain"
          placeholder={{ blurhash }}
          transition={500}
        />
        {beforeImage && afterImage && (
          <TouchableOpacity
            style={styles.leftArrow}
            onPress={() => {
              setImage(beforeImage);
            }}>
            <AntDesign name="left" size={24} color={colors.White} />
          </TouchableOpacity>
        )}
        {beforeImage && afterImage && (
          <TouchableOpacity
            style={styles.rightArrow}
            onPress={() => {
              setImage(afterImage);
            }}>
            <AntDesign name="right" size={24} color={colors.White} />
          </TouchableOpacity>
        )}
      </Modal>

      {beforeImage ? (
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() => {
            setModalVisible(true);
            setImage(beforeImage);
          }}>
          <Image
            source={beforeImage}
            style={styles.image}
            contentFit="contain"
            placeholder={{ blurhash }}
            transition={500}
          />
        </TouchableOpacity>
      ) : null}
      {afterImage ? (
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
            setImage(afterImage);
          }}
          style={styles.imageContainer}>
          <Image
            source={afterImage}
            style={styles.image}
            contentFit="contain"
            placeholder={{ blurhash }}
            transition={500}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const Work = ({ beforeImage, afterImage, description }) => {
  return (
    <View style={styles.postContainer}>
      <Album beforeImage={beforeImage} afterImage={afterImage} />
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: colors.WhiteI,
    borderRadius: 10,
    borderColor: colors.GreyII,
    borderWidth: 1,
    marginVertical: 10,
    marginHorizontal: 5,
  },
  closeButton: {
    backgroundColor: colors.Black,
    padding: 10,
    borderRadius: 50,
    position: "absolute",
    right: 0,
    top: 20,
    zIndex: 1,
  },
  album: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 5,
  },
  imageContainer: {
    flex: 1,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  image: {
    width: "100%",
    height: 260,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  description: {
    fontSize: 16,
    color: colors.DarkBlack,
    fontFamily: "Cairo-Regular",
    lineHeight: 30,
    padding: 10,
  },
  modal: {
    flex: 1,
    backgroundColor: colors.Black,
    paddingVertical: 50,
  },
  clickedImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.Black,
  },
  rightArrow: {
    position: "absolute",
    right: 0,
    top: "50%",
    backgroundColor: colors.Black,
  },
  leftArrow: {
    position: "absolute",
    left: 0,
    top: "50%",
    backgroundColor: colors.Black,
  },
});

export default Work;
