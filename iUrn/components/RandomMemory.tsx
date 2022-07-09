import { DocumentData } from "firebase/firestore";
import React from "react";
import {View, Text, Image} from "react-native"
export function RandomMemory({
  tailwind,
  userDoc,
  dimensions,
}: {
    tailwind: Function,
    userDoc:DocumentData | null,
    dimensions:Array<number> | null,
  }) {
  return <View style={tailwind("justify-center items-center p-8")}>
          <Text style={tailwind("text-lg font-bold")}>{userDoc?.Name || "No Memories Available"}</Text>
          <Image source={userDoc?.img ? {
      uri: userDoc?.img
    } : require("../assets/images/placeholder.png")} style={{
      width: dimensions?.[0] || 192,
      height: dimensions?.[1] || 192,
      ...tailwind("")
    }} />
          <Text>{userDoc?.Description || ""}</Text>
        </View>;
}
  