import { useTailwind } from "tailwind-rn/dist";
import HomeScreen from "../screens/HomeScreen";
import { createStackNavigator } from "@react-navigation/stack";
import AddName from "../screens/AddName";

export default function SignedInUserNavigator() {
  const Stack = createStackNavigator();
  const tailwind = useTailwind();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="AddName" component={AddName} />
    </Stack.Navigator>
  );
}
