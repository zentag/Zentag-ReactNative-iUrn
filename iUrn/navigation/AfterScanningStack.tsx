import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/ScanScreen";
import MemoryVault from "../screens/MemoryVault"
import MemorialWall from "../screens/MemorialWall"

export default function AfterScanningStack(){
    const Tab = createBottomTabNavigator()
    return (
        <Tab.Navigator>
            {/*
              // @ts-ignore */}
            <Tab.Screen component={HomeScreen}/>
            {/*
              // @ts-ignore */}
            <Tab.Screen component={MemoryVault}/>
            {/*
              // @ts-ignore */}
            <Tab.Screen component={MemorialWall}/>
        </Tab.Navigator>
    )
}