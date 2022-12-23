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
