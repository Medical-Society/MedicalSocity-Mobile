import { StyleSheet, Dimensions, PixelRatio, Platform } from "react-native";
import * as Device from "expo-device";

// styles in app.js
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

// dimesnions of the mobile
export const dimensions = {
  fullHeight: Dimensions.get("window").height,
  fullWidth: Dimensions.get("window").width,
  fontScale: Dimensions.get("window").fontScale,
};

// get the dimensions of the screen
export const UI_dimensions = {
  heightMobileUI: 932,
  widthMobileUI: 430,
};

// get the responsive font size
export const responsiveFontSize = (size) => {
  return Math.floor(
    PixelRatio.roundToNearestPixel(size / dimensions.fontScale)
  );
};

// get factor Scale for width and height
export const BaseScale = {
  widthScale: dimensions.fullWidth / UI_dimensions.widthMobileUI,
  heightScale: dimensions.fullHeight / UI_dimensions.heightMobileUI,
};

// get the responsive width
export const responsiveWidth = (width) => {
  return Math.round(
    PixelRatio.roundToNearestPixel(width * BaseScale.widthScale)
  );
};

// get the responsive height
export const responsiveHeight = (height) => {
  return Math.round(
    PixelRatio.roundToNearestPixel(height * BaseScale.heightScale)
  );
};

// check if it's iphone
export const isIOS = () => {
  return Platform.OS === "ios";
};

// detect IOS Version
export const hasNotch = (version) => {
  const modelName = Device.modelName;
  const ex_notch = [
    "iPhone 7",
    "iPhone 7 Plus",
    "iPhone 8",
    "iPhone 8 Plus",
    "iPhone SE",
    "iPhone 6",
    "iPhone 6 Plus",
    "iPhone 6s",
    "iPhone 6s Plus",
    "iPhone 5",
    "iPhone 5s",
    "iPhone 5c",
    "iPhone 4s",
    "iPhone 4",
    "iPhone 3G",
    "iPhone 3GS",
    "iPhone 1G",
  ];
  return isIOS() && !ex_notch.includes(modelName);
};

// colors used in the app
export const colors = {
  Gold: "#EFCE4A",
  White: "#FFFFFF",
  WhiteI: "#F9F9F9",
  OffWhite: "#F0EEEE",
  Black: "#000000",
  DarkBlack: "#1E1E1Es",
  DarkCyan: "#003441",
  Cyan: "#55C4E0",
  LightSeaGreen: "#1B7B94",
  Grey: "#ABAAAA",
  GreyI: "#7B7B7B",
  GreyII: "#AEAEAE",
  SolidGrey: "#D9D9D9",
  LightGrey: "#aaa",
  DarkGrey: "#606060",
  Red: "#e24c4b",
  DarkRed: "#910F06",
  Green: "#0aa06e",
  LightBlue: "#C9D7FE",
  BlueI: "#060B73",
  BlueII: "#040740",
  Yellow: "#fe9800",
  Orange: "#ff6a00",
  Purple: "#800080",
  Pink: "#FFC0CB",
  Brown: "#A52A2A",
  DarkGreen: "#006400",
  NavyRed: "#410000",
  NavyYellow: "#412300",
  NavyGreen: "#014000",
  Violet: "#6200EE",
};

// padding used in the app
export const padding = {
  sm: 10,
  md: 20,
  lg: 30,
  xl: 40,
  xxl: 60,
  xxxl: 80,
  xxxxl: 100,
  xxxxxl: 120,
  xxxxxxl: 140,
};

// margin used in the app
export const margin = {
  sm: 10,
  md: 20,
  lg: 30,
  xl: 40,
  xxl: 60,
  xxxl: 80,
  xxxxl: 100,
  xxxxxl: 120,
  xxxxxxl: 140,
};

// font family used in the app
export const fontFamily = {
  CapitalisTypOasis: "CapitalisTypOasis",
  MontserratBold: "Montserrat-Bold",
  MontserratMedium: "Montserrat-Medium",
  MontserratRegular: "Montserrat-Regular",
  MontserratSemiBold: "Montserrat-SemiBold",
  MontserratBlack: "Montserrat-Black",
  MontserratThin: "Montserrat-Thin",
  MontserratLight: "Montserrat-Light",
  PoppinsRegular: "Poppins-Regular",
  PoppinsBold: "Poppins-Bold",
  PoppinsMedium: "Poppins-Medium",
  PoppinsSemiBold: "Poppins-SemiBold",
  PoppinsThin: "Poppins-Thin",
  PoppinsLight: "Poppins-Light",
  PoppinsExtraLight: "Poppins-Black",
};

// font weight used in the app
export const fontWeight = {
  normal: "normal",
  thin: "100",
  light: "300",
  medium: "500",
  semiBold: "600",
  bold: "700",
  extraBold: "800",
  black: "900",
};

// convert date
export const formatDate = (inputDate) => {
  // get first part of timestamp
  inputDate = inputDate.split("T")[0];

  // Split the input date string into year, month, and day
  const [year, month, day] = inputDate.split("-");

  // Create a Date object using the year, month, and day
  const dateObject = new Date(year, month - 1, day);

  // Array of month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Get the day, month name, and year from the date object
  const formattedDay = dateObject.getDate();
  const formattedMonth = monthNames[dateObject.getMonth()];
  const formattedYear = dateObject.getFullYear();

  // Concatenate the formatted day, month name, and year
  const formattedDate = `${formattedDay} ${formattedMonth} ${formattedYear}`;

  return formattedDate;
};

// format historic date
export const formatHistoricDate = (country, date) => {
  const formatDate = `${date} | ${country}`;
  return formatDate;
};

// placeholder
export const placeholder = require("./assets/placeholder.png");

export const convertTo12HourFormat = (dateTimeString) => {
  const date = new Date(dateTimeString);

  // Get day of the week
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const day = days[date.getDay()];

  // Get time in 12-hour format
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // Handle midnight

  // Format minutes
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

  // Construct the array
  const formattedTime = `${hours}:${formattedMinutes} ${ampm}`;

  const formattedYMD = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

  return [day, formattedTime, formattedYMD];
};

export const removeMinute = (data) => {
  let newData = {};
  for (let day in data) {
    if (data.hasOwnProperty(day)) {
      newData[day] = {};
      let times = data[day];
      for (let time in times) {
        if (times.hasOwnProperty(time) && typeof times[time] === "object") {
          newData[day][time] = { hour: times[time].hour };
        }
      }
    }
  }
  return newData;
};

export const mergeSameDays = (schedule) => {
  const mergedSchedule = {};

  for (const day1 in schedule) {
    const from1 = schedule[day1].from.hour;
    const to1 = schedule[day1].to.hour;
    let mergedKey = day1; // Initialize merged key with current day

    for (const day2 in schedule) {
      if (
        day1 !== day2 &&
        schedule[day2].from.hour === from1 &&
        schedule[day2].to.hour === to1
      ) {
        mergedKey += ", " + day2;
        delete schedule[day2];
      }
    }

    mergedSchedule[mergedKey] = {
      from: schedule[day1].from,
      to: schedule[day1].to,
    };
  }

  return mergedSchedule;
};

export const formattedDYM = (date) => {
  const newDate = new Date(date);
  return `${newDate.getDate()}/${
    newDate.getMonth() + 1
  }/${newDate.getFullYear()}`;
};
