import "react-native-gesture-handler";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import useCachedResources from "./hooks/useCachedResources";

import HomeScreen from "./screens/ScanScreen";
import SignIn from "./screens/SignIn";
import { NavigationContainer } from "@react-navigation/native";

import { TailwindProvider } from "tailwind-rn/dist";
import utilities from "./tailwind.json";

const Stack = createStackNavigator();

export default function App() {
  const isLoadingComplete = useCachedResources();
  const condition = false;
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      /*
      // @ts-ignore */
      <TailwindProvider utilities={utilities}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Group>
              // TODO: Remove ts-ignore and add auth
              {/*
              // @ts-ignore */}
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
                <Stack.Screen name="Home" component={HomeScreen} />
              )}
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: 'modal' }}>

            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>
      </TailwindProvider>
    );
  }
}
