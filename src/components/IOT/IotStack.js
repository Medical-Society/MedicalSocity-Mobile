import React, { useContext, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginSensorScreen from "../../screens/IOT/LoginSensorScreen";
import {
  Context as IotContext,
  Provider as IotProvider,
} from "../../context/IotContext";
import HomeIotScreen from "../../screens/IOT/HomeIotScreen";

const Stack = createNativeStackNavigator();

const IotStack = () => {
  const { state, loadSensorIdFromStorage } = useContext(IotContext);

  useEffect(() => {
    loadSensorIdFromStorage();
  }, []);


  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {state.sensorId === "" ? (
        <Stack.Screen name="LoginIot" component={LoginSensorScreen} />
      ) : (
        <Stack.Screen name="HomeIot" component={HomeIotScreen} />
      )}
    </Stack.Navigator>
  );
};

const IotStackProvider = ({ children }) => {
  return (
    <IotProvider>
      <IotStack />
    </IotProvider>
  );
};

export default IotStackProvider;
