import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StyleSheet,
  Image,
} from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { Context as AuthContext } from "../../context/AuthContext";
import Header from "../../components/Header";
import { colors } from "../../../AppStyles";
import { Path } from "react-native-svg";
import SvgIconBuilder from "../../components/SvgIconBuilder";
import SafeScrollView from "../../components/SafeScrollView";

const Profile = ({ navigation }) => {
  const { signout } = useContext(AuthContext);

  const navigateTo = (screen) => {
    navigation.navigate(screen);
  };

  const navigateToEditProfile = () => navigateTo("EditProfile");
  const navigateToNotifications = () => navigateTo("NotificationsSettings");
  const navigateToSupport = () => navigateTo("Help&Support");
  const navigateToTermsAndPolicies = () => navigateTo("TermsAndPolicies");
  const navigateToPrescriptionsScreen = () => navigateTo("Prescriptions");
  const navigateToScannedPrescriptionsScreen = () =>
    navigateTo("ScannedPrescriptions");

  const navigateToAppointmentsScreen = () => navigateTo("Appointments");
  const PrescriptionIcon = (props) => (
    <SvgIconBuilder {...props}>
      <Path
        d="M8.625 20.5c-1.426 0-2.636-.498-3.632-1.493C3.998 18.01 3.5 16.8 3.5 15.375a5.109 5.109 0 011.506-3.629l6.74-6.74A5.109 5.109 0 0115.375 3.5c1.426 0 2.636.498 3.632 1.493.995.996 1.493 2.206 1.493 3.632a5.11 5.11 0 01-1.506 3.629l-6.74 6.74A5.11 5.11 0 018.625 20.5zm6.477-6.477L17.95 11.2A3.678 3.678 0 0019 8.625c0-1-.354-1.854-1.063-2.563A3.492 3.492 0 0015.376 5 3.676 3.676 0 0012.8 6.05L9.977 8.898l5.125 5.125zM8.625 19a3.678 3.678 0 002.575-1.05l2.823-2.848-5.125-5.125L6.05 12.8A3.677 3.677 0 005 15.375c0 1 .354 1.854 1.062 2.563A3.492 3.492 0 008.625 19z"
        fill="#000"
      />
    </SvgIconBuilder>
  );

  const PersonIcon = (props) => (
    <SvgIconBuilder {...props}>
      <Path
        d="M12 11.682c-.963 0-1.766-.322-2.411-.967s-.967-1.45-.967-2.414c0-.965.322-1.769.967-2.411.645-.643 1.448-.964 2.411-.964.963 0 1.766.321 2.41.964.646.642.968 1.446.968 2.41 0 .965-.322 1.77-.967 2.415s-1.448.967-2.411.967zm-7.5 6.35v-.73c0-.522.14-.985.418-1.39a2.754 2.754 0 011.095-.934c1.031-.473 2.04-.83 3.026-1.068a12.305 12.305 0 015.916.005c.983.242 1.99.598 3.018 1.068.463.217.834.527 1.111.93.277.404.416.867.416 1.388v.731c0 .352-.125.652-.374.901-.25.25-.55.375-.902.375H5.776c-.352 0-.652-.125-.902-.375-.25-.249-.374-.55-.374-.9zm1.256.02h12.488v-.75c0-.242-.075-.47-.224-.687a1.596 1.596 0 00-.59-.515c-.942-.46-1.853-.79-2.733-.991a12.272 12.272 0 00-5.408 0c-.888.2-1.798.53-2.73.991a1.553 1.553 0 00-.584.515 1.21 1.21 0 00-.219.686v.75zM12 10.425c.6 0 1.103-.204 1.51-.611.408-.408.612-.911.612-1.511 0-.6-.204-1.103-.611-1.51-.408-.408-.911-.612-1.511-.612-.6 0-1.103.204-1.51.611-.408.408-.612.911-.612 1.51 0 .6.204 1.104.611 1.512.408.407.911.61 1.511.61z"
        fill="#000"
      />
    </SvgIconBuilder>
  );

  const RecentlyDoctorIcon = (props) => (
    <SvgIconBuilder {...props}>
      <Path
        d="M13.5 21.975c-1.867 0-3.417-.654-4.65-1.963C7.617 18.704 7 17.142 7 15.325v-.875c-1.417-.183-2.604-.814-3.563-1.893C2.48 11.48 2 10.21 2 8.75v-5c0-.212.072-.39.216-.534A.726.726 0 012.75 3H5v-.25c0-.212.072-.39.217-.534A.732.732 0 015.754 2a.731.731 0 01.746.75v2c0 .2-.072.375-.217.525a.717.717 0 01-.537.225A.731.731 0 015 4.75V4.5H3.5v4.25c0 1.183.413 2.188 1.237 3.012C5.563 12.587 6.567 13 7.75 13c1.183 0 2.188-.412 3.012-1.238C11.587 10.938 12 9.933 12 8.75V4.5h-1.5v.25c0 .2-.072.375-.217.525a.717.717 0 01-.537.225A.731.731 0 019 4.75v-2c0-.212.072-.39.217-.534A.732.732 0 019.754 2a.731.731 0 01.746.75V3h2.25c.213 0 .39.072.534.216a.726.726 0 01.216.534v5c0 1.46-.48 2.729-1.438 3.807-.958 1.079-2.145 1.71-3.562 1.893v.875c0 1.417.47 2.63 1.412 3.637.942 1.009 2.138 1.513 3.588 1.513 1.35 0 2.52-.501 3.512-1.504.992-1.002 1.488-2.22 1.488-3.652V13.4a2.725 2.725 0 01-1.438-.975 2.656 2.656 0 01-.562-1.675c0-.764.268-1.413.803-1.948A2.656 2.656 0 0119.253 8c.765 0 1.414.267 1.947.802.533.535.8 1.184.8 1.948 0 .633-.188 1.192-.563 1.675A2.725 2.725 0 0120 13.4v1.925c0 1.85-.637 3.42-1.913 4.713-1.274 1.291-2.804 1.937-4.587 1.937zM19.246 12c.353 0 .65-.12.892-.358.241-.239.362-.535.362-.888 0-.352-.12-.65-.358-.891a1.198 1.198 0 00-.888-.363c-.353 0-.65.12-.892.358a1.198 1.198 0 00-.362.888c0 .352.12.65.358.891.239.242.535.363.888.363z"
        fill="#000"
      />
    </SvgIconBuilder>
  );
  const AppointmentsIcon = (props) => (
    <SvgIconBuilder {...props}>
      <Path
        d="M13.5 21.975c-1.867 0-3.417-.654-4.65-1.963C7.617 18.704 7 17.142 7 15.325v-.875c-1.417-.183-2.604-.814-3.563-1.893C2.48 11.48 2 10.21 2 8.75v-5c0-.212.072-.39.216-.534A.726.726 0 012.75 3H5v-.25c0-.212.072-.39.217-.534A.732.732 0 015.754 2a.731.731 0 01.746.75v2c0 .2-.072.375-.217.525a.717.717 0 01-.537.225A.731.731 0 015 4.75V4.5H3.5v4.25c0 1.183.413 2.188 1.237 3.012C5.563 12.587 6.567 13 7.75 13c1.183 0 2.188-.412 3.012-1.238C11.587 10.938 12 9.933 12 8.75V4.5h-1.5v.25c0 .2-.072.375-.217.525a.717.717 0 01-.537.225A.731.731 0 019 4.75v-2c0-.212.072-.39.217-.534A.732.732 0 019.754 2a.731.731 0 01.746.75V3h2.25c.213 0 .39.072.534.216a.726.726 0 01.216.534v5c0 1.46-.48 2.729-1.438 3.807-.958 1.079-2.145 1.71-3.562 1.893v.875c0 1.417.47 2.63 1.412 3.637.942 1.009 2.138 1.513 3.588 1.513 1.35 0 2.52-.501 3.512-1.504.992-1.002 1.488-2.22 1.488-3.652V13.4a2.725 2.725 0 01-1.438-.975 2.656 2.656 0 01-.562-1.675c0-.764.268-1.413.803-1.948A2.656 2.656 0 0119.253 8c.765 0 1.414.267 1.947.802.533.535.8 1.184.8 1.948 0 .633-.188 1.192-.563 1.675A2.725 2.725 0 0120 13.4v1.925c0 1.85-.637 3.42-1.913 4.713-1.274 1.291-2.804 1.937-4.587 1.937zM19.246 12c.353 0 .65-.12.892-.358.241-.239.362-.535.362-.888 0-.352-.12-.65-.358-.891a1.198 1.198 0 00-.888-.363c-.353 0-.65.12-.892.358a1.198 1.198 0 00-.362.888c0 .352.12.65.358.891.239.242.535.363.888.363z"
        fill="#000"
      />
    </SvgIconBuilder>
  );
  const SettingsIcon = (props) => (
    <SvgIconBuilder {...props}>
      <Path
        d="M10.481 21.5a.833.833 0 01-.583-.226.926.926 0 01-.296-.563l-.29-2.257a5.31 5.31 0 01-1.579-.896l-2.088.88a.854.854 0 01-.638.033.914.914 0 01-.497-.404l-1.504-2.619a.887.887 0 01-.106-.633.866.866 0 01.337-.542l1.808-1.367a5.008 5.008 0 01-.05-.448 7 7 0 010-.882 7.35 7.35 0 01.05-.482L3.237 9.727a.886.886 0 01-.341-.542.843.843 0 01.11-.633l1.504-2.6a.915.915 0 01.492-.404.842.842 0 01.633.033l2.088.87a6.4 6.4 0 01.773-.523c.273-.158.542-.286.806-.382l.3-2.258a.926.926 0 01.296-.562.833.833 0 01.583-.226h3.029a.85.85 0 01.587.226c.168.15.268.338.301.562l.29 2.268c.3.109.572.236.815.381.243.146.488.317.736.515l2.127-.871a.859.859 0 01.632-.038.892.892 0 01.493.4l1.503 2.609c.121.197.158.408.111.633a.886.886 0 01-.341.542l-1.846 1.396c.035.162.055.313.058.453.004.14.005.282.005.424a9.1 9.1 0 01-.01.414c-.006.14-.029.301-.069.482l1.827 1.377c.18.137.295.318.341.542a.843.843 0 01-.11.633l-1.504 2.604a.926.926 0 01-.505.407.863.863 0 01-.645-.03l-2.067-.881c-.248.198-.5.372-.758.524a4.582 4.582 0 01-.792.372l-.29 2.268a.916.916 0 01-.302.562.85.85 0 01-.587.226h-3.029zm.52-1.5h1.965l.36-2.679c.51-.133.976-.323 1.398-.568.423-.246.83-.561 1.223-.947l2.484 1.044.985-1.7-2.17-1.635c.084-.259.14-.513.17-.761a6.268 6.268 0 000-1.508 3.909 3.909 0 00-.17-.742l2.189-1.654-.985-1.7-2.513 1.06a5.322 5.322 0 00-1.203-.948 5.168 5.168 0 00-1.418-.583L13 4h-1.984l-.331 2.67a5.22 5.22 0 00-1.413.553c-.433.249-.845.57-1.237.962L5.55 7.15l-.984 1.7 2.16 1.61a3.646 3.646 0 00-.176.74 6.283 6.283 0 000 1.575c.034.25.089.497.166.74l-2.15 1.635.984 1.7 2.475-1.05c.38.39.786.709 1.218.958.432.248.91.44 1.432.573L11 20zm1.01-5c.833 0 1.54-.292 2.125-.876A2.892 2.892 0 0015.012 12c0-.832-.292-1.54-.876-2.124A2.892 2.892 0 0012.012 9c-.842 0-1.553.292-2.132.876A2.905 2.905 0 009.012 12c0 .832.29 1.54.868 2.124.579.584 1.29.876 2.132.876z"
        fill="#000"
      />
    </SvgIconBuilder>
  );
  const LogoutIcon = (props) => (
    <SvgIconBuilder {...props}>
      <Path
        d="M5.308 20.5c-.505 0-.933-.175-1.283-.525a1.745 1.745 0 01-.525-1.283V5.308c0-.505.175-.933.525-1.283.35-.35.778-.525 1.283-.525h5.952c.212 0 .39.072.534.215a.726.726 0 01.216.535.726.726 0 01-.216.535.726.726 0 01-.534.215H5.308a.294.294 0 00-.212.096.294.294 0 00-.096.212v13.384c0 .077.032.148.096.212a.294.294 0 00.212.096h5.952c.212 0 .39.072.534.215a.726.726 0 01.216.535.726.726 0 01-.216.535.726.726 0 01-.534.215H5.308zm12.31-7.75H9.845a.726.726 0 01-.534-.215.726.726 0 01-.216-.535c0-.213.072-.391.216-.535a.726.726 0 01.534-.215h7.771l-1.923-1.923a.707.707 0 01-.212-.507.74.74 0 01.212-.532.72.72 0 01.527-.24.716.716 0 01.542.225l3.095 3.094c.18.181.27.392.27.633s-.09.452-.27.633l-3.095 3.094a.714.714 0 01-.53.22.752.752 0 01-.539-.236.732.732 0 01-.21-.534.737.737 0 01.226-.52l1.907-1.907z"
        fill="#000"
      />
    </SvgIconBuilder>
  );

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
      action: navigateToPrescriptionsScreen,
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
      action: navigateToScannedPrescriptionsScreen,
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
        <SettingsIcon
          width={width}
          height={height}
          fill={color}
          style={style}
        />
      ),
      text: "Settings",
      action: navigateToPrescriptionsScreen,
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
      text: "About Us",
      action: () => navigateTo("AboutUs"),
    },
  ];

  const actionsItems = [
    {
      text: "Report a Problem",
      action: navigateToPrescriptionsScreen,
    },
  ];

  const renderSettingsItem = ({ icon, image, text, action, component }) => (
    <TouchableOpacity onPress={action} style={styles.listItem}>
      {icon && <MaterialIcons name={icon} size={24} color={colors.BlueI} />}
      {image && <Image source={image} style={styles.iconImage} />}
      {component && component(30, 30, colors.BlueI, styles.iconImage)}
      <Text style={styles.listItemText}>{text}</Text>
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
    marginLeft: 8,
    fontFamily: "Cairo-Regular",
    fontSize: 18,
    lineHeight: 40,
  },
  iconImage: {
    fontSize: 24,
    width: 22,
    height: 22,
  },
});

export default Profile;
