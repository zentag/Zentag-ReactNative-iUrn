import { createStackNavigator } from "@react-navigation/stack";

import ScanScreen from "../screens/ScanScreen";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import TabNavigator from "./AfterScanningNavigator";
import ImagePreview from "../screens/ImagePreview";
import SignedInUserNavigator from "./SignedInUserNavigator";
import { NavigationContainer } from "@react-navigation/native";
const Stack = createStackNavigator();

export default function MainNavigator() {
  const condition = false;
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
          
        <Stack.Screen name="SignUp" component={SignUp}/>
        <Stack.Screen name="SignIn" component={SignIn}/>
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: "modal" }}>
          <Stack.Screen name="Lorem Ipsum" component={TabNavigator} />
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: "modal" }}>
            <Stack.Screen name="AfterSignIn" component={SignedInUserNavigator}/>
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: "modal" }}>
            <Stack.Screen name="ImagePreview" component={ImagePreview}/>
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
