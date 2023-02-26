import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MemoryVault from "../screens/MemoryVault";
import MemorialWall from "../screens/MemorialWall";
import { Route } from "@react-navigation/native";
import { UserNdefParams } from "../types";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTailwind } from "tailwind-rn";

export default function AfterScanningStack({
  route,
}: {
  route: Route<"TabNavigator">;
}) {
  const Tab = createBottomTabNavigator();
  const tailwind = useTailwind()
  //TODO: typing issues
  let params: Readonly<UserNdefParams> = {};
  if (route.params) params = route.params;
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle:tailwind("bg-light-secondary"),
        tabBarLabelStyle:tailwind("text-light-text"),
      }}
    >
      <Tab.Screen
        name="MemoryVault"
        options={{
          tabBarLabel: "Vault",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="safe-square-outline"
              size={size}
              color={"black"}
            />
          ),
        }}
        component={MemoryVault}
        initialParams={params}
      />
      <Tab.Screen
        name="MemorialWall"
        options={{
          tabBarLabel: "Memorial",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="flower-tulip-outline"
              size={size}
              color={"black"}
            />
          ),
        }}
        children={() => <MemorialWall params={params} />}
      />
    </Tab.Navigator>
  );
}
