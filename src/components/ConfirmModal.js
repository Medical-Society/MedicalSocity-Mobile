import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "../../AppStyles";
import { colors } from "../../AppStyles";

const ConfirmModal = ({
  visibility,
  handleVisibility,
  icon,
  content,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visibility}
      //   onRequestClose={() => {
      //     setModalVisible(!modalVisible);
      //   }}
      onRequestClose={handleVisibility}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.iconsView}>
            {/* <MaterialIcons
              name="date-range"
              size={responsiveFontSize(50)}
              color={colors.Black}
            /> */}
            {icon}
          </View>
          <Text
            style={{
              fontFamily: "Cairo-SemiBold",
              fontSize: responsiveFontSize(20),
              color: colors.DarkCyan,
              textAlign: "center",
            }}>
            {content}
          </Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={{ ...styles.modalButton, backgroundColor: colors.Red }}
              //   onPress={() => {
              //     setModalVisible(!modalVisible);
              //   }}
              onPress={onCancel}>
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                ...styles.modalButton,
                backgroundColor: colors.Green,
              }}
              //   onPress={() => {
              //     bookAppointment(selectedTime);
              //     setModalVisible(!modalVisible);
              //   }}
              onPress={onConfirm}>
              <Text style={styles.modalButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
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
  iconsView: {
    position: "absolute",
    top: responsiveHeight(-30),
    backgroundColor: "white",
    borderRadius: 50,
  },
  modalContent: {
    backgroundColor: "white",
    padding: responsiveWidth(20),
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: responsiveHeight(40),
    marginHorizontal: responsiveWidth(20),
  },
  modalButton: {
    paddingVertical: responsiveHeight(10),
    paddingHorizontal: responsiveWidth(20),
    borderRadius: 5,
    marginTop: responsiveHeight(20),
  },
  modalButtonText: {
    color: "white",
    fontSize: responsiveFontSize(16),
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});

export default ConfirmModal;
