import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import React, { useContext } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Context as AuthContext } from "../../context/AuthContext";
import Header from "../../components/Header";
import { colors } from "../../../AppStyles";
import SafeScrollView from "../../components/SafeScrollView";
import PrescriptionIcon from "../../../assets/SvgIcons.js/PrescriptionIcon";
import PersonIcon from "../../../assets/SvgIcons.js/PersonIcon";
import AppointmentsIcon from "../../../assets/SvgIcons.js/AppointmentsIcon";
import LogoutIcon from "../../../assets/SvgIcons.js/LogoutIcon";
const Profile = ({ navigation }) => {
  const { signout } = useContext(AuthContext);

  const navigateTo = (screen) => {
    navigation.navigate(screen);
  };

  const navigateToEditProfile = () => navigateTo("EditProfile");
  const navigateToSupport = () => navigateTo("Help&Support");
  const navigateToTermsAndPolicies = () => navigateTo("TermsAndPolicies");
  const navigateToPrescriptions = () => navigateTo("Prescriptions");
  const navigateToScannedPrescriptions = () =>
    navigateTo("ScannedPrescriptions");
  const navigateToAppointmentsScreen = () => navigateTo("Appointments");
  const navigateToReportProblem = () => navigateTo("ReportProblem");
  const navigateToContactUs = () => navigateTo("ContactUs");

  // const RecentlyDoctorIcon = (props) => (
  //   <SvgIconBuilder {...props}>
  //     <Path
  //       d="M13.5 21.975c-1.867 0-3.417-.654-4.65-1.963C7.617 18.704 7 17.142 7 15.325v-.875c-1.417-.183-2.604-.814-3.563-1.893C2.48 11.48 2 10.21 2 8.75v-5c0-.212.072-.39.216-.534A.726.726 0 012.75 3H5v-.25c0-.212.072-.39.217-.534A.732.732 0 015.754 2a.731.731 0 01.746.75v2c0 .2-.072.375-.217.525a.717.717 0 01-.537.225A.731.731 0 015 4.75V4.5H3.5v4.25c0 1.183.413 2.188 1.237 3.012C5.563 12.587 6.567 13 7.75 13c1.183 0 2.188-.412 3.012-1.238C11.587 10.938 12 9.933 12 8.75V4.5h-1.5v.25c0 .2-.072.375-.217.525a.717.717 0 01-.537.225A.731.731 0 019 4.75v-2c0-.212.072-.39.217-.534A.732.732 0 019.754 2a.731.731 0 01.746.75V3h2.25c.213 0 .39.072.534.216a.726.726 0 01.216.534v5c0 1.46-.48 2.729-1.438 3.807-.958 1.079-2.145 1.71-3.562 1.893v.875c0 1.417.47 2.63 1.412 3.637.942 1.009 2.138 1.513 3.588 1.513 1.35 0 2.52-.501 3.512-1.504.992-1.002 1.488-2.22 1.488-3.652V13.4a2.725 2.725 0 01-1.438-.975 2.656 2.656 0 01-.562-1.675c0-.764.268-1.413.803-1.948A2.656 2.656 0 0119.253 8c.765 0 1.414.267 1.947.802.533.535.8 1.184.8 1.948 0 .633-.188 1.192-.563 1.675A2.725 2.725 0 0120 13.4v1.925c0 1.85-.637 3.42-1.913 4.713-1.274 1.291-2.804 1.937-4.587 1.937zM19.246 12c.353 0 .65-.12.892-.358.241-.239.362-.535.362-.888 0-.352-.12-.65-.358-.891a1.198 1.198 0 00-.888-.363c-.353 0-.65.12-.892.358a1.198 1.198 0 00-.362.888c0 .352.12.65.358.891.239.242.535.363.888.363z"
  //       fill="#000"
  //     />
  //   </SvgIconBuilder>
  // );

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
    { text: "Help & Support", action: navigateToSupport },
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

  const renderSettingsItem = ({ icon, image, text, action, component }) => (
    <TouchableOpacity onPress={action} style={styles.listItem}>
      {icon && <MaterialIcons name={icon} size={24} color={colors.BlueI} />}
      {image && <Image source={image} style={styles.iconImage} />}
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
    fontSize: 20,
    marginVertical: 10,
    color: colors.BlueI,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 2,
    paddingLeft: 2,
  },
  listItemText: {
    fontFamily: "Cairo-Regular",
    fontSize: 16,
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
