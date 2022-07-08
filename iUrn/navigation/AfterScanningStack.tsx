import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/HomeScreen";
import MemorialWall from "../screens/MemorialWall";
import { Route } from "@react-navigation/native";
import { UserNdefParams } from "../types";

import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function AfterScanningStack({
  route,
}: {
  route: Route<"TabNavigator">;
}) {
  const Tab = createBottomTabNavigator();
  //TODO: typing issues
  let params: Readonly<UserNdefParams> = {};
  if (route.params) params = route.params;
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        options={{
          tabBarLabel: "Vault",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="safe-square-outline"
              size={size}
              color={color}
            />
          ),
        }}
        children={() => <HomeScreen params={params} />}
      />
      <Tab.Screen
        name="MemorialWall"
        options={{
          tabBarLabel: "Memorial",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="flower-tulip-outline"
              size={size}
              color={color}
            />
          ),
        }}
        children={() => <MemorialWall params={params} />}
      />
    </Tab.Navigator>
  );
}
