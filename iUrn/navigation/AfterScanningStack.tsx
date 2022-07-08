import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/HomeScreen";
import MemorialWall from "../screens/MemorialWall";
import { Route } from "@react-navigation/native";
import { UserNdefParams } from '../types';

export default function AfterScanningStack({ route }: { route: Route<"TabNavigator"> }) {
  const Tab = createBottomTabNavigator();
  //TODO: typing issues
  let params:Readonly<UserNdefParams> = {}
  if (route.params) params = route.params
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    > 
      <Tab.Screen name="HomeScreen" children={()=><HomeScreen params={params}/>} />
      <Tab.Screen name="MemorialWall" children={()=><MemorialWall params={params}/>} />
    </Tab.Navigator>
  );
}
