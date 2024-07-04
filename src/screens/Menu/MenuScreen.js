import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Context as AuthContext } from "../../context/AuthContext";
import Header from "../../components/Header";
import { colors, responsiveFontSize } from "../../../AppStyles";
import SafeScrollView from "../../components/SafeScrollView";
import PrescriptionIcon from "../../../assets/SvgIcons/PrescriptionIcon";
import PersonIcon from "../../../assets/SvgIcons/PersonIcon";
import AppointmentsIcon from "../../../assets/SvgIcons/AppointmentsIcon";
import LogoutIcon from "../../../assets/SvgIcons/LogoutIcon";

const Profile = ({ navigation }) => {
  const { signout } = useContext(AuthContext);

  const navigateTo = (screen) => {
    navigation.navigate(screen);
  };

  const navigateToEditProfile = () => navigateTo("EditProfile");
  const navigateToTermsAndPolicies = () => navigateTo("TermsAndPolicies");
  const navigateToPrescriptions = () => navigateTo("Prescriptions");
  const navigateToScannedPrescriptions = () =>
    navigateTo("ScannedPrescriptions");
  const navigateToAppointmentsScreen = () => navigateTo("Appointments");
  const navigateToReportProblem = () => navigateTo("ReportProblem");
  const navigateToContactUs = () => navigateTo("ContactUs");

  const accountItems = [
    {
      component: (width, height, color, style) => (
        <PersonIcon width={width} height={height} fill={color} style={style} />
      ),
      text: "Your Account",
      action: navigateToEditProfile,
    },
    {
      component: (width, height, color, style) => (
        <PrescriptionIcon
          width={width}
          height={height}
          fill={color}
          style={style}
        />
      ),
      text: "Prescriptions",
      action: navigateToPrescriptions,
    },
    {
      component: (width, height, color, style) => (
        <PrescriptionIcon
          width={width}
          height={height}
          fill={color}
          style={style}
        />
      ),
      text: "Scanned prescriptions",
      action: navigateToScannedPrescriptions,
    },
    {
      component: (width, height, color, style) => (
        <AppointmentsIcon
          width={width}
          height={height}
          fill={color}
          style={style}
        />
      ),
      text: "Appointments",
      action: navigateToAppointmentsScreen,
    },
    {
      component: (width, height, color, style) => (
        <LogoutIcon width={width} height={height} fill={color} style={style} />
      ),
      text: "Log out",
      action: signout,
    },
  ];

  const supportItems = [
    {
      text: "Terms and Policies",
      action: navigateToTermsAndPolicies,
    },
    {
      text: "Contact Us",
      action: navigateToContactUs,
    },
    {
      text: "About Us",
      action: () => navigateTo("AboutUs"),
    },
  ];

  const actionsItems = [
    {
      text: "Report a Problem",
      action: navigateToReportProblem,
    },
  ];

  const renderSettingsItem = ({ icon, text, action, component }) => (
    <TouchableOpacity onPress={action} style={styles.listItem}>
      <MaterialIcons name={icon} size={24} color={colors.BlueI} />

      {component && component(30, 30, colors.BlueI, styles.iconImage)}
      <Text
        style={{
          ...styles.listItemText,
          color: text === "Log out" ? colors.Red : colors.DarkBlack,
        }}>
        {text}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeScrollView header={<Header title="Menu" />}>
      <View style={{ marginBottom: 12 }}>
        <Text style={styles.itemTitle}>Account</Text>
        <View
          style={{
            borderRadius: 12,
          }}>
          {accountItems.map((item, index) => (
            <React.Fragment key={index}>
              {renderSettingsItem(item)}
            </React.Fragment>
          ))}
        </View>
      </View>
      {/* Support and About settings */}
      <View style={{ marginBottom: 12 }}>
        <Text style={styles.itemTitle}>Support & About </Text>
        <View
          style={{
            borderRadius: 12,
          }}>
          {supportItems.map((item, index) => (
            <React.Fragment key={index}>
              {renderSettingsItem(item)}
            </React.Fragment>
          ))}
        </View>
      </View>
      {/* Actions Settings */}
      <View style={{ marginBottom: 12 }}>
        <Text style={styles.itemTitle}>Actions</Text>
        <View
          style={{
            borderRadius: 12,
          }}>
          {actionsItems.map((item, index) => (
            <React.Fragment key={index}>
              {renderSettingsItem(item)}
            </React.Fragment>
          ))}
        </View>
      </View>
    </SafeScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.White,
  },
  itemTitle: {
    fontFamily: "Cairo-Medium",
    fontSize: responsiveFontSize(18),
    marginVertical: 10,
    color: colors.BlueI,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    paddingLeft: 2,
  },
  listItemText: {
    fontFamily: "Cairo-Regular",
    fontSize: responsiveFontSize(16),
    marginLeft: 6,
    lineHeight: 30,
  },
  iconImage: {
    fontSize: 24,
    width: 22,
    height: 22,
  },
});

export default Profile;
