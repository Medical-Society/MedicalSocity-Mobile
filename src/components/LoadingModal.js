import React from "react";
import { View, Text, Modal, StyleSheet, ActivityIndicator } from "react-native";
import { colors } from "../../AppStyles";

const LoadingModal = ({ loading }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={loading}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {loading && <ActivityIndicator animating={loading} />}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: colors.White,
    padding: 22,
    borderRadius: 4,
    width: "80%",
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    color: colors.BlueI,
    marginBottom: 10,
  },
});

export default LoadingModal;
