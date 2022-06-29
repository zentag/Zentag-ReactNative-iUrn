import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/HomeScreen";
import MemoryVault from "../screens/MemoryVault";
import MemorialWall from "../screens/MemorialWall";

export default function AfterScanningStack() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="MemoryVault" component={MemoryVault} />
      <Tab.Screen name="MemorialWall" component={MemorialWall} />
    </Tab.Navigator>
  );
}
