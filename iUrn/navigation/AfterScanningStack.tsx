import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/HomeScreen";
import MemoryVault from "../screens/MemoryVault"
import MemorialWall from "../screens/MemorialWall"

export default function AfterScanningStack(){
    const Tab = createBottomTabNavigator()
    return (
        // @ts-ignore
        <Tab.Navigator>
            {/*
              // @ts-ignore */}
            <Tab.Screen name="HomeScreen" component={HomeScreen}/>
            {/*
              // @ts-ignore */}
            <Tab.Screen name="MemoryVault" component={MemoryVault}/>
            {/*
              // @ts-ignore */}
            <Tab.Screen name="MemorialWall" component={MemorialWall}/>
        </Tab.Navigator>
    )
}