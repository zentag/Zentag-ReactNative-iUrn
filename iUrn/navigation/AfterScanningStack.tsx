import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/HomeScreen";
import MemoryVault from "../screens/MemoryVault";
import MemorialWall from "../screens/MemorialWall";
import { Route } from "@react-navigation/native";

export default function AfterScanningStack({ route }: { route: Route<"TabNavigator"> }) {
  const Tab = createBottomTabNavigator();
  //TODO: use userNdef instead of route.params
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    > 
      <Tab.Screen name="HomeScreen" children={()=><HomeScreen userNdef={route.params}/>} />
      <Tab.Screen name="MemoryVault" component={MemoryVault} />
      <Tab.Screen name="MemorialWall" component={MemorialWall} />
    </Tab.Navigator>
  );
}
