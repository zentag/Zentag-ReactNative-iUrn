import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/HomeScreen";
import MemoryVault from "../screens/MemoryVault";
import MemorialWall from "../screens/MemorialWall";
import { Route } from "@react-navigation/native";

export default function AfterScanningStack({ route }: { route: Route<"TabNavigator"> }) {
  const Tab = createBottomTabNavigator();
  //TODO: typing issues
  type UserNdefParams = {
    userNdef?: string;
    setIsScanning?:Function;
  }
  let params:Readonly<UserNdefParams> = {}
  if (route.params) params = route.params
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    > 
      <Tab.Screen name="HomeScreen" children={()=><HomeScreen params={params}/>} />
      <Tab.Screen name="MemoryVault" component={MemoryVault} />
      <Tab.Screen name="MemorialWall" component={MemorialWall} />
    </Tab.Navigator>
  );
}
