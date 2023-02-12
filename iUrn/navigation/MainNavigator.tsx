import { createStackNavigator } from "@react-navigation/stack";
import { LinkingOptions, NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import * as Linking from "expo-linking"

import ScanScreen from "../screens/ScanScreen";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import TabNavigator from "./AfterScanningNavigator";
import ImagePreview from "../screens/ImagePreview";
import SignedInUserNavigator from "./SignedInUserNavigator";

import addLinkingListeners from "../local_functions/addLinkingListeners";

const Stack = createStackNavigator();

//TODO: FIX THIS
const prefix = Linking.createURL("")
const linking:LinkingOptions<ReactNavigation.RootParamList> = {
  prefixes:[prefix, "exp+iurn://127.0.0.1/"],
  config: {
    screens: {
      AfterSignIn: {
        screens: {
          NewHome:"afterscanning"
        }
      },
      SignIn:"signin"
    }
  }
}

export default function MainNavigator() {
  const [data, setData] = useState<object | null>(null)
  useEffect(() => {
    const listener = addLinkingListeners(setData)

    if(!data) getInitialUrl()
    
    async function getInitialUrl() {
      const initialUrl = await Linking.getInitialURL()
      if(initialUrl) setData(Linking.parse(initialUrl))
    }

    return () => {
      listener.remove()
    }
  }, [])
  
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Group>
        <Stack.Screen name="ScanScreen" component={ScanScreen} />
        <Stack.Screen name="SignUp" component={SignUp}/>
        <Stack.Screen name="SignIn" component={SignIn}/>
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: "modal" }}>
          <Stack.Screen name="AfterScanning" component={TabNavigator} />
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
