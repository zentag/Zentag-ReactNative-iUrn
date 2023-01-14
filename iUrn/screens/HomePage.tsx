import { Image, View, TouchableOpacity } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import { Feather } from '@expo/vector-icons'; 
export default function HomePage({
    navigation,
  }: {
    navigation: StackNavigationHelpers;
  }) {
    const tailwind = useTailwind()
  return (
    <View style={tailwind("items-center bg-light-primary w-full h-full")}>
      <Image
        style={{ ...tailwind("w-96 h-96 mt-4") }}
        source={require("../assets/images/I-urn-logo.png")}
      />
      <TouchableOpacity onPress={() => navigation.navigate("")} activeOpacity={.6} style={tailwind("m-auto")}>
      <Feather name="plus-circle" size={90} color="black" /></TouchableOpacity>
    <View style={tailwind("flex flex-row absolute bottom-4")}>
        <TouchableOpacity onPress={() => navigation.navigate("")}><Image source={require("../assets/images/I-urn-logo.png")} style={tailwind("w-24 h-24")}/></TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("")}><Image source={require("../assets/images/I-urn-logo.png")} style={tailwind("w-24 h-24")}/></TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("")}><Image source={require("../assets/images/I-urn-logo.png")} style={tailwind("w-24 h-24")}/></TouchableOpacity>
    </View>
    </View>
  );
}
