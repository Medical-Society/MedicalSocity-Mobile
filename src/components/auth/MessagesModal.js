import React from "react";
import { View, Text, Modal, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const MessagesModal = ({ errorMessage, successMessage, clearMessage }) => {
  const message = errorMessage ? errorMessage : successMessage;
  console.log("Hii");
  return (
    <Modal
      visible={message ? true : false}
      animationType="fade"
      transparent={true}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={{ ...styles.iconsView, padding: errorMessage ? 0 : 5 }}>
            <MaterialIcons
              style={{
                ...styles.icon,
                backgroundColor: errorMessage ? "white" : "green",
              }}
              name={errorMessage ? "error" : "done"}
              color={errorMessage ? "red" : "white"}
            />
          </View>

          <Text style={styles.errorText}>{message}</Text>
          <TouchableOpacity
            onPress={clearMessage}
            style={{
              ...styles.closeButton,
              backgroundColor: errorMessage ? "red" : "green",
            }}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  iconsView: {
    position: "absolute",
    top: -30,
    backgroundColor: "white",
    borderRadius: 50,
  },

  icon: {
    fontSize: 60,
    marginBottom: 20,
    borderRadius: 50,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 50,
    paddingHorizontal: 20,
    marginHorizontal: 50,
    borderRadius: 10,
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  closeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
  },
});
export default MessagesModal;
