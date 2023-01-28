import { useTailwind } from "tailwind-rn/dist";
import HomeScreen from "../screens/HomeScreen";
import { createStackNavigator } from "@react-navigation/stack";
import AddName from "../screens/AddName";
import AddMemorial from "../screens/AddMemorial";
import AddMemory from "../screens/AddMemory";
import HomePage from "../screens/HomePage";
import RememberWhen from "../screens/RememberWhen";
import Benefits from "../screens/Benefits";
import ESympathy from "../screens/ESympathy";
import LivingWill from "../screens/LivingWill";
import Insurance from "../screens/Insurance";
import Support from "../screens/Support";
export default function SignedInUserNavigator() {
  const Stack = createStackNavigator();
  const tailwind = useTailwind();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="NewHome" component={HomePage} />
      <Stack.Screen name="RememberWhen" component={RememberWhen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="AddName" component={AddName} />
      <Stack.Screen name="AddMemorial" component={AddMemorial} />
      <Stack.Screen name="AddMemory" component={AddMemory} />
      <Stack.Screen name="Benefits" component={Benefits} />
      <Stack.Screen name="ESympathy" component={ESympathy} />
      <Stack.Screen name="LivingWill" component={LivingWill} />
      <Stack.Screen name="Insurance" component={Insurance} />
      <Stack.Screen name="Support" component={Support} />
    </Stack.Navigator>
  );
}
