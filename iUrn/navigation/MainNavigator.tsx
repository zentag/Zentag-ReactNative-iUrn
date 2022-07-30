import { createStackNavigator } from "@react-navigation/stack";

import ScanScreen from "../screens/ScanScreen";
import SignIn from "../screens/SignIn";
import TabNavigator from "./AfterScanningStack";
import { NavigationContainer } from "@react-navigation/native";
const Stack = createStackNavigator();

export default function MainNavigator() {
  const condition = true;
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Group>
          {/*
              TODO: Remove ts-ignore and add auth
              */}
          {/*
              // @ts-ignore because it will always be false*/}
          {condition == true ? (
            // No token found, user isn't signed in
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{
                title: "Sign in",
              }}
            />
          ) : (
            // User is signed in
            <Stack.Screen name="ScanScreen" component={ScanScreen} />
          )}
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: "modal" }}>
          <Stack.Screen name="Lorem Ipsum" component={TabNavigator} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
